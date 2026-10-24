export interface Principle {
  title: string;
  body: string;
  evidence: string[];
}

/** How the systems above are designed; each point names where it was applied. */
export const principles: Principle[] = [
  {
    title: "Money lives in an append-only ledger.",
    body: "Balances are derived from balanced debit and credit lines, stored as integer cents, never edited in place. Corrections are new entries, so history always explains the present.",
    evidence: ["Kikapu", "Cheddaz Bet"],
  },
  {
    title: "Every boundary is idempotent.",
    body: "Payment callbacks, webhooks and queued jobs are keyed so a retry or a replay returns the first result instead of a duplicate. It is the cheapest way to make a distributed system calm.",
    evidence: ["Kikapu", "BeatBnk", "Swift POS"],
  },
  {
    title: "Trust is signed, not assumed.",
    body: "Requests crossing an organisation boundary are signed and verified, webhooks carry an HMAC, database rows carry row-level security, and tokens are issued per device so one leaked session is one session.",
    evidence: ["JetCrash", "Kikapu", "Swift POS"],
  },
  {
    title: "Hot paths get a queue.",
    body: "Anything latency-sensitive or bursty, from bet placement to video downloads and bet settlement, runs through a queue with workers that can scale and fail independently of the request path.",
    evidence: ["JetCrash", "VideoElf", "Cheddaz Bet"],
  },
  {
    title: "Shipped means observable.",
    body: "A pipeline that type-checks and tests every package, containers deployed the same way every time, Prometheus and Grafana watching, structured logs, automated backups, and alerts before users notice.",
    evidence: ["Swift POS", "JetCrash", "Cheddaz Bet", "VideoElf"],
  },
];
