/* eslint no-unused-expressions: 0 */

'use strict';

import { Stack } from '../src/index.js';
import { generateRandomNumbers } from './helper.js';

const expect = require('chai').expect;

describe('test stack', function () {
  it('test push and pop', function () {
    let data = generateRandomNumbers(50, 1, 9999);
    let stack = new Stack();
    let tmp = [];

    data.forEach((el) => stack.push(el));

    while (!stack.isEmpty()) {
      tmp.push(stack.pop());
    }

    expect(tmp).to.deep.equal(data.reverse());
  });

  it('test pop for empty stack', function () {
    let stack = new Stack();
    expect(stack.pop()).to.be.false;
  });

  it('test peek', function () {
    let data = generateRandomNumbers(50, 1, 9999);
    let stack = new Stack();

    data.forEach((el) => stack.push(el));

    expect(stack.peek()).to.equal(data[data.length - 1]);
    expect(stack.pop()).to.equal(data[data.length - 1]);
  });
});
