abstract class Shape {
  constructor() {
    if(this.constructor === Shape) {
      throw new Error("This is an abstract class!")
    }
  }

  abstract calculateArea():number;
}

class Circle extends Shape {
  radius:number;
  constructor(radius:number) {
    super()
    this.radius = radius;
  }

  calculateArea():number {
    return Math.PI * (this.radius ** 2);
  }
}

class Rectangle extends Shape {
  length:number;
  width:number;
  constructor(length:number, width:number) {
    super()
    this.length = length;
    this.width = width;
  }

  calculateArea():number {
    return this.length * this.width;
  }
}

const circle = new Circle(5)
const rectangle = new Rectangle(2, 3)

console.log(circle.calculateArea());
console.log(rectangle.calculateArea());