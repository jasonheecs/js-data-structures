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

      while (current) {
        values += JSON.stringify(current.value) + ',';
        current = current.next;

        if (current === this.last.next) {
          break;
        }
      }

      values = values.slice(0, -1);
    }

    return values;
  }

  add (value) {
    let n = new Node(value);

    if (this.isEmpty()) {
      this.last = n;
      n.next = n;
    } else {
      let first = this.last.next;

      this.last.next = n;
      n.previous = this.last;

      if (first === this.last) {
        n.next = this.last;
      } else {
        n.next = first;
      }

      this.last = n;
    }
  }

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

  addAtPosition (value, position) {
    let index = 1;
    let current = this.last.next;
    let n = new Node(value);

    if (position === 0) {
      this.addFirst(value);
      return;
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

  isEmpty () {
    return this.last === null;
  }
}
