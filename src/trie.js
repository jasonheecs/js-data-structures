'use strict';

class Node {
  constructor (value = null, isCompleteWord = false) {
    this.value = value;
    this.children = new Map();
    this.isCompleteWord = isCompleteWord;
  }

  /**
   * @param {char} value
   * @param {Node} node
   */
  setChild (value, node) {
    this.children.set(value, node);
  }

  /**
   * @param  {char} value
   * @return {Node}
   */
  getChild (value) {
    return this.children.get(value);
  }
}

export default class Trie {
  constructor () {
    this.root = new Node();
  }

  /**
  * @param {string} word
  */
  addWord (word) {
    if (!this.isValidWord(word)) {
      throw Error('Invalid Word');
    }

    let current = this.root;

    Array.from(word).forEach((letter) => {
      if (!current.getChild(letter)) {
        current.setChild(letter, new Node(letter));
      }

      current = current.getChild(letter);
    });

    current.isCompleteWord = true;
  }

  /**
  * @return {Array<string>}
  */
  getWords () {
    let words = [];

    const getWords = (node, wordFragment) => {
      node.children.forEach((child) => {
        if (child.isCompleteWord) {
          words.push(wordFragment + child.value);
        }

        getWords(child, wordFragment + child.value);
      });
    };

    getWords(this.root, '');

    return words;
  }

  /**
  * @param  {string}  word
  * @return {Boolean}
  */
  isValidWord (word) {
    return (typeof (word) === 'string' || word instanceof String) && word.match(/^[A-z]+$/);
  }
}
