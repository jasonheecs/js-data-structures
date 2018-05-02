'use strict';

import {Queue} from '../src/index.js';
import {generateRandomNumbers} from './helper.js';

const expect = require('chai').expect;

describe('test queue', function () {
  it('test enqueue and dequeue', function () {
    let q = new Queue();
    let data = generateRandomNumbers(5, 1, 9999);
    let tmp = [];

    data.forEach((el) => q.enqueue(el));

    while (!q.isEmpty()) {
      tmp.push(q.dequeue());
    }

    expect(tmp).to.deep.equal(data);
  });

  it('test dequeue for empty queue', function () {
    let q = new Queue();

    expect(q.dequeue()).to.be.false;
  });
});
