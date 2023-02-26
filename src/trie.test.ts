import tap from "tap";

import { Trie } from "./trie";

tap.test("Insert and search", (t) => {
  const trie = new Trie();
  trie.insert("test");
  trie.insert("testes");
  t.equal(trie.search("test"), true, "should be able to find test");
  t.equal(trie.search("tes"), false, "should not be able to find tes");
  t.equal(trie.search("teste"), false, "Should not be able to find teste");
  t.equal(trie.search("testes"), true, "Should be able to find testes");
  t.equal(trie.search("testest"), false, "Should not be able to find testest");
  t.end();
});
