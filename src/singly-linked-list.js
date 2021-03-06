'use strict';

class Node {
  constructor (value, next = null) {
    this.value = value;
    this.next = next;
  }
}

export default class List {
  constructor () {
    this.first = null;
  }

  get values () {
    let values = '';

    if (!this.isEmpty()) {
      let current = this.first;

      while (current != null) {
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
    let n = typeof value === 'Node' ? value : new Node(value);

    if (this.isEmpty()) {
      this.first = n;
    } else {
      let current = this.first;

      while (current.next != null) {
        current = current.next;
      }

      current.next = n;
    }
  }

  /**
   * Adds a value at first position of list
   * @param {*} value
   */
  addFirst (value) {
    let n = new Node(value, this.first);
    this.first = n;
  }

  /**
  * Adds a value into a specified position in the list
  * @param {*} value
  * @param {Number} position
  */
  addAtPosition (value, position) {
    let n = new Node(value);
    let index = 1;
    let current = this.first;

    if (position === 0) {
      this.addFirst(value);
      return;
    }

    while (current != null) {
      if (index < position) {
        current = current.next;
        index++;
      } else if (index === position) {
        let tmp = current.next;
        current.next = n;
        n.next = tmp;
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
    let hasDeletedNode = false;

    if (!this.isEmpty() && this.first.value === value) {
      this.first = this.first.next;
      hasDeletedNode = true;
    }

    let previous = null;
    let current = this.first;

    while (current !== null) {
      if (current.value === value) {
        previous.next = current.next;
        hasDeletedNode = true;
      } else {
        previous = current;
      }

      current = current.next;
    }

    return hasDeletedNode;
  }

  /**
   * Reverse the linked list
   */
  reverse () {
    let previous = null;
    let current = this.first;
    let next = null;

    while (current !== null) {
      next = current.next;

      current.next = previous;

      previous = current;
      current = next;
    }

    this.first = previous;
  }

  /**
  * @return {Boolean}
  */
  isEmpty () {
    return this.first === null;
  }
};
