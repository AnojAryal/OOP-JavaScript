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