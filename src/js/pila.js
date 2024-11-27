export class Pila {
  data = [];

  push(elemento) {
    this.data.push(elemento);
  }

  pop() {
    return this.data.pop();
  }

  length() {
    return this.data.length;
  }
}