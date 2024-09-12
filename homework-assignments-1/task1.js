class Shape {
    calculateArea() {}
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }

    calculateArea() {
        return Math.PI * Math.pow(this.radius, 2);
    }
}

class Rectangle extends Shape {
    constructor(length, width) {
        super();
        this.length = length;
        this.width = width;
    }

    calculateArea() {
        return this.length * this.width;
    }
}

const circle = new Circle(5);
const rect = new Rectangle(12, 5);

console.log(circle.calculateArea()); // 78.53981633974483
console.log(rect.calculateArea()); // 60
