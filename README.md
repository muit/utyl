# Utyl api

[Utyl](https://github.com/muit/utyl) is an extension to the usual javascript usage.

## Components

### Trigger
The trigger class works like a boolean but only returns true the first time.

```javascript
var trigger = new Trigger();

console.log(trigger.get());
console.log(trigger.get());

Result:
-->true
-->false
```

Triggers can be reseted:
```javascript
var trigger = new Trigger();

console.log(trigger.get());
console.log(trigger.get());

trigger.reset();
console.log(trigger.get());

Result:
-->true
-->false
-->true
```

### EventMap
So big...I wont write it yet...
### Timer
Timers will call asynchrony a function every X ms, and (optional) X times.
It's much more precise than setInterval.
```javascript
//Works with FPS(Frames per second)
var FPS = 10;

new Timer(function(){
  console.log("again...");
}, FPS);

// With x Times should be:

var FPS = 10;
var count = 1000;

new Timer(function(){
  console.log("again...");
}, FPS, count);
```
### Vector2 & Vector3
Vectors contains coordinates. Vector2 for 2D (x,y) and Vector3 for 3D (x,y,z).

Any type of variable can be saved in a vector.

### Reference Variable
To use any variable as a reference Utyl contains the Reference Class.
```javascript
var amount = _(0);
function add(amount){
    amount.value++;
}

add(amount);

console.log(amount.value);

Result:
-->0
```

### Inherits
Inherits simplifies the POO inheritance inheritance in javascript.

```javascript
  var Foo = function(){}
  Foo.prototype.name = "foo";
  
  var Bar = function(){}
  Bar.inherits(Foo); //Parent class is now Foo
  Bar.prototype.subname = "bar";
  
  console.log(Bar.name);
  console.log(Bar.subname);
  
  Result:
  -->foo
  -->bar
```
### String Helpers
### Array Helpers
### Hash Helpers

## Compression
Compressed with jscompress.com

## Want more?
You want more utilities... Say me about them! 

Or make it yourself and pull request :D

