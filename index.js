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