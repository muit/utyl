# Utyl api

[Utyl](https://github.com/muit/utyl) is an extension to the usual javascript usage.

## Load the Api

We must comprovate if Utyl is loaded, and if it's not charge it.

In NodeJs:

```javascript
if(typeof Utyl == "undefined"){
  //require needs the Utyl path in your project folder
  // In my case '../source/utyl/utyl.js'
  require("../source/utyl/utyl.js");
}
```
If you want to use Utyl in the client side is also possible just linking the file, like a normal javascript.
To make sure it's working, you can comprovate Utyl existence with the same code.

## Components

### Trigger
The trigger class works like a boolean but only returns true the first time.

```javascript
var trigger = new Trigger();

console.log(trigger.get());
console.log(trigger.get());
```
Result:<br>
-->true<br>
-->false

Triggers can be reseted:
```javascript
var trigger = new Trigger();

console.log(trigger.get());
console.log(trigger.get());

trigger.reset();
console.log(trigger.get());
```
Result:<br>
-->true<br>
-->false<br>
-->true

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

If the callback returns true the timer will end (but its optional):
```javascript
new Timer(function(){
    console.log("hey!");
    return true;
}, 10);
```
Result:<br>
-->Hey!

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

console.log(amount.value);

add(amount);

console.log(amount.value);
```
Result:<br>
-->0<br>
-->1

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
```
Result:<br>
-->foo<br>
-->bar

### RGB & RGBA
Rgb and Rgba are classes to use colors simply and fast. Their arguments are similar than in css:
```javascript
  var rgbColor = new RGB(red, blue, green);
  var rgbaColor = new RGBA(red, blue, green, alpha);
```
From RGB and RGBA objects you can get the hexadecimal value or the individual values:
```javascript
  var rgbColor = new RGB(25, 156, 125);
  var rgbaColor = new RGBA(25, 156, 125, 0.5);
  
  //Hexadecimal value from the color (RGB or RGBA)
  console.log(rgbaColor.hex);
  
  //Hexadecimal value from the color (RGB or RGBA)
  console.log(rgbaColor.red);
  console.log(rgbaColor.green);
  console.log(rgbaColor.blue);
  
  //Alpha value from the color(only RGBA)
  console.log(rgbaColor.alpha);
```
Result:<br>
-->199C7D<br>
-->25<br>
-->156<br>
-->125<br>
-->0.5

### String Helpers
### Array Helpers
### Hash Helpers

## Compression
Compressed with Closure Compiler

## Want more?
You want more utilities... Say me about them! 

Or make it yourself and pull request :D

