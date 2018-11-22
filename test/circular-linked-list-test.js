'use strict';

import { CircularList } from '../src/index.js';
import commonTests from './linked-lists-common.js';
import { generateRandomNumbers, generateList } from './helper.js';

const expect = require('chai').expect;

describe('test circular linked list', function () {
  commonTests(CircularList);

  it('test nodes in reverse', function () {
    let data = generateRandomNumbers(50, 1, 10000);
    let list = generateList(data, CircularList);

    let values = [];
    let endNode = list.last;
    do {
      values.push(endNode.value);
      endNode = endNode.previous;
    } while (endNode !== list.last);

    expect(values).to.deep.equal(data.reverse());
  });
});
