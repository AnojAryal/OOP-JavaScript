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
console.log(another);