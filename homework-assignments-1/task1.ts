abstract class Shape {
  constructor() {}

  abstract calculateArea(): number;
}

class Circle extends Shape {
  radius: number;
  constructor(radius: number) {
    super();
    this.radius = radius;
  }

  calculateArea() {
    return Math.PI * Math.pow(this.radius, 2);
  }
}

class Rectangle extends Shape {
  length: number;
  width: number;
  constructor(length: number, width: number) {
    super();
    this.length = length;
    this.width = width;
  }

  calculateArea() {
    return this.length * this.width;
  }
}

const circle = new Circle(5);

const rectangle = new Rectangle(10, 5);
