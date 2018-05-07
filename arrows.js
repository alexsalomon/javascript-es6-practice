
"use strict";

let es3Result, es5Result, es6Result, getResult;

/****************************************************
 * Arrow Function Syntax - No arguments
 ****************************************************/

// ES5:
getResult = function() {
    return 5 * 100;
};
es5Result = getResult();

// ES6 - Arrows:
getResult = () => 5 * 100;
es6Result = getResult();

console.log('1. Passed: ' + (es5Result === es6Result));

/****************************************************
 * Arrow Function Syntax - One argument
 ****************************************************/

// ES5:
getResult = function(number) {
    return number * 10;
};
es5Result = getResult(5);

// ES6 - Arrows:
getResult = number => number * 10;
es6Result = getResult(5);

console.log('2. Passed: ' + (es5Result === es6Result));

/********************************************************************************
 * Arrow Function Syntax - One argument - Function expression as an argument
 ********************************************************************************/

let randomArray = [2, 5, 8, 7, 10];

// ES5:
getResult = randomArray.map(function(number) {
    return !(number % 2);
});
es5Result = getResult;

// ES6 - Arrows:
getResult = randomArray.map( number => !(number % 2) );
es6Result = getResult;

console.log('3. Passed: ' + (es5Result.length === es6Result.length && es5Result.every((value, index) => value === es6Result[index])));

/****************************************************
 * Arrow Function Syntax - Multiple arguments
 ****************************************************/

// ES5:
getResult = function(x, y) {
    return x * y;
};
es5Result = getResult(5, 5);

// ES6 - Arrows:
getResult = (x, y) => x * y;
es6Result = getResult(5, 5);

console.log('4. Passed: ' + (es5Result === es6Result));

/****************************************************
 * Arrow Function Syntax - Returning Objects
 *
 * P.S.: When returning objects using object literal
 * syntax and arrow functions, we need to wrap the
 * object literal with parenthesis otherwise the
 * parser assumes that the object's curly brackets are
 * in fact the beginning of the arrow function block.
 * If that becomes the case, no errors are thrown,
 * instead, the function will return undefined.
 ****************************************************/

// ES5:
getResult = function() {
    return {
        key: "value"
    };
};
es5Result = getResult().key;

// ES6 - Arrows:

//getResult = () => { key: "value" }; // WRONG, return undefined
// Wrapping the object literal with parenthesis will return the object:
getResult = () => ({ key: "value" });
es6Result = getResult().key;

console.log('5. Passed: ' + (es5Result === es6Result));

/****************************************************
 * Arrow Function Syntax - IIFEs and IIAFs
 *
 * P.S.: The Javascript parser doesn't care whether
 * the parenthesis used to call the function are
 * placed inside or outside the IIFE's parenthesis.
 * Same is NOT true for IIAFs, they must be placed
 * outside.
 ****************************************************/

let es51, es52;

// **** ES5 ****
(function() {
    es51 = true;
}()); //<=== Parenthesis INSIDE

(function() {
    es52 = true;
})(); // <=== Parenthesis OUTSIDE

es5Result = (es51 === es52);

// **** ES6 - Arrows ****
// (() => {
//     es6Result = true;
// }());  // WRONG: throws error "Unexpected token '('"

(() => {
    es6Result = true;
})();

console.log('6. Passed: ' + (es5Result && es6Result));

/****************************************************
 * Arrow Function Syntax - Lexical 'this'
 *
 * P.S.: Arrow functions automatically bind the 'this'
 * and 'arguments' keywords from the enclosing scope to
 * itself.
 ****************************************************/

let basicObject;

// ES3:
// P.S.: store a reference to 'this' in a variable that will be
// be available for use within the anonymous function callback
basicObject = {
    key: "value",
    method: function() {
        var self = this;
        return function() {
            return self.key;
        }
    },
};
es3Result = basicObject.method()();

// ES5:
// P.S.: 'bind' returns a new “cloned” function such that 'this'
// within the function matches 'this' outside of it by passing it
// as the argument.
basicObject = {
    key: "value",
    method: function() {
        return (function() {
            return this.key;
        }).bind(this);
    },
};
es5Result = basicObject.method()();

// ES6 - Arrows:
// P.S.: arrow functions use lexical scoping; its value is always
// inherited from the enclosing scope.
basicObject = {
    key: "value",
    method: function() { //if we use arrow function syntax here, 'window' will be automatically bound to 'this'.
        return () => {
            // this = this; //WRONG: cannot change the value of 'this' inside an arrow function.
            return this.key;
        }
    },
};
es6Result = basicObject.method()();

console.log('7. Passed: ' + (es3Result === es5Result && es5Result === es6Result))

/****************************************************
 * Arrow Function Syntax - typeof
 ****************************************************/

es5Result = typeof(function() { }); // 'function'
es6Result = typeof(() => { });      // 'function'
console.log('8. Passed: ' + (es5Result === es6Result));

/****************************************************
 * Arrow Function Syntax - instanceof
 ****************************************************/

es5Result = (function() { } instanceof Function);
es6Result = ( (() => {}) instanceof Function);
console.log('9. Passed: ' + (es5Result === es6Result));

/****************************************************
 * Arrow Function Syntax - Lexical 'arguments'
 *
 * P.S.: Arrow functions automatically inherit the 'this'
 * and 'arguments' keywords from the enclosing scope.
 ****************************************************/

console.log("\n10. Testing 'arguments':");

function returnArgumentsES5() {
    return function() {
        // returns the arguments of the function
        // expression: which is always 0 in length
        return arguments;
    }
}
es5Result = returnArgumentsES5(5, 'foo', true)();
console.log('ES5 [object Arguments].length: ' + es5Result.length);

function returnArgumentsES6() {
    // returns an arrow function expression
    // which itself returns the arguments used
    // in the returnArgumentsES6 function
    return () => arguments;
}
es6Result = returnArgumentsES6(5, 'foo', true)();
console.log('ES6 [object Arguments].length: ' + es6Result.length);

/****************************************************
 ****************************************************/
console.log('\nDONE.');