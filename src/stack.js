'use strict';

import List from './singly-linked-list.js';

export default class {
  constructor () {
    this.list = new List();
    this.top = null;
    this.elementsCount = 0;
  }

  push (value) {
    this.list.addFirst(value);
    this.top = value;
    this.elementsCount++;
  }

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

  peek () {
    return this.top;
  }

  isEmpty () {
    return this.list.isEmpty();
  }

  get size () {
    return this.elementsCount;
  }
};
