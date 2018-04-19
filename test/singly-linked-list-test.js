'use strict';

import {List} from '../src/index.js';

const expect = require('chai').expect;

/**
 * @param  {Number} maxLength
 * @param  {Number} minValue
 * @param  {Number} maxValue
 * @return {Array}
 */
function generateRandomNumbers (maxLength, minValue, maxValue) {
  let dataLength = getRandomIntInclusive(1, maxLength);
  let randomData = [];

  for (let i = 0; i < dataLength; i++) {
    randomData.push(getRandomIntInclusive(minValue, maxValue));
  }

  return randomData;
}

/**
 * @param  {Number} min
 * @param  {Number} max
 * @return {Number}
 */
function getRandomIntInclusive (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Format random array data output to follow the output of the Linked List
 * @return {string}
 */
function formatRandomData (data) {
  return data.reduce((accumulator, currentNumber) => accumulator + ',' + currentNumber);
}

describe('test singly linked list', function () {
  it('add numbers', function () {
    let data = generateRandomNumbers(50, 1, 10000);
    let list = new List();

    data.forEach((number) => {
      list.add(number);
    });

    expect(list.values).to.equal(formatRandomData(data));
  });

  it('add first', function () {
    let list = new List();
    list.add('abc');

    expect(list.values).to.equal(JSON.stringify('abc'));
  });

  it('add at position 0', function () {
    let data = generateRandomNumbers(10, 1, 10000);
    let list = new List();
    let newValue = getRandomIntInclusive(1, 9999);

    data.forEach((number) => {
      list.add(number);
    });
    list.addAtPosition(newValue, 0);

    expect(list.values).to.equal(newValue + ',' + formatRandomData(data));
  });

  it('add in middle', function () {
    let data = generateRandomNumbers(50, 1, 10000);
    let list = new List();
    let newValue = getRandomIntInclusive(1, 9999);

    data.forEach((number) => {
      list.add(number);
    });

    list.addAtPosition(newValue, Math.floor((data.length - 1) / 2));
    data.splice(Math.floor((data.length - 1) / 2), 0, newValue);

    expect(list.values).to.equal(formatRandomData(data));
  });

  it('add beyond length of list', function () {
    let list = new List();
    expect(() => list.addAtPosition(5, 9999)).to.throw('Unable to add at position 9999, list is of length 0');
  });
});
