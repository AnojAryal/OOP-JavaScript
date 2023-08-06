'use strict'


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

//compositions
//Mixins
function mixin(target , ...sources){
    Object.assign(target , ...sources)
}

const canEat = {
    eat : function(){
        this.hunger--;
        console.log('Eating');
    }
}

const canWalk = {
    walk : function(){
        console.log('Walking');
    }
}

const canSwim = {
    swim : function(){
        console.log('Swimming');
    }
}

function Person(){

}
mixin(Person.prototype,canEat ,canWalk);

const person = new Person();
console.log(person);


function Fish(){

}
mixin(Fish.prototype,canEat ,canSwim);

const fish = new Fish();
console.log(fish);

//Exercise prototypical inheritance
function HtmlElement() {
    this.click = function(){
        console.log('Clicked');
    }
}

HtmlElement.prototype.focus = function(){
    console.log('Focused');
}

function HtmlSelectElement(items = []){
    this.items= items;

    this.addItem = function(item){
        this.items.push(item);
    }

    this.removeItem = function(item){
        this.items.splice(this.items.indexOf(item),1)
    }

    this.render = function(){
        return `
        <select>${this.items.map(item =>`
          <option>${item}</option>`).join('')}
        </select>`;
    }
}


HtmlSelectElement.prototype = new HtmlElement();
HtmlSelectElement.prototype.constructor = HtmlSelectElement;

const h = new HtmlSelectElement();
h.click();
h.focus();

//Exercise Polymorphism
function HtmlImageElement(src){
    this.src = src

    this.render = function(){
        return `<img src="${this.src}" />`
    }
}

HtmlImageElement.prototype = new HtmlElement();
HtmlImageElement.prototype.constructor = HtmlImageElement;

const j = new HtmlSelectElement([1,2,3]);
j.render();

const img = new HtmlImageElement();
console.log(img);

img.src = 'http://'
img.render();

//ES6 classes
class Circle1 {
    constructor(radious1){
        this.radious1 = radious1
        this.move1 = function() {

        }
    }
    draw1(){
        console.log('Draw1');g
    }
}
const ci = new Circle1(2)
console.log(ci);

//Hoisting

function sayHello() {}  //function declaration  ----> hoisted

const sayBye = function() {};  //function expression

class Hi {}  //class decleration  ----->not hoisted

const bye = class {};  //class expression


//static methods
class Anoj {
    constructor(age) {
        this.age = age
    }
    //instance method
    Gender(){
        console.log('Male');
    }

    //static method
    static parse(str){
        const age = JSON.parse(str).age;
        return new Anoj(age);
    }
}

const anoj =  Anoj.parse('{"age":20}');
console.log(anoj);


//the This keyword
const Girl = function(){
    this.suji = function(){
        console.log(this);
    }
}

const g = new Girl();
//method call
g.suji();

const suji = g.suji;
//function call
suji()

//private members using symbols
const _one = Symbol();
const _write =Symbol();

class Numb {
    constructor (one) {
        this[_one] = one ;
    }

    [_write](){
        console.log("write");
    }
}

const n = new Numb(1);
const key = Object.getOwnPropertySymbols(n)[0];
console.log(n[key]);
console.log(n);

//private members using weakmaps
const _two =  new WeakMap();
const _read = new WeakMap();

class Numbe {
    constructor (two) {
        _two.set(this, two)

        _read.set(this ,() =>{
            console.log('read' ,this);
        })
    }

    read (){
        _read.get(this)();

        console.log("read");
    }
}

const nu = new Numbe(2);
nu.read();

//getters and setters in es6
const _getting = new WeakMap();

class Take {
    constructor(getting) {
        _getting.set(this, getting); // Use set() to store the value in WeakMap
    }

    get getting() {
        return _getting.get(this);
    }

    set getting(value) {
        if (value <= 0) throw new Error('Invalid syntax');
        _getting.set(this, value); // Use set() to update the value in WeakMap
    }
}

const t = new Take(5); 
console.log(t.getting); 

t.getting = 10;
console.log(t.getting);

//inheritance in es6
class Dog {
    constructor( breed) {
        this.breed = breed
    }

    move2() {
        console.log('move2');
    }
}

class Shepad extends Dog{
    constructor(breed,name){
        super (breed)
        this.name = name
    }

    draw2() {
        console.log('draw2');
    }
}

const sh = new Shepad('Germanshepad','Hachi')
console.log(sh);

//method riding
class Movement {
    move3() {
        console.log("move 3");
    }
}

class Moved extends Movement {
    move3() {
        super.move3()
        console.log("successfuly moved");
    }
}

const mo = new Moved()
mo.move3();

//Exercise : stack building
const _itemStack = new WeakMap();

class Stack {
    constructor(){
        _itemStack.set(this,[]);
    }

    push(obj){
        _itemStack.get(this).push(obj);
    }

    pop(){
        const Stackitems = _itemStack.get(this)

        if (Stackitems.length === 0)
            throw new Error('Stack is empty')

        return Stackitems.pop()
    }

    peek(){
        const Stackitems = _itemStack.get(this)

        if (Stackitems.length === 0)
            throw new Error('Stack is empty')

        return Stackitems[Stackitems.length-1];
    }

    count(){
        return _itemStack.get(this).length;
    }
}
const stack = new Stack();
stack.push('a');
stack.push('b');
stack.push('c');

console.log(stack.peek()); 
console.log(stack.pop()); 
console.log(stack.count()); 