import { crc32, inflateRawSync } from "node:zlib";

/**
 * Lecture minimale d'une archive ZIP, sans dépendance : Node fournit déjà la
 * décompression DEFLATE (`inflateRawSync`) et le contrôle CRC-32 (`crc32`).
 *
 * Réservé à l'outillage (script d'extraction, tests) : ce module s'appuie sur
 * `node:zlib` et n'est jamais importé côté navigateur.
 *
 * Périmètre volontairement étroit — celui des packs de données du dossier :
 * méthodes « stocké » (0) et « DEFLATE » (8), sans ZIP64 ni chiffrement. Toute
 * autre archive est refusée explicitement plutôt que lue de travers.
 */

export interface ZipEntry {
  /** Chemin dans l'archive, séparateurs « / ». */
  name: string;
  size: number;
  /** Date de modification enregistrée dans l'archive (heure locale DOS). */
  modifiedAt: Date;
  read: () => Buffer;
}

const EOCD_SIGNATURE = 0x06054b50;
const CENTRAL_SIGNATURE = 0x02014b50;
const LOCAL_SIGNATURE = 0x04034b50;

function dosDate(date: number, time: number): Date {
  return new Date(
    ((date >> 9) & 0x7f) + 1980,
    ((date >> 5) & 0x0f) - 1,
    date & 0x1f,
    (time >> 11) & 0x1f,
    (time >> 5) & 0x3f,
    (time & 0x1f) * 2,
  );
}

function findEndOfCentralDirectory(buffer: Buffer): number {
  // L'enregistrement de fin fait 22 octets, suivis d'un commentaire d'au plus
  // 65 535 octets : on le cherche à rebours dans cette fenêtre.
  const floor = Math.max(0, buffer.length - 22 - 0xffff);
  for (let offset = buffer.length - 22; offset >= floor; offset -= 1) {
    if (buffer.readUInt32LE(offset) === EOCD_SIGNATURE) return offset;
  }
  throw new Error("archive ZIP illisible : enregistrement de fin introuvable");
}

export function readZip(buffer: Buffer): ZipEntry[] {
  const eocd = findEndOfCentralDirectory(buffer);
  const count = buffer.readUInt16LE(eocd + 10);
  let offset = buffer.readUInt32LE(eocd + 16);

  const entries: ZipEntry[] = [];

  for (let index = 0; index < count; index += 1) {
    if (buffer.readUInt32LE(offset) !== CENTRAL_SIGNATURE) {
      throw new Error("archive ZIP illisible : répertoire central corrompu");
    }

    const flags = buffer.readUInt16LE(offset + 8);
    const method = buffer.readUInt16LE(offset + 10);
    const time = buffer.readUInt16LE(offset + 12);
    const date = buffer.readUInt16LE(offset + 14);
    const expectedCrc = buffer.readUInt32LE(offset + 16);
    const compressedSize = buffer.readUInt32LE(offset + 20);
    const size = buffer.readUInt32LE(offset + 24);
    const nameLength = buffer.readUInt16LE(offset + 28);
    const extraLength = buffer.readUInt16LE(offset + 30);
    const commentLength = buffer.readUInt16LE(offset + 32);
    const localOffset = buffer.readUInt32LE(offset + 42);
    // Bit 11 : nom encodé en UTF-8 ; sinon CP437, dont l'ASCII est un sous-ensemble.
    const name = buffer
      .subarray(offset + 46, offset + 46 + nameLength)
      .toString(flags & 0x0800 ? "utf8" : "latin1");

    offset += 46 + nameLength + extraLength + commentLength;
    if (name.endsWith("/")) continue;

    entries.push({
      name,
      size,
      modifiedAt: dosDate(date, time),
      read: () => {
        if (flags & 0x0001) throw new Error(`${name} : entrée chiffrée non prise en charge`);
        if (buffer.readUInt32LE(localOffset) !== LOCAL_SIGNATURE) {
          throw new Error(`${name} : en-tête local introuvable`);
        }
        const start =
          localOffset +
          30 +
          buffer.readUInt16LE(localOffset + 26) +
          buffer.readUInt16LE(localOffset + 28);
        const raw = buffer.subarray(start, start + compressedSize);

        const content =
          method === 0
            ? Buffer.from(raw)
            : method === 8
              ? inflateRawSync(raw)
              : null;
        if (!content) {
          throw new Error(`${name} : méthode de compression ${method} non prise en charge`);
        }
        if (content.length !== size || crc32(content) !== expectedCrc) {
          throw new Error(`${name} : contrôle d'intégrité (CRC-32) en échec`);
        }
        return content;
      },
    });
  }

  return entries;
}
