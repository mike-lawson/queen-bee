export type TrieNode = {
  isLeaf: boolean;
  nodes: Partial<Record<string, TrieNode>>;
};

export class Trie implements TrieNode {
  private root: TrieNode = {
    isLeaf: false,
    nodes: {},
  };

  get nodes() {
    return this.root.nodes;
  }

  get isLeaf() {
    return this.root.isLeaf;
  }

  set isLeaf(value: boolean) {
    this.root.isLeaf = value;
  }

  insert(word: string) {
    let node = this.root;
    for (let char of word) {
      if (!node.nodes[char]) {
        node.nodes[char] = new Trie();
      }
      node = node.nodes[char]!;
    }
    node.isLeaf = true;
  }

  search(word: string): boolean {
    let node = this.root;
    for (const char of word) {
      if (!node.nodes[char]) {
        return false;
      }
      node = node.nodes[char]!;
    }
    return node.isLeaf;
  }
}
