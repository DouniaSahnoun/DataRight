"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { DEMO_FINANCIAL_GRAPH, FINANCE_DATASET } from "@/lib/finance/dataset";
import type { FinancialGraph, GraphIssue } from "@/lib/finance/types";
import { MOCK_ADDENDUM_LINKS, MOCK_CLAUSES } from "@/lib/mock/clauses";
import { MOCK_DOCUMENTS } from "@/lib/mock/corpus";
import { ask } from "@/lib/rag/engine";
import type {
  AddendumLink,
  ChatMessage,
  Clause,
  ContractDocument,
  ViewerTarget,
} from "@/lib/types";
import { createId } from "@/lib/utils";

// v3 : cartographie issue des packs ZIP de /data et date de référence.
const STORAGE_KEY = "dataright.state.v3";

interface PersistedState {
  documents: ContractDocument[];
  clauses: Clause[];
  links: AddendumLink[];
  messages: ChatMessage[];
  /** Cartographie composants → fonctionnalités → lignes de revenus. */
  financials: FinancialGraph;
  /** Anomalies relevées au dernier import de données financières. */
  financialIssues: GraphIssue[];
  /** Date à laquelle la situation contractuelle est appréciée (AAAA-MM-JJ). */
  referenceDate: string;
}

interface StoreValue extends PersistedState {
  hydrated: boolean;
  viewerTarget: ViewerTarget | null;
  openInViewer: (target: ViewerTarget) => void;
  pending: boolean;
  askQuestion: (question: string) => Promise<void>;
  addDocument: (input: {
    document: ContractDocument;
    clauses: Clause[];
    links: AddendumLink[];
  }) => void;
  removeDocument: (documentId: string) => void;
  updateDocument: (documentId: string, patch: Partial<ContractDocument>) => void;
  updateClause: (clauseId: string, patch: Partial<Clause>) => void;
  deleteClause: (clauseId: string) => void;
  setLinkStatus: (linkId: string, status: AddendumLink["status"]) => void;
  replaceFinancials: (graph: FinancialGraph, issues: GraphIssue[]) => void;
  resetFinancials: () => void;
  setReferenceDate: (date: string) => void;
  clearConversation: () => void;
  resetDemo: () => void;
}

const StoreContext = createContext<StoreValue | null>(null);

function initialState(): PersistedState {
  return {
    documents: MOCK_DOCUMENTS,
    clauses: MOCK_CLAUSES,
    links: MOCK_ADDENDUM_LINKS,
    messages: [],
    financials: DEMO_FINANCIAL_GRAPH,
    financialIssues: FINANCE_DATASET.issues,
    referenceDate: FINANCE_DATASET.asOfDate,
  };
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PersistedState>(initialState);
  const [hydrated, setHydrated] = useState(false);
  const [viewerTarget, setViewerTarget] = useState<ViewerTarget | null>(null);
  const [pending, setPending] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as PersistedState;
        // Un état plus ancien peut ne pas porter la cartographie : on complète
        // plutôt que d'écarter toute la session.
        if (!parsed.financials) parsed.financials = DEMO_FINANCIAL_GRAPH;
        if (!parsed.financialIssues) parsed.financialIssues = [];
        if (!parsed.referenceDate) parsed.referenceDate = FINANCE_DATASET.asOfDate;
        if (Array.isArray(parsed.documents) && parsed.documents.length > 0) {
          // Hydratation depuis localStorage : la source n'existe pas au rendu
          // serveur, la reprise ne peut donc avoir lieu qu'après le montage, une
          // seule fois — le rendu en cascade est ici voulu et borné.
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setState(parsed);
        }
      }
    } catch {
      // Stockage indisponible (navigation privée) : on reste sur le jeu de démo.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
        // Quota dépassé : la session reste fonctionnelle, sans persistance.
      }
    }, 400);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [state, hydrated]);

  const openInViewer = useCallback((target: ViewerTarget) => {
    setViewerTarget(target);
  }, []);

  const askQuestion = useCallback(
    async (question: string) => {
      const trimmed = question.trim();
      if (trimmed.length === 0 || pending) return;

      const userMessage: ChatMessage = {
        id: createId("msg"),
        role: "user",
        content: trimmed,
        createdAt: new Date().toISOString(),
      };
      const placeholder: ChatMessage = {
        id: createId("msg"),
        role: "assistant",
        content: "",
        createdAt: new Date().toISOString(),
        pending: true,
      };

      setState((current) => ({
        ...current,
        messages: [...current.messages, userMessage, placeholder],
      }));
      setPending(true);

      const snapshot = state;

      // Latence simulée pour que l'état de chargement reste perceptible.
      await new Promise((resolve) => setTimeout(resolve, 420));
      const answer = await ask({
        question: trimmed,
        documents: snapshot.documents,
        clauses: snapshot.clauses,
        links: snapshot.links,
      });

      setState((current) => ({
        ...current,
        messages: current.messages.map((message) =>
          message.id === placeholder.id
            ? {
                ...message,
                pending: false,
                content: answer.summary,
                answer,
              }
            : message,
        ),
      }));
      setPending(false);

      const first = answer.citations[0];
      if (first) {
        setViewerTarget({
          documentId: first.documentId,
          page: first.page,
          highlight: first.excerpt,
        });
      }
    },
    [pending, state],
  );

  const value = useMemo<StoreValue>(
    () => ({
      ...state,
      hydrated,
      viewerTarget,
      openInViewer,
      pending,
      askQuestion,
      addDocument: ({ document, clauses, links }) =>
        setState((current) => ({
          ...current,
          documents: [document, ...current.documents],
          clauses: [...clauses, ...current.clauses],
          links: [...links, ...current.links],
        })),
      removeDocument: (documentId) =>
        setState((current) => ({
          ...current,
          documents: current.documents.filter((doc) => doc.id !== documentId),
          clauses: current.clauses.filter((clause) => clause.documentId !== documentId),
          links: current.links.filter(
            (link) =>
              link.addendumDocumentId !== documentId &&
              link.originDocumentId !== documentId,
          ),
        })),
      updateDocument: (documentId, patch) =>
        setState((current) => ({
          ...current,
          documents: current.documents.map((doc) =>
            doc.id === documentId ? { ...doc, ...patch } : doc,
          ),
        })),
      updateClause: (clauseId, patch) =>
        setState((current) => ({
          ...current,
          clauses: current.clauses.map((clause) =>
            clause.id === clauseId ? { ...clause, ...patch, edited: true } : clause,
          ),
        })),
      deleteClause: (clauseId) =>
        setState((current) => ({
          ...current,
          clauses: current.clauses.filter((clause) => clause.id !== clauseId),
          links: current.links.filter(
            (link) =>
              link.addendumClauseId !== clauseId && link.originClauseId !== clauseId,
          ),
        })),
      setLinkStatus: (linkId, status) =>
        setState((current) => ({
          ...current,
          links: current.links.map((link) =>
            link.id === linkId ? { ...link, status } : link,
          ),
          clauses: current.clauses.map((clause) => {
            const link = current.links.find((entry) => entry.id === linkId);
            if (!link || clause.id !== link.originClauseId) return clause;
            return {
              ...clause,
              supersededBy: status === "confirmed" ? link.addendumClauseId : undefined,
            };
          }),
        })),
      replaceFinancials: (graph, issues) =>
        setState((current) => ({ ...current, financials: graph, financialIssues: issues })),
      resetFinancials: () =>
        setState((current) => ({
          ...current,
          financials: DEMO_FINANCIAL_GRAPH,
          financialIssues: FINANCE_DATASET.issues,
        })),
      setReferenceDate: (date) =>
        setState((current) => ({ ...current, referenceDate: date })),
      clearConversation: () => setState((current) => ({ ...current, messages: [] })),
      resetDemo: () => {
        setState(initialState());
        setViewerTarget(null);
      },
    }),
    [state, hydrated, viewerTarget, openInViewer, pending, askQuestion],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore doit être utilisé dans <StoreProvider>");
  return context;
}
