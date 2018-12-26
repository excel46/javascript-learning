//--------------------//Lexical/contextual scope analysis

console.log('--------Lexical/contextual scope analysis----------');
function Counter() {
    //var self=this;  
    var count = 0;
    this.count = 10;
    return {
        count: 20,
        increment: function () { count++; },
        getCount: function () { return count; },
        // this here is the obj property
        getThisCount: function () { return this.count; }
    };
}

var a = Counter();
var b = Counter();
console.log(a === b);
a.increment();
console.log(a.getCount());
console.log(b.getCount());
console.log(a.getThisCount()); //20


//--------------------//Prototyping Example with fallback to original object//--------------------
console.log('--------Prototyping Example----------');
var one = { a: 1 };
var two = Object.create(one);
one.b = 2;
two.b = 3;
two.c = 4;
console.log(one.b);
console.log(two.b);
console.log(one.c);
console.log(two.c);

//--------------------//Decorator Pattern//--------------------
console.log('--------Decorator Pattern----------');
function DecoratorCounter(obj, initValue) {
    obj.count = initValue;
    obj.increment = function () {
        obj.count++;
    };
    obj.get = function () {
        return obj.count;
    };
    return obj;
}

var count1 = DecoratorCounter({}, 0);
var count2 = DecoratorCounter({}, 1);
count1.increment();
count2.increment();
count2.increment();
console.log(count1.get());
console.log(count2.get());


//--------------------//Functional classes//--------------------
console.log('-------Functional classes----------');
var FunctionalCounter = function (initValue) {
    var obj = { count: initValue };
    obj.increment = FunctionalCounter.methods.increment;
    obj.get = FunctionalCounter.methods.get;
    return obj;
}
FunctionalCounter.methods = {
    increment: function () { this.count++; },
    get: function () {
        return this.count;
    }
};

var count3 = FunctionalCounter(0);
var count4 = FunctionalCounter(1);
count3.increment();
count4.increment();
count4.increment();
console.log(count3.get());
console.log(count4.get());

//--------------------//Prototypical classes//--------------------

console.log('-------Prototypical classes----------');
var ProtoCounter = function (initValue) {
    var obj = Object.create(ProtoCounter.prototype);
    obj.count = initValue;
    return obj;
};

ProtoCounter.prototype.increment = function () { this.count++; };
ProtoCounter.prototype.get = function () { return this.count; };
var count1 = ProtoCounter(0);
var count2 = ProtoCounter(1);
count1.increment();
count2.increment();
count2.increment();
console.log(count1.get());
console.log(count2.get());

//--------------------//Pseudoclassical classes//--------------------

console.log('-------Pseudoclassical classes----------');
var PseudoCounter = function (initValue) {
    this.count = initValue;
};
PseudoCounter.prototype.increment = function () { this.count++; };
PseudoCounter.prototype.get = function () { return this.count; };
var count1 = new PseudoCounter(0);
var count2 = new PseudoCounter(1);
count1.increment();
count2.increment();
count2.increment();
console.log(count1.get());
console.log(count2.get());

//--------------------//Subclasses//--------------------
console.log('-------Functional Subclasses ----------');
var Count = function (initValue) {
    var obj = { count: initValue };
    obj.increment = function () {
        obj.count++;
    };
    obj.get = function () {
        return obj.count;
    }; return obj;
};
var DecrementCount = function (initValue, decrementBy) {
    var obj = Count(initValue);
    obj.decVaue = decrementBy;
    obj.decrement = function () {
        obj.count -= obj.decVaue;
    };
    return obj;
};
var decCount1 = DecrementCount(10, 2);
decCount1.increment();
decCount1.decrement();
console.log(decCount1.get());

//--------------------//Pseudoclassical subclass//--------------------

console.log('-------Pseudoclassical Subclasses ----------');
var PseudoCount = function (initValue) {
    this.count = initValue;
};
PseudoCount.prototype.increment = function () { this.count++; };
PseudoCount.prototype.get = function () { return this.count; };

var PseudoDecrementCount = function (initValue, decrementBy) {
    PseudoCount.call(this, initValue);
    this.decValue = decrementBy;
};
PseudoDecrementCount.prototype = Object.create(PseudoCount.prototype);
PseudoDecrementCount.prototype.constructor = PseudoDecrementCount;
PseudoDecrementCount.prototype.decrement = function () {
    this.count -= this.decValue;
};
var decCount1 = new PseudoDecrementCount(10, 2);
decCount1.increment();
decCount1.decrement();
console.log(decCount1.get());
