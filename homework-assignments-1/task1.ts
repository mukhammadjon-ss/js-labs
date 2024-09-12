abstract class Shape {
  abstract calculateArea(): number;
}

class Circle extends Shape {
  private radius: number;
  constructor(radius: number) {
    super();
    this.radius = radius;
  }
  calculateArea(): number {
    return Math.PI * Math.pow(this.radius, 2);
  }
}

class Rectangle extends Shape {
  private length: number;
  private width: number;
  constructor(length: number, width: number) {
    super();
    this.length = length;
    this.width = width;
  }

  calculateArea(): number {
    return this.length * this.width;
  }
}
