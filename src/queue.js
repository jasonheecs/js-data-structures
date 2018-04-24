'use strict';

/**
 * Queue implementation using an array
 */
export default class {
  constructor (maxCapacity = 5) {
    this.front = 0;
    this.end = maxCapacity - 1;
    this.capacity = maxCapacity;
    this.size = 0;
    this.data = new Array(maxCapacity);
  }

  /**
   * @param  {*} value
   */
  enqueue (value) {
    this.end = (++this.end) % this.capacity;
    this.data[this.end] = value;
    this.size++;
  }

  /**
   * @return {*}
   */
  dequeue () {
    if (!this.isEmpty()) {
      this.size--;
      let result = this.data[this.front];
      this.front = (++this.front) % this.capacity;

      return result;
    }

    return false;
  }

  /**
   * @return {Boolean}
   */
  isEmpty () {
    return this.size === 0;
  }
};
