class Shape {
    calculateArea () {
        console.log("Calculates area of the shapes");
    }
}

class Circle extends Shape{
    constructor(radius){
        super();
        this.radius = radius;
    }

    calculateArea(){
        return Math.PI * Math.pow(this.radius, 2);
    }
}

class Rectangle extends Shape{
    constructor(length, width){
        super();
        this.length = length;
        this.width = width;
    }

    calculateArea(){
        return this.length * this.width;
    }
}


const circle = new Circle(5);
console.log(`Circle Area: ${circle.calculateArea()}`); // Should output approximately 78.54

const rectangle = new Rectangle(4, 7);
console.log(`Rectangle Area: ${rectangle.calculateArea()}`); // Should output 28
