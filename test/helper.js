'use strict';

/**
 * @param  {Number} maxLength
 * @param  {Number} minValue
 * @param  {Number} maxValue
 * @return {Array}
 */
export function generateRandomNumbers (maxLength, minValue, maxValue) {
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
export function getRandomIntInclusive (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Format random array data output to follow the output of the Linked List
 * @return {string}
 */
export function formatRandomData (data) {
  return data.reduce((accumulator, currentNumber) => accumulator + ',' + currentNumber);
}

/**
 * Generate a list filled with some data
 * @param  {Array} data
 * @return {List}
 */
export function generateList (data, List) {
  let list = new List();

  data.forEach((number) => {
    list.add(number);
  });

  return list;
}
