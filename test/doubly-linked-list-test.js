'use strict';

import {DoublyList} from '../src/index.js';
import commonTests from './linked-lists-common.js';
import {generateRandomNumbers, generateList} from './helper.js';

const expect = require('chai').expect;

describe('test doubly linked list', function () {
  commonTests(DoublyList);

  it('test nodes in reverse', function () {
    let data = generateRandomNumbers(50, 1, 10000);
    let list = generateList(data, DoublyList);

    let values = [];
    let endNode = list.end;
    while (endNode !== null) {
      values.push(endNode.value);
      endNode = endNode.previous;
    }

    expect(values).to.deep.equal(data.reverse());
  });
});
