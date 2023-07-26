console.log('Hello FraNzY');


//Object Literals
const circle ={
    radious : 1,
    location: {
        x :1 ,
        y :2
    },
    draw :function() {
        console.log('Draw');
    }
};
circle.draw();

//value vs refrence Types
let x = {value : 20}
let y = x

x.value = 30;
//primitives are copied by their values
//objects are copied by their refrence
console.log(x);
console.log(y);

//Factory Function
function createCircle(radious){
    return{
        radious,
        write : function(){
            console.log('Write');
        }
    }
}
const cir = createCircle(1);
console.log(cir);

//Constructor Function
function Circle(radious){
    this.radious = radious,
    this.draw = function(){
        console.log('Draw');
    }
}
const another = new Circle(3);
another.location = {x: 1}; //adding properties to circle object
console.log(another);

// To delete the "location" property
delete another.location;
console.log(another); 

//Enumerating properties
//to enumerate all the members use for in
for(let key in another){
    if(typeof circle[key] !=="function")
    console.log(key ,another[key]);
}

//to get all the keys in an object use Object.keys
const keys = Object.keys(another)
console.log(keys);

//to check for the existance of method or property use in
if("radious" in another)
    console.log('Circle has a radious',another.radious);


//Abstraction
function Rectangle(length, breadth) {
    this.length = length;
    this.breadth = breadth;

    // Private property
    let defaultLocation = { x: 1, y: 2 };

    this.draw = function() {
        console.log('Draw');
    }

    // Using Object.defineProperty to define a getter and setter
    Object.defineProperty(this, 'defaultLocation',{
        get : function(){
            return defaultLocation
        },
        set : function(value){ //we cann add validations to setter
            if(!value.x || !value.y)
                throw new Error('Invalid Location')
            defaultLocation = value
        }
    })
}
const rectangle = new Rectangle(10, 5);
// rectangle.defaultLocation = 2;
console.log(rectangle);


//Exercise StopWatch
function StopWatch(){
    let startTime , endTime , running , duration = 0;

    //start the stopwatch
    this.start = function(){
        if (running)
            throw new Error('StopWatch has already started!')
        
        running = true ;

        startTime = new Date();
    }
    // Stop the stopwatch
    this.stop = function(){
        if (!running)
            throw new Error('StopWatch is not started!')

        running = false 

        endTime = new Date();

        const seconds = (endTime.getTime() - startTime.getTime()) /1000;
        duration+= seconds
    }
    // Reset the stopwatch to its initial state
    this.reset = function(){
        startTime = null;
        endTime = null
        running = false
        duration = 0;
    }
    // Define a getter for the duration property (read-only)
    Object.defineProperty(this,'duration',{
        get :function() {return duration}
    })
}

const stopwatch = new StopWatch();

console.log(stopwatch.duration);


//Inheritance

//Proptotypes

function Sphere(rad){
    //Instance members
    this.rad = rad

    this.move = function(){
        console.log('move');
    }
}
//prototype members
Sphere.prototype.stay = function(){
    console.log('stay');
}

const c1 = new Sphere(1)

//returns instance members
console.log(Object.keys(c1));

//returns all members(instance --- own + prototype)
for(let key in c1) console.log(key);

console.log(c1.hasOwnProperty('rad'));
console.log(c1.hasOwnProperty('stay'));


//prototipical inheritance
function Shape(color){
    this.color = color;
}
Shape.prototype.duplicate = function(){
    console.log('Duplicate');
}

//Intermidate function inheritance
function extend(Child ,Parent){
    //whenever we reset the prototype of an object 
    Child.prototype = Object.create(Parent.prototype)
    //we should also reset the constructor
    Child.prototype.constructor = Child;
}

function Sphere(radiou ,color){
    //calling the super constructor
    Shape.call(this,color)

    this.radiou = radiou
}

extend(Sphere ,Shape)

Sphere.prototype.duplicate = function(){
    console.log('Duplicate Sphere');
}

function Square(size){
    this.size = size
}

extend(Square ,Shape)

const s  = new Shape();
const sp = new Sphere(1 ,'red');
const squ = new Square(10);

console.log(s);
console.log(sp);
console.log(squ);


//Polymorphism
function Shapes() {
  }
  
Shapes.prototype.duplicate = function(){
    console.log('Duplicate');
}

function Traingle(){

}

extend(Traingle, Shapes);

Traingle.prototype.duplicate = function(){
    console.log('Duplicate Triangle');
}

function Cone(){

}

extend(Cone ,Shapes)

Cone.prototype.duplicate = function(){
    console.log('Duplicate Cone');
}

const shape = [
    new Traingle(),
    new Cone()
]

for (let shapes of shape){
    shapes.duplicate()
}