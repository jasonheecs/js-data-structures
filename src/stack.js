'use strict';

import List from './singly-linked-list.js';

export default class {
  constructor () {
    this.list = new List();
    this.top = null;
    this.elementsCount = 0;
  }

  /**
   * @param  {*} value
   */
  push (value) {
    this.list.addFirst(value);
    this.top = value;
    this.elementsCount++;
  }

  /**
   * @return {*}
   */
  pop () {
    if (!this.isEmpty()) {
      let result = this.top;
      this.list.delete(this.top);
      this.top = this.list.first ? this.list.first.value : null;
      this.elementsCount--;

      return result;
    }

    return false;
  }

  /**
   * @return {*}
   */
  peek () {
    return this.top;
  }

  /**
   * @return {Boolean}
   */
  isEmpty () {
    return this.list.isEmpty();
  }

  /**
   * @return {Number}
   */
  get size () {
    return this.elementsCount;
  }
};
