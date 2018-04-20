'use strict';

class Node {
  constructor (value, next = null, previous = null) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }
}

export default class List {
  constructor () {
    this.first = null;
    this.end = null;
  }

  get values () {
    let values = '';

    if (!this.isEmpty()) {
      let current = this.first;

      while (current !== null) {
        values += JSON.stringify(current.value) + ',';
        current = current.next;
      }

      values = values.slice(0, -1);
    }

    return values;
  }

  /**
  * Adds a value to the end of the linked list
  * @param {*}
  */
  add (value) {
    let n = new Node(value);

    if (this.isEmpty()) {
      this.first = n;
      this.end = this.first;
    } else {
      this.end.next = n;
      n.previous = this.end;
      this.end = n;
    }
  }

  /**
   * Adds a value at first position of list
   * @param {*} value
   */
  addFirst (value) {
    let n = new Node(value, this.first);
    if (!this.isEmpty()) {
      this.first.previous = n;
    }

    this.first = n;

    if (this.end === null) {
      this.end = this.first;
    }
  }

  /**
  * Adds a value into a specified position in the list
  * @param {*} value
  * @param {Number} position
  */
  addAtPosition (value, position) {
    let index = 1;
    let current = this.first;
    let n = new Node(value);

    if (position === 0) {
      this.addFirst(value);
      return;
    }

    while (current !== null) {
      if (index < position) {
        current = current.next;
        index++;
      } else if (index === position) {
        let tmp = current.next;

        current.next = n;
        n.previous = current;
        n.next = tmp;
        tmp.previous = n;

        if (n.previous === this.end) {
          this.end = n;
        }

        break;
      }
    }

    if ((index !== position && position !== 0) || current === null) {
      throw new Error('Unable to add at position ' + position + ', list is of length ' + (index === 1 ? 0 : index));
    }
  }

  /**
   * Search for a value in the list
   * @param  {*} value
   * @return {Node}
   */
  search (value) {
    let current = this.first;

    while (current !== null) {
      if (current.value === value) {
        return current;
      }

      current = current.next;
    }

    return false;
  }

  /**
   * Delete a value from the list
   * @param  {*} value
   * @return {Boolean}
   */
  delete (value) {
    let node = this.search(value);

    if (node) {
      if (!node.previous) {
        this.first = node.next;
        this.first.previous = null;
      } else {
        let tmp = node.next;
        let tmp2 = node.previous;

        node.previous.next = tmp;
        if (tmp) {
          tmp.previous = tmp2;
        }

        if (this.end === node.previous) {
          this.end = node;
        }
      }

      return true;
    }

    return false;
  }

  /**
   * Reverse the linked list
   */
  reverse () {
    let current = this.first;

    while (current !== null) {
      let tmp = current.next;
      current.next = current.previous;
      current.previous = tmp;
      current = tmp;
    }

    let tmp = this.end;
    this.end = this.first;
    this.first = tmp;
  }

  /**
  * @return {Boolean}
  */
  isEmpty () {
    return this.first === null;
  }
};
