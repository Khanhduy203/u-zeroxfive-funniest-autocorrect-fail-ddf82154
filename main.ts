// Entry for make.fun bounty "Funniest Autocorrect Fail"
// (u-zeroxfive-funniest-autocorrect-fail-ddf82154).
//
// Writes a single one-line autocorrect fail to entry.txt inside
// MAKEFUN_OUTPUT_DIR. Node-stdlib only, fully deterministic:
// the same line is written on every run.

const fs = require("node:fs");
const path = require("node:path");

// A text to the landlord where one autocorrected word flips the
// meaning: "kitchen" became "kitten". The panic is real, the
// victim is innocent, and the slip is unmistakable on first read.
const ENTRY =
  "Hi, the washing machine just broke and flooded the kitten. Can you send a plumber over ASAP? I'm stuck at work.";

function main() {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    throw new Error("MAKEFUN_OUTPUT_DIR is not set");
  }

  // Gate: exactly one line, 1-199 characters, not only whitespace.
  if (ENTRY.length < 1 || ENTRY.length > 199) {
    throw new Error(`entry length ${ENTRY.length} is outside 1-199`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }

  fs.mkdirSync(outDir, { recursive: true });
  // No trailing newline: the file holds exactly the entry line.
  fs.writeFileSync(path.join(outDir, "entry.txt"), ENTRY, "utf8");
}

main();
