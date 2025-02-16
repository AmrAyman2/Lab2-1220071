/*IMPORTANT NOTES
1- you are using JS Name Casing (CamelCasing)
2- make this code as clean as possible 
3- apply all the concepts you learned during this lab (Naming, comments,  functions)
*/

class point {
  constructor(coordX, coordY) {
    this.coordX = coordX;
    this.coordY = coordY;
  }
}

class Rectangle {
  constructor(startingPoint, width, height) {
    if (!height || height <= 0 || !width || width <= 0) {
      throw Error("invalid Width and Height"); // throws an error in case of width or height are not set or less than 0
    }
    this.startingPoint = startingPoint;
    this.width = width;
    this.height = height;
  }

  // ***************
  // METHODS
  // ***************

  getArea() {
    return this.width * this.height;
  }

  getPerimeter() {
    return 2 * this.width + 2 * this.height;
  }

  updateHeight(height) {
    if (height && height > 0) {
      this.height = height;
    }
  }

  updateRectangle({ startingPoint, width, height }) {
    if (!height || height <= 0 || !width || width <= 0) {
      throw Error("invalid Width and Height"); // throws an error in case of width or height are not set or less than 0
    }
    this.startingPoint = startingPoint;
    this.width = width;
    this.height = height;
  }

  getHeight() {
    return this.height;
  }

  //function that print the endpoints of the polygon (x-axis & y-axis)
  printEndPoints() {
    const topRight = this.startingPoint.coordX + this.width;
    const bottomLeft = this.startingPoint.coordY + this.height;
    console.log("End Point X-Axis (Top Right): " + topRight);
    console.log("End Point Y-Axis (Bottom Left): " + bottomLeft);
  }

  getWidth() {
    return this.width;
  }
}

//dynamically creates a new rectangle and returns it
function buildRectangle(Width, x, Height, y) {
  const mainPoint = new point(x, y);
  const rect = new Rectangle(mainPoint, Width, Height);
  return rect;
}


function constructSquare(cord_x, CordY, SideLength) {
  let square;
  if (!SideLength || SideLength <= 0) { //makes sure the side length is set and with a positive value
    throw Error("invalid Square Side Length");
  }
  square = buildRectangle(SideLength, cord_x, SideLength, CordY);
  return square;
}

//creating rectangle and square then printing the perimiter
const myRectangle = buildRectangle(2, 3, 5, 4);
const mySquare = constructSquare(2, 3, 4);

console.log(mySquare.getPerimeter());
mySquare.printEndPoints();

myRectangle.updateHeight(3);
