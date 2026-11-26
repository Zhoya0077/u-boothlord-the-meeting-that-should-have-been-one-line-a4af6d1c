// The Meeting That Should Have Been One Line
// Writes a single sentence to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "The update is: nothing changed, nobody's blocked, and the only thing we decided was to have another meeting about this meeting.";

// Self-checking gate: the sealed scorer requires UTF-8 text of 1-200
// characters, not only whitespace, a single line, and a single sentence.
function validateEntry(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  if (sentences.length !== 1) {
    throw new Error(`entry must be one sentence, got ${sentences.length}`);
  }
}

function main(): void {
  validateEntry(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
  console.log(ENTRY);
}

main();
