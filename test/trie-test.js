'use strict';

import { Trie } from '../src/index.js';

const randomWords = require('random-words');
const expect = require('chai').expect;

/**
 * @param  {Array<string>} words
 * @return {Trie}
 */
function createTrie (words) {
  let trie = new Trie();

  words.forEach((word) => {
    trie.addWord(word);
  });

  return trie;
}

describe('testing trie', function () {
  it('test adding values', function () {
    let words = randomWords(50);
    let trie = createTrie(words);

    expect(trie.getWords()).to.include.members(words);
  });

  it('test adding invalid values', function () {
    let trie = new Trie();

    let invalidInputs = ['', 123, '$%^&', '123'];

    invalidInputs.forEach((input) => {
      expect(trie.addWord.bind(trie, input)).to.throw(Error, 'Invalid Word');
    });
  });

  it('test checking if word exists', function () {
    let words = randomWords(50);
    let trie = createTrie(words);

    words.forEach((word) => {
      expect(trie.hasWord(word)).to.be.true;
    });
  });

  it('test checking if word does not exist', function () {
    let words = ['call', 'dog', 'carded'];
    let trie = createTrie(words);

    expect(trie.hasWord('cat')).to.be.false;
    expect(trie.hasWord('card')).to.be.false;
  });

  it('test hasWord for empty trie', function () {
    let trie = new Trie();

    expect(trie.hasWord('cat')).to.be.false;
  });

  it('test finding node based on prefix', function () {
    let words = ['call', 'dog', 'carded'];
    let trie = createTrie(words);

    expect(trie.find('ca').children.size).to.be.above(1);
    expect(trie.find('do').children.size).to.equal(1);
    expect(trie.find('o')).to.equal(null);
    expect(trie.find.bind(trie, '')).to.throw(Error, 'Invalid Word');
  });
});
