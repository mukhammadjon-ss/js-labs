class Shape {
  constructor() {
    if(this.constructor === Shape) {
      throw new Error("This is an abstract class!")
    }

    if(this.calculateArea === undefined) {
        throw new Error("calculateArea method must be implemented");
    };
  }
}

class Circle extends Shape {
  constructor(radius) {
    super()
    this.radius = radius;
  }

  calculateArea() {
    return Math.PI * (this.radius ** 2);
  }
}

class Rectangle extends Shape {
  constructor(length, width) {
    super()
    this.length = length;
    this.width = width;
  }

  calculateArea() {
    return this.length * this.width;
  }
}

const circle = new Circle(5)
const rectangle = new Rectangle(2, 3)

console.log(circle.calculateArea());
console.log(rectangle.calculateArea());