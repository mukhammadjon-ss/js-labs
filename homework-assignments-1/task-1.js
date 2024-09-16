class Shape {
    calculateArea() {}
}

class Circle extends Shape {
    constructor(radius) {
        this.r = radius
    }
    calculateArea() {
        return Math.PI * Math.pow(this.r, 2);
    }
}

class Rectangle extends Shape {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }

    calculateArea() {
        return this.height * this.width
    }
}