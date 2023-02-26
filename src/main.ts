import inquirer from "inquirer";
import fs from "fs/promises";
import path from "path";

import { Trie, TrieNode } from "./trie";

const dictionaryFile = path.join(__dirname, "en.txt");
let _trie: Trie;

export async function buildTrie() {
  const data = await fs.readFile(dictionaryFile, "utf-8");
  const words = data.split("\n");
  debugger;
  const trie = new Trie();
  for (const word of words) {
    trie.insert(word);
  }
  return trie;
}

async function getTrie() {
  if (_trie) {
    return _trie;
  }
  _trie = await buildTrie();
  return _trie;
}

async function main() {
  let letters: string = "";
  let trie: Trie;
  while (true) {
    [{ letters }, trie] = await Promise.all([
      inquirer.prompt({
        type: "input",
        message:
          "Using the first letter as the key, what letters are in today's puzzle?",
        name: "letters",
      }),
      getTrie(),
    ]);
    if (letters.length === 7) {
      break;
    }
    console.log("⚠️\tExactly 7 letters are required");
  }

  const words = findWords(trie, letters.toLowerCase());
  console.log(`🐝 Found ${words.length} candidate words:`);
  for (const word of words) {
    console.log(`\t${word}`);
  }
}

const findWords = (trie: TrieNode, letters: string, prepend = ""): string[] => {
  const output = [];
  if (prepend.length > 3 && trie.isLeaf && prepend.includes(letters[0])) {
    output.push(prepend);
  }
  const letterSet = new Set(letters.split(""));
  const matchingLetters = Object.keys(trie.nodes).filter((x) =>
    letterSet.has(x)
  );

  if (matchingLetters.length === 0) {
    return output;
  }

  return [
    ...output,
    ...matchingLetters.flatMap((letter) =>
      findWords(trie.nodes[letter]!, letters, `${prepend}${letter}`)
    ),
  ];
};

main();
