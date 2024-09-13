abstract class Shape {
  abstract calculateArea(): number;
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
    this.radius = radius;
  }

  calculateArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(private length: number, private width: number) {
    super();
    this.length = length;
    this.width = width;
  }

  calculateArea(): number {
    return this.length * this.width;
  }
}
