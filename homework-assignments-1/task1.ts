abstract class Shape {
  abstract calculateArea(): number;
}

class Circle extends Shape {
  radius: number;

  constructor(radius: number) {
    super();
    this.radius = radius;
  }

  calculateArea(): number {
    return Math.PI * this.radius * this.radius;
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
  calculateArea(): number {
    return this.length * this.width;
  }
}

const circle = new Circle(5);
console.log(`Arrea of Circle is: ${circle.calculateArea()}`);

const rectangle = new Rectangle(10, 5);
console.log(`Area of Rectangle is: ${rectangle.calculateArea()}`);
