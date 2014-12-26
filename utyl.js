/*****************************************************************************
 ****                      Utils Api for JavaScript                       ****
 *****************************************************************************
 ****                                                                     ****
 ****          @author Miguel Fernandez - muitxer - github.com/muit       ****
 ****************************************************************************/

Utyl = {
    author: "muitxer",
    repo: "http://github.com/muit/utyl",
    version: "0.3.6-b"
};

//*******************************
// String helpers
//*******************************
String.prototype.startsWith = function(str)
{
    return this.slice(0, str.length) == str;
};

String.prototype.endsWith = function(suffix)
{
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

String.prototype.contains = function(str)
{
    return this.indexOf(str) != -1;
};

String.random = function(inv){
  inv = inv || 8;
  return Math.random().toString(36).substring(inv);
};

//*******************************
// Hash helpers
//*******************************
Object.keys = function(object)
{
    var ret=[],p;
    for(p in object) if(Object.prototype.hasOwnProperty.call(object,p)) ret.push(p);
    return ret;
};

Object.key = function(object, o)
{
    var ret=[],p;
    for(p in object) if(object[p] == o) ret.push(p);
    return ret;
};

//*******************************
// Array Helpers
//*******************************
Array.prototype.first = function(){ return this[0]; };
Array.prototype.last = function(){ return this[this.length-1];};
Array.prototype.remove = function(o)
{
    var i = this.indexOf(o);
    return (i >= 0)? this.splice(i, 1)[0] : undefined;
};

Array.prototype.removeByIndex = function(i)
{
    return (i >= 0)? this.splice(i, 1)[0] : undefined;
};

Array.prototype.each = function(callback)
{
  if(typeof callback != "function")
    throw new Error("The callback provided is not a function.");
  for (var i = 0, len = this.length; i < len; i++) {
    callback(this[i]);
  }
};

Array.prototype.getNextFlip = function()
{
  this.push(this.shift());
  return this[0];
};

Array.prototype.getLastFlip = function()
{
  this.unshift(this.pop());
  return this[0];
};

//*******************************
// Player Array Helpers
//*******************************
Array.prototype.getByName = function(n)
{
    return this.filter(function(p){ return p.name == n; }).first();
};

/*******************************
 * Trigger Class
 * @constructor
 *******************************/
Trigger = function(){};
Trigger.prototype.get = function(){ return (!this.s)?this.s = true:false;};
Trigger.prototype.reset = function(){ this.s = undefined;};

/*******************************
 * Vector2 Class
 * @constructor
 *******************************/
Vector2 = function(x, y)
{
    if(x instanceof Vector2)
    {
        this.x = x.x;
        this.y = x.y;
    }
    else{
        this.x = x;
        this.y = y;
    }
};
Vector2.prototype.x = null;
Vector2.prototype.y = null;
Vector2.prototype.distance = function(v2){ return Vector2.distance(this, v2); };

Vector2.distance = function(v1, v2){
    return Math.sqrt(Math.pow(v2.x - v1.x, 2) + Math.pow(v2.y - v1.y, 2));
};
Vector2.dot = function(v1, v2){ return v1.x * v2.x + v1.y * v2.y; };

/*******************************
 * Vector3 Class
 * @constructor
 *******************************/
Vector3 = function(x, y, z)
{
    if(x instanceof Vector3)
    {
        this.x = x.x;
        this.y = x.y;
        this.z = x.z;
    }
    else{
        this.x = x;
        this.y = y;
        this.z = z;
    }
};
Vector3.prototype.x = null;
Vector3.prototype.y = null;
Vector3.prototype.z = null;
Vector3.prototype.distance = function(v2){ return Vector3.distance(this, v2); };

Vector3.distance = function(v1, v2)
{
    return Math.sqrt(Math.pow(v2.x - v1.x, 2) + Math.pow(v2.y - v1.y, 2) + Math.pow(v2.z - v1.z, 2));
};
Vector3.dot = function(v1, v2){ return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z; };


/*******************************
 * EventMap Class
 * @constructor
 *******************************/
EventMap = function(){};
EventMap.prototype.events = [];
EventMap.prototype.callbacks = [];

EventMap.prototype.createEvent = function(callback, delay)
{
    var self = this;
    var guid = setTimeout(function()
    {
        self.removeEvent(guid);
        callback();
    }, delay);

    this.events.push(guid);
    this.callbacks.push(callback);
    return this.events.length-1;
};

EventMap.prototype.restartEvent = function(event, delay)
{
    var index = this.events.indexOf(event);
    if (index >= 0)
    {
        clearTimeout(this.events[index]);
        var self = this;

        this.events[index] = setTimeout(function()
        {
            self.removeEvent(guid);
            self.callbacks[index]();
        }, delay);
    }
};

EventMap.prototype.removeEvent = function(event)
{
    var index = this.events.indexOf(event);
    if (index >= 0) clearTimeout(this.events[index]);
    this.events.removeByIndex(index);
    this.callbacks.removeByIndex(index);
};

EventMap.prototype.removeAllEvents = function()
{
    this.events.forEach(function(guid, index, array)
    {
        clearTimeout(guid);
    });
    this.events = [];
    this.callbacks = [];
};

//*******************************
// Reference Class
//*******************************
_ = function(variable)
{
    if(variable instanceof Reference)
        return variable.value;
    var r = new Reference(variable);
    return r;
};
/** @constructor **/
Reference = function(variable)
{
    this._ = this.value = variable;
};


//*******************************
// Is not defined method
//
// Comprovates if a class(or a subclass) is undefined and defines it.
//*******************************
ifNotDefined = function(classPath)
{
    if(!classPath || classPath.length<=0) return undefined;

    classPath = classPath.split(".");

    var parent = this;
    for(var i=0, len=classPath.length; i<len; i++)
    {
        if(parent[classPath[i]] == undefined)
            parent[classPath[i]] = function(){};
        parent = parent[classPath[i]];
    }
    return parent;
};


//*******************************
// Inherits method
//*******************************
Function.prototype.inherits = function(superClass)
{
    if(typeof superClass == "function")
        this.prototype = new superClass();
    else
        this.prototype = superClass;
    this.prototype.constructor = this;
};

/*******************************
 * RGB Class
 * @constructor
 *******************************/
var RGB = function(r,g,b)
{
    this.set(r,g,b);
};
RGB.prototype.set = function(r,g,b)
{
    if( (r >= 0 && r < 256) && (g >= 0 && g < 256) && (b >= 0 && b < 256))
    {
        this.red = r;
        this.green = g;
        this.blue = b;
        this.hex = (r*256*256+g*256+b).toString(16).toUpperCase();
    }
};
/*******************************
 * RGBA Class
 * @constructor
 * @extends RGB
 *******************************/
var RGBA = function(r, g, b, a)
{
    this.set(r,g,b);
    this.alpha = a;
};
RGBA.inherits(RGB);


/********************************
 * Math randomRange
 *******************************/
Math.randomRange = function(min, max)
{
    return Math.floor(Math.random() * (max - min)) + min;
};

/*******************************
 * SeedRandom by DavidBau(github.com/davidbau)
 ******************************/
(function(n,p,l,f,w,B,q,r,t){function C(a){var b,e=a.length,c=this,d=0,h=c.b=c.c=0,g=c.a=[];for(e||(a=[e++]);d<f;)g[d]=d++;for(d=0;d<f;d++)g[d]=g[h=k&h+a[d%e]+(b=g[d])],g[h]=b;(c.d=function(a){for(var b,d=0,h=c.b,g=c.c,e=c.a;a--;)b=e[h=k&h+1],d=d*f+e[k&(e[h]=e[g=k&g+b])+(e[g]=b)];c.b=h;c.c=g;return d})(f)}function x(a,b){b.b=a.b;b.c=a.c;b.a=a.a.slice();return b}function y(a,b){var e=[],c=typeof a,d;if(b&&"object"==c)for(d in a)try{e.push(y(a[d],b-1))}catch(h){}return e.length?e:"string"==c?a:a+"\x00"}
function u(a,b){for(var e=a+"",c,d=0;d<e.length;)b[k&d]=k&(c^=19*b[k&d])+e.charCodeAt(d++);return m(b)}function D(){var a;try{if(v)return m(v.i(f));n.crypto.getRandomValues(a=new Uint8Array(f));return m(a)}catch(b){return[+new Date,n,(a=n.navigator)&&a.plugins,n.screen,m(p)]}}function m(a){return String.fromCharCode.apply(0,a)}var E=l.pow(f,w),z=l.pow(2,B),F=2*z,k=f-1,v,A=l["seed"+t]=function(a,b,e){var c=[];b=1==b?{e:!0}:b||{};a=u(y(b.e?[a,m(p)]:null==a?D():a,3),c);var d=new C(c);u(m(d.a),p);return(b.h||
e||function(a,b,e,c){c&&(c.a&&x(c,d),a.state=function(){return x(d,{})});return e?(l[t]=a,b):a})(function(){for(var a=d.d(w),b=E,c=0;a<z;)a=(a+c)*f,b*=f,c=d.d(1);for(;a>=F;)a/=2,b/=2,c>>>=1;return(a+c)/b},a,"global"in b?b.global:this==l,b.state)};u(l[t](),p);if(q&&q.f){q.f=A;try{v=require("crypto")}catch(G){}}else r&&r.g&&r(function(){return A})})(this,[],Math,256,6,52,"object"==typeof module&&module,"function"==typeof define&&define,"random");


/*******************************
 * Timer Class
 * @constructor
 *******************************/
Timer = function(oninstance, fps, times)
{
    var self = this;
    self.times = times;
    var speed = 1000/fps,
        count = 0,
        start = 0,
        now = 0;

    function instance()
    {
        if(self.times && count++ >= self.times)
            return;
        now = new Date().getTime();
        var diff = (now - last) - speed;
        if(diff < 0) diff = 0;
        last = now;
        if(!oninstance(diff/speed+1))
            setTimeout(instance, (speed-diff));
    };
    setTimeout(function()
    {
        last = new Date().getTime();
        instance();
    }, 0);
};
Timer.prototype.close = function(){this.times = true};


/*******************************
 * document.host
 * Works only on Client
 * Contains the webpage host
 * @const *
*******************************/
if(typeof document != "undefined") document.host = document.URL.split("/")[2].split(":")[0];
