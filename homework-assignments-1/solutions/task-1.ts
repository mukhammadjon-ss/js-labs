abstract class Shape {
  abstract calculateArea(): number;
}

class Circle extends Shape {
  public radius: number;

  constructor(radius: number) {
    super();
    this.radius = radius;
  }

  calculateArea() {
    return Math.PI * Math.pow(this.radius, 2);
  }
}

class Rectangle extends Shape {
  public length: number;
  public width: number;

  constructor(length: number, width: number) {
    super();
    this.length = length;
    this.width = width;
  }

  calculateArea() {
    return this.length * this.width;
  }
}
