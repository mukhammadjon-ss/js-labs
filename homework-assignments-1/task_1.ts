abstract class Shape {
    abstract calculateArea();
}
class Circle extends Shape {
    radius: number;
    constructor(radius: number) {
        super();
        this.radius = radius
    }
    calculateArea():number {
        return Math.PI*this.radius*this.radius;
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
    calculateArea():number {
        return this.length*this.width;
    }
}

const firstCircle = new Circle(1);
console.log(firstCircle.calculateArea());