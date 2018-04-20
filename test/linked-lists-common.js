/* eslint no-unused-expressions: 0 */

'use strict';

const expect = require('chai').expect;

/**
 * @param  {Number} maxLength
 * @param  {Number} minValue
 * @param  {Number} maxValue
 * @return {Array}
 */
function generateRandomNumbers (maxLength, minValue, maxValue) {
  let dataLength = getRandomIntInclusive(10, maxLength);
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

/**
 * Generate a list filled with some data
 * @param  {Array} data
 * @return {List}
 */
function generateList (data, List) {
  let list = new List();

  data.forEach((number) => {
    list.add(number);
  });

  return list;
}

export default (List) => {
  it('add numbers', function () {
    let data = generateRandomNumbers(50, 1, 10000);
    let list = generateList(data, List);

    expect(list.values).to.equal(formatRandomData(data));
  });

  it('add first', function () {
    let list = new List();
    list.addFirst('abc');

    expect(list.values).to.equal(JSON.stringify('abc'));
  });

  it('add at position 0', function () {
    let data = generateRandomNumbers(10, 1, 10000);
    let list = generateList(data, List);
    let newValue = getRandomIntInclusive(1, 9999);

    list.addAtPosition(newValue, 0);

    expect(list.values).to.equal(newValue + ',' + formatRandomData(data));
  });

  it('add in middle', function () {
    let data = generateRandomNumbers(50, 1, 10000);
    let list = generateList(data, List);
    let newValue = getRandomIntInclusive(1, 9999);

    list.addAtPosition(newValue, Math.floor((data.length - 1) / 2));
    data.splice(Math.floor((data.length - 1) / 2), 0, newValue);

    expect(list.values).to.equal(formatRandomData(data));
  });

  it('add beyond length of list', function () {
    let list = new List();
    expect(() => list.addAtPosition(5, 9999)).to.throw('Unable to add at position 9999, list is of length 0');
  });

  // it('search for non-existant value', function () {
  //   let list = new List();
  //   expect(list.search(5)).to.be.false;
  // });

  // it('search for value', function () {
  //   let data = generateRandomNumbers(50, 1, 10000);
  //   let list = generateList(data, List);

  //   let valueToSearch = data[getRandomIntInclusive(0, data.length - 1)];
  //   let node = list.search(valueToSearch);

  //   expect(node.value).to.equal(valueToSearch);
  // });

  // it('delete a value', function () {
  //   let data = generateRandomNumbers(50, 1, 10000);
  //   let list = generateList(data, List);

  //   let valueToDelete = data[getRandomIntInclusive(0, data.length - 1)];
  //   data.splice(data.indexOf(valueToDelete), 1);
  //   list.delete(valueToDelete);

  //   expect(list.values).to.equal(formatRandomData(data));
  // });

  // it('delete first value', function () {
  //   let data = generateRandomNumbers(50, 1, 10000);
  //   let list = generateList(data, List);

  //   let valueToDelete = data[0];
  //   data.shift();
  //   list.delete(valueToDelete);

  //   expect(list.values).to.equal(formatRandomData(data));
  // });

  // it('delete last value', function () {
  //   let data = generateRandomNumbers(50, 1, 10000);
  //   let list = generateList(data, List);

  //   let valueToDelete = data[data.length - 1];
  //   data.pop();
  //   list.delete(valueToDelete);

  //   expect(list.values).to.equal(formatRandomData(data));
  // });

  // it('delete non-existant value', function () {
  //   let list = new List();

  //   expect(list.delete(5)).to.be.false;
  // });

  // it('reverse list', function () {
  //   let data = generateRandomNumbers(50, 1, 10000);
  //   let list = generateList(data, List);
  //   list.reverse();

  //   expect(list.values).to.equal(formatRandomData(data.reverse()));
  // });
};
