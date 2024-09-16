abstract class Shape {
  abstract calculateArea(): number;
}

class Circle extends Shape {
  radius: number;

  constructor(radius: number) {
    super();
    if (radius < 0) throw new Error("Radius of a circle cannot be negative");
    this.radius = radius;
  }

  calculateArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  length: number;
  width: number;

  constructor(length: number, width: number) {
    super();
    if (length < 0 || width < 0)
      throw new Error("Height or width of a rectangle cannot be negative");
    this.length = length;
    this.width = width;
  }

  calculateArea(): number {
    return this.length * this.width;
  }
}

const circle_1 = new Circle(15);
const circle_2 = new Circle(2);
console.log(circle_1.calculateArea().toFixed(2));
console.log(circle_2.calculateArea().toFixed(2));

const rect_1 = new Rectangle(4, 7);
const rect_2 = new Rectangle(9, 23);
console.log(rect_1.calculateArea());
console.log(rect_2.calculateArea());
