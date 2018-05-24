'use strict';

import {Trie} from '../src/index.js';

const randomWords = require('random-words');
const expect = require('chai').expect;

describe('testing trie', function () {
  it('test adding values', function () {
    let trie = new Trie();
    let words = randomWords(50);

    words.forEach((word) => {
      trie.addWord(word);
    });

    expect(trie.getWords()).to.include.members(words);
  });

  it('test adding invalid values', function () {
    let trie = new Trie();

    let invalidInputs = ['', 123, '$%^&', '123'];

    invalidInputs.forEach((input) => {
      expect(trie.addWord.bind(trie, input)).to.throw(Error, 'Invalid Word');
    });
  });
});
