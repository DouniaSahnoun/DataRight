import type { ContractDocument } from "@/lib/types";

/**
 * Dossier de démonstration : la data room fictive d'Asteria AI SAS.
 *
 * Les huit documents reproduisent mot pour mot les PDF du dossier `example/`
 * (D01 à D08), tels que l'extraction paginée de `lib/pdf/extract.ts` les
 * restitue. C'est la condition de la traçabilité : un extrait du registre ou
 * d'une réponse doit se retrouver littéralement dans la page annoncée.
 *
 * Les articles à portée financière restent présents dans le texte affiché mais
 * ne sont pas indexés (voir `OUT_OF_SCOPE` dans `lib/rag/chunking.ts`) :
 * DataRight n'analyse que les droits, permissions, restrictions et obligations.
 */

const ATLAS: ContractDocument = {
  id: "doc-d01-atlas",
  title: "Atlas Business Corpus Data Licence Agreement",
  counterparty: "DataForge Ltd",
  kind: "license",
  reference: "D01",
  effectiveDate: "2026-01-01",
  addedAt: "2026-08-03T09:12:00.000Z",
  source: "mock",
  pageCount: 2,
  pages: [
    {
      number: 1,
      text: `Atlas Business Corpus Data Licence Agreement
Document ID D01 | Effective date 1 January 2026
Party Role
DataForge Ltd Licensor
Asteria AI SAS Licensee
1. Definitions
1.1 'Licensed Data' means the Atlas Business Corpus and accompanying metadata supplied by Licensor. 1.2
'Production Use' means use in a system made available to external users or used to deliver a paid service.
2. Licence Grant
2.1 Licensor grants Licensee a limited, non-exclusive, non-transferable right to use the Licensed Data solely for
internal, non-production research and evaluation purposes. 2.2 No implied rights are granted.
3. Restrictions
3.1 Licensee shall not: (a) use the Licensed Data in any commercial product or service; (b) use the Licensed Data to
train, fine-tune or retrieve content for a production model; (c) distribute the Licensed Data; or (d) permit access by
any affiliate or customer without Licensor's prior written consent.
FICTITIOUS DOCUMENT FOR LEXHACK DEMONSTRATION Page 1`,
    },
    {
      number: 2,
      text: `4. Security and Incidents
4.1 Licensee shall apply reasonable technical and organisational measures. 4.2 Licensee shall notify Licensor within
forty-eight (48) hours after discovering unauthorised access to the Licensed Data.
5. Term and Deletion
5.1 This Agreement continues for twelve (12) months. 5.2 On expiry or termination, Licensee shall stop using and
delete the Licensed Data, except for one encrypted legal archive copy.
6. Termination
6.1 Licensor may terminate immediately for a material breach of Sections 2 or 3. 6.2 Termination does not create an
automatic damages amount; available remedies depend on applicable law and proven loss.
7. General
7.1 Amendments must be in writing and signed by both parties. 7.2 This Agreement is governed by the laws of
France, without prejudice to mandatory rules.
AGREED FOR DEMONSTRATION PURPOSES
The names, amounts and obligations in this document are fictitious and are provided solely to test the LexHack
prototype.
FICTITIOUS DOCUMENT FOR LEXHACK DEMONSTRATION Page 2`,
    },
  ],
};

const HELIXLM: ContractDocument = {
  id: "doc-d02-helixlm",
  title: "HelixLM Commercial Model Licence Agreement",
  counterparty: "Helix Labs GmbH",
  kind: "license",
  reference: "D02",
  effectiveDate: "2026-02-01",
  addedAt: "2026-08-03T09:18:00.000Z",
  source: "mock",
  pageCount: 2,
  pages: [
    {
      number: 1,
      text: `HelixLM Commercial Model Licence Agreement
Document ID D02 | Effective date 1 February 2026
Party Role
Helix Labs GmbH Licensor
Asteria AI SAS Licensee
1. Definitions
1.1 'Model' means HelixLM 7B, including the model weights and tokenizer. 1.2 'Hosted Service' means a service
operated by Licensee where end users access functionality without receiving the Model weights.
2. Commercial Licence
2.1 Licensor grants Licensee a non-exclusive right to deploy the Model as part of Licensee's hosted commercial
services and to charge customers for those services. 2.2 Licensee may create internal fine-tuned versions for the
same permitted use.
3. Distribution Restrictions
3.1 Licensee shall not distribute or provide the Model weights to any third party. 3.2 Customer access must remain
through Licensee's Hosted Service. 3.3 Outputs may be delivered to customers, subject to applicable law and the
customer agreement.
FICTITIOUS DOCUMENT FOR LEXHACK DEMONSTRATION Page 1`,
    },
    {
      number: 2,
      text: `4. Usage Records
4.1 Licensee shall maintain records sufficient to identify the commercial services using the Model. 4.2 A summary
report for the prior calendar year is due by 15 January each year.
5. Fees
5.1 The annual licence fee is EUR 48,000, payable in quarterly instalments. 5.2 Usage above the separately agreed
compute allowance may incur additional fees.
6. Term
6.1 The initial term is twelve (12) months. 6.2 The Agreement renews for successive twelve-month periods unless
either party gives sixty (60) days' written notice.
7. General
7.1 Amendments require a written instrument signed by both parties. 7.2 This Agreement is governed by German
law.
AGREED FOR DEMONSTRATION PURPOSES
The names, amounts and obligations in this document are fictitious and are provided solely to test the LexHack
prototype.
FICTITIOUS DOCUMENT FOR LEXHACK DEMONSTRATION Page 2`,
    },
  ],
};

const VECTORGRID: ContractDocument = {
  id: "doc-d03-vectorgrid",
  title: "VectorGrid Enterprise Software and API Agreement",
  counterparty: "VectorGrid Inc",
  kind: "license",
  reference: "D03",
  effectiveDate: "2026-02-15",
  addedAt: "2026-08-03T09:24:00.000Z",
  source: "mock",
  pageCount: 2,
  pages: [
    {
      number: 1,
      text: `VectorGrid Enterprise Software and API Agreement
Document ID D03 | Effective date 15 February 2026
Party Role
VectorGrid Inc Provider
Asteria AI SAS Customer
1. Service
1.1 Provider shall make the VectorGrid embedding and vector search service available to Customer. 1.2 Customer
may use the service to provide commercial software-as-a-service products to its own customers.
2. Usage Limit
2.1 The subscription includes up to one million (1,000,000) documents processed per calendar month. 2.2 Excess
usage requires Provider's written approval and may be charged at the rates in the applicable order form.
3. Customer Data
3.1 Customer retains its rights in Customer Data. 3.2 Provider may process Customer Data only to provide, secure
and support the service, unless the parties agree otherwise in writing.
FICTITIOUS DOCUMENT FOR LEXHACK DEMONSTRATION Page 1`,
    },
    {
      number: 2,
      text: `4. Reporting
4.1 Within fifteen (15) calendar days after each calendar quarter, Customer shall provide a usage report showing
documents processed and active production workspaces. 4.2 Provider may request reasonable supporting records
once per year.
5. Fees and Payment
5.1 The annual subscription fee is EUR 36,000. 5.2 Invoices are payable within thirty (30) days.
6. Term and Suspension
6.1 The initial term is twelve (12) months. 6.2 Provider may suspend access after written notice if Customer
materially exceeds the Usage Limit and does not agree a remediation plan within ten (10) business days.
7. General
7.1 This Agreement is governed by the laws of England and Wales. 7.2 Amendments must be signed by both
parties.
AGREED FOR DEMONSTRATION PURPOSES
The names, amounts and obligations in this document are fictitious and are provided solely to test the LexHack
prototype.
FICTITIOUS DOCUMENT FOR LEXHACK DEMONSTRATION Page 2`,
    },
  ],
};

const HORIZON: ContractDocument = {
  id: "doc-d04-horizon",
  title: "ClauseLens Enterprise Subscription Agreement — Horizon Bank",
  counterparty: "Horizon Bank SA",
  kind: "terms",
  reference: "D04",
  effectiveDate: "2026-03-01",
  addedAt: "2026-08-03T09:31:00.000Z",
  source: "mock",
  pageCount: 2,
  pages: [
    {
      number: 1,
      text: `ClauseLens Enterprise Subscription Agreement
Document ID D04 | Effective date 1 March 2026
Party Role
Asteria AI SAS Provider
Horizon Bank SA Customer
1. Subscription
1.1 Provider grants Customer access to ClauseLens Enterprise for contract analysis and risk classification. 1.2 The
subscription includes up to two million (2,000,000) pages processed during each subscription year.
2. Fees
2.1 Customer shall pay an annual subscription fee of EUR 120,000, invoiced in advance. 2.2 Fees exclude
applicable taxes.
3. Customer Documents
3.1 Customer retains all rights in documents it uploads. 3.2 Provider may process those documents only to provide,
secure and support ClauseLens Enterprise and as otherwise instructed in writing by Customer.
FICTITIOUS DOCUMENT FOR LEXHACK DEMONSTRATION Page 1`,
    },
    {
      number: 2,
      text: `4. Service Levels
4.1 Provider targets 99.5 percent monthly availability, excluding scheduled maintenance and events outside
Provider's reasonable control. 4.2 Service credits are Customer's sole contractual remedy for a verified availability
shortfall.
5. Term and Renewal
5.1 The initial subscription term is twelve (12) months from the Effective Date. 5.2 The Subscription automatically
renews for successive twelve-month periods unless either party gives at least sixty (60) days' written notice before
the end of the then-current term.
6. Confidentiality
6.1 Each party shall protect the other party's confidential information and use it only to perform this Agreement.
7. General
7.1 This Agreement is governed by French law. 7.2 Any amendment must be in writing and signed by authorised
representatives of both parties.
AGREED FOR DEMONSTRATION PURPOSES
The names, amounts and obligations in this document are fictitious and are provided solely to test the LexHack
prototype.
FICTITIOUS DOCUMENT FOR LEXHACK DEMONSTRATION Page 2`,
    },
  ],
};

const ATLAS_AMENDMENT: ContractDocument = {
  id: "doc-d05-atlas-am1",
  title: "Amendment No 1 to Atlas Business Corpus Data Licence",
  counterparty: "DataForge Ltd",
  kind: "addendum",
  reference: "D05",
  effectiveDate: "2026-07-01",
  addedAt: "2026-08-03T09:37:00.000Z",
  source: "mock",
  amends: "doc-d01-atlas",
  pageCount: 2,
  pages: [
    {
      number: 1,
      text: `Amendment No 1 to Atlas Business Corpus Data Licence
Document ID D05 | Effective date 1 July 2026 | Status EXECUTED FOR DEMONSTRATION
Party Role
DataForge Ltd Licensor
Asteria AI SAS Licensee
1. Background and Effective Date
1.1 This Amendment modifies the Atlas Business Corpus Data Licence Agreement identified as D01. 1.2 This
Amendment takes effect on 1 July 2026. Capitalised terms retain the meanings given in D01.
2. Limited Commercial Permission
2.1 Despite Section 3.1(a) of D01, Licensee may use the Licensed Data in ClauseLens Enterprise for production
retrieval, evaluation and quality monitoring. 2.2 This permission applies only to ClauseLens Enterprise and does not
authorise use in DealRoom Search, BoardPack Studio or any other product. 2.3 Licensee shall not expose,
reproduce or distribute the underlying Licensed Data to any customer.
3. Conditions
3.1 Licensee shall retain product-level logs showing when the Licensed Data is accessed. 3.2 Licensee shall provide
Licensor with a quarterly summary within twenty (20) calendar days after each quarter.
FICTITIOUS DOCUMENT FOR LEXHACK DEMONSTRATION Page 1`,
    },
    {
      number: 2,
      text: `4. Continuing Effect
4.1 Except as expressly modified by this Amendment, D01 remains unchanged and in full force. 4.2 If this
Amendment conflicts with D01, this Amendment controls only for the subject matter and product scope stated here.
5. No Affiliate Expansion
5.1 The permission granted by this Amendment applies only to Asteria AI SAS and does not extend to an affiliate
without Licensor's written consent.
6. General
6.1 This Amendment may be executed in counterparts. 6.2 French law continues to govern D01 and this
Amendment.
DOCUMENT STATUS
The names, amounts and obligations in this document are fictitious and are provided solely to test the LexHack
prototype.
FICTITIOUS DOCUMENT FOR LEXHACK DEMONSTRATION Page 2`,
    },
  ],
};

const HORIZON_SECURITY: ContractDocument = {
  id: "doc-d06-horizon-sec",
  title: "Horizon Bank Security Addendum",
  counterparty: "Horizon Bank SA",
  kind: "addendum",
  reference: "D06",
  effectiveDate: "2026-03-01",
  addedAt: "2026-08-03T09:44:00.000Z",
  source: "mock",
  amends: "doc-d04-horizon",
  pageCount: 2,
  pages: [
    {
      number: 1,
      text: `Horizon Bank Security Addendum
Document ID D06 | Effective date 1 March 2026 | Status EXECUTED FOR DEMONSTRATION
Party Role
Asteria AI SAS Provider
Horizon Bank SA Customer
1. Relationship to Subscription Agreement
1.1 This Addendum supplements the ClauseLens Enterprise Subscription Agreement identified as D04. 1.2 Defined
terms not stated here have the meanings given in D04.
2. Security Incident
2.1 'Security Incident' means confirmed unauthorised access to, acquisition of, or disclosure of Customer Data. A
service outage that does not involve Customer Data is not, by itself, a Security Incident.
3. Notification
3.1 Provider shall notify Customer within twenty-four (24) hours after confirming that a Security Incident affects
Customer Data. 3.2 The initial notice shall describe the known scope, affected systems and containment actions, to
the extent known.
FICTITIOUS DOCUMENT FOR LEXHACK DEMONSTRATION Page 1`,
    },
    {
      number: 2,
      text: `4. Testing and Evidence
4.1 Provider shall perform an annual independent security test and deliver the executive summary to Customer
within thirty (30) days after completion. Delivery does not constitute Customer acceptance unless Customer confirms
acceptance in writing.
5. Remediation
5.1 Provider shall address material findings according to a documented remediation plan. 5.2 The parties shall agree
any customer-specific deadline in writing.
6. Continuing Effect
6.1 D04 remains in force. If this Addendum conflicts with D04 on security incident notification, this Addendum
controls.
DOCUMENT STATUS
The names, amounts and obligations in this document are fictitious and are provided solely to test the LexHack
prototype.
FICTITIOUS DOCUMENT FOR LEXHACK DEMONSTRATION Page 2`,
    },
  ],
};

const OCRVISION: ContractDocument = {
  id: "doc-d07-ocrvision",
  title: "OCRVision API Enterprise Agreement (Asteria AI UK Ltd)",
  counterparty: "VisionCore Inc",
  kind: "license",
  reference: "D07",
  effectiveDate: "2026-04-01",
  addedAt: "2026-08-03T09:51:00.000Z",
  source: "mock",
  pageCount: 2,
  pages: [
    {
      number: 1,
      text: `OCRVision API Enterprise Agreement
Document ID D07 | Effective date 1 April 2026 | Status EXECUTED FOR DEMONSTRATION
Party Role
VisionCore Inc Provider
Asteria AI UK Ltd Customer
1. Customer and Scope
1.1 Provider shall supply the OCRVision API to Customer. 1.2 'Customer' means Asteria AI UK Ltd only and
excludes its parent, subsidiaries and other affiliates unless Provider gives prior written consent.
2. Commercial Use
2.1 Customer may integrate OCRVision API into Customer's commercial hosted services. No right is granted to
Asteria AI SAS or any other affiliate by this Agreement. 2.2 Customer shall not resell API credentials.
3. Data Processing
3.1 Provider may process submitted files only to provide and secure OCRVision API. 3.2 Customer shall not submit
files it lacks authority to process.
FICTITIOUS DOCUMENT FOR LEXHACK DEMONSTRATION Page 1`,
    },
    {
      number: 2,
      text: `4. Fees
4.1 Customer shall pay GBP 18,000 per year for up to 500,000 pages. 4.2 Excess usage is charged according to the
order form.
5. Term
5.1 The initial term is twelve (12) months. 5.2 Renewal requires a new order form unless the parties agree an
automatic renewal in writing.
6. Assignment and Affiliates
6.1 Customer may not assign or sublicense this Agreement to an affiliate without Provider's written consent.
DOCUMENT STATUS
The names, amounts and obligations in this document are fictitious and are provided solely to test the LexHack
prototype.
FICTITIOUS DOCUMENT FOR LEXHACK DEMONSTRATION Page 2`,
    },
  ],
};

const REPORTFORGE: ContractDocument = {
  id: "doc-d08-reportforge",
  title: "ReportForge Enterprise Order Form (projet non signé)",
  counterparty: "ReportForge Systems",
  kind: "other",
  reference: "D08",
  // Le document porte la mention « Effective date Not effective » : aucune date
  // d'effet ne peut être affichée tant qu'il n'est pas signé.
  effectiveDate: "—",
  addedAt: "2026-08-03T09:58:00.000Z",
  source: "mock",
  pageCount: 2,
  pages: [
    {
      number: 1,
      text: `ReportForge Enterprise Order Form
Document ID D08 | Effective date Not effective | Status UNSIGNED DRAFT
Party Role
ReportForge Systems Proposed licensor
Asteria AI SAS Proposed customer
1. Draft Status
1.1 This document is an unsigned draft for negotiation and has no contractual effect until signed by authorised
representatives of both parties. 1.2 No licence or service is granted by circulation of this draft.
2. Proposed Product
2.1 The proposed subscription would cover ReportForge Enterprise for use in BoardPack Studio. 2.2 Production
deployment rights remain subject to execution of this Order Form and the referenced master terms.
3. Proposed Term
3.1 The proposed initial term is twelve (12) months from an effective date to be inserted at signature.
FICTITIOUS DOCUMENT FOR LEXHACK DEMONSTRATION Page 1`,
    },
    {
      number: 2,
      text: `4. Proposed Fees
4.1 The non-binding proposed annual fee is EUR 12,000. 4.2 Taxes and excess usage fees would be added if an
agreement is executed.
5. Missing Master Terms
5.1 The master terms referenced in this draft are not attached. The parties have not agreed limitations, warranty
terms, data rights or termination rights.
6. Execution
6.1 This draft becomes effective only when both parties sign it. No signatures appear in this document.
DOCUMENT STATUS
The names, amounts and obligations in this document are fictitious and are provided solely to test the LexHack
prototype.
FICTITIOUS DOCUMENT FOR LEXHACK DEMONSTRATION Page 2`,
    },
  ],
};

export const MOCK_DOCUMENTS: ContractDocument[] = [
  ATLAS,
  ATLAS_AMENDMENT,
  HELIXLM,
  VECTORGRID,
  HORIZON,
  HORIZON_SECURITY,
  OCRVISION,
  REPORTFORGE,
];
