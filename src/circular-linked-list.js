'use strict';

class Node {
  constructor (value, next = null, previous = null) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }
}

export default class {
  constructor () {
    this.last = null;
  }

  get values () {
    let values = '';

    if (!this.isEmpty()) {
      let current = this.last.next;

      do {
        values += JSON.stringify(current.value) + ',';
        current = current.next;
      } while (current && current !== this.last.next);

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
      this.last = n;
      n.next = n;
      n.previous = n;
    } else {
      let first = this.last.next;

      this.last.next = n;
      n.previous = this.last;
      first.previous = n;

      if (first === this.last) {
        n.next = this.last;
      } else {
        n.next = first;
      }

      this.last = n;
    }
  }

  /**
   * Adds a value at first position of list
   * @param {*} value
   */
  addFirst (value) {
    let n = new Node(value);

    if (this.isEmpty()) {
      this.add(value);
    } else {
      let first = this.last.next;
      n.next = first;
      n.previous = this.last;
      first.previous = n;
      this.last.next = n;
    }
  }

  /**
  * Adds a value into a specified position in the list
  * @param {*} value
  * @param {Number} position
  */
  addAtPosition (value, position) {
    let index = 1;
    let current;
    let n = new Node(value);

    if (position === 0) {
      this.addFirst(value);
      return;
    }

    if (this.isEmpty() && position > 0) {
      throw new Error('Unable to add at position ' + position + ', list is of length ' + (index === 1 ? 0 : index));
    } else {
      current = this.last.next;
    }

    while (index <= position) {
      if (index < position) {
        current = current.next;
        index++;
      } else if (index === position) {
        let tmp = current.next;

        current.next = n;
        tmp.previous = n;
        n.next = tmp;
        n.previous = current;

        break;
      }

      if (current === this.last.next) {
        break;
      }
    }

    if (n.previous === this.last) {
      this.last = n;
    }

    if (index !== position && position !== 0) {
      throw new Error('Unable to add at position ' + position + ', list is of length ' + (index === 1 ? 0 : index));
    }
  }

  /**
   * Search for a value in the list
   * @param  {*} value
   * @return {Node}
   */
  search (value) {
    let current = this.last;

    do {
      if (current) {
        if (current.value === value) {
          return current;
        }

        current = current.next;
      }
    } while (current !== null && current !== this.last);

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
      node.previous.next = node.next;
      node.next.previous = node.previous;

      if (node === this.last) {
        this.last = node.previous;
      }

      return true;
    }

    return false;
  }

  /**
   * Reverse the linked list
   */
  reverse () {
    if (!this.isEmpty()) {
      let first = this.last.next;
      let current = first;
      let tmp;

      do {
        tmp = current.next;
        current.next = current.previous;
        current.previous = tmp;
        current = tmp;
      } while (current !== first);

      this.last = current;
    }
  }

  isEmpty () {
    return this.last === null;
  }
}
