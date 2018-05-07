
"use strict";

/****************************************************
 * Block-level scoping with `let` and `const`
 ****************************************************/

/****************************************************
 * When the Javascript parser starts looking at the
 * code, it first creates the execution context of
 * each function. Each execution context keeps a
 * reference to all declared functions and variables
 * within the current scope (known as Hoisting), the
 * `this` and `arguments` keyword, as well as a
 * reference to its parent scope. Then, the parser
 * reads the code and executes it line by line.
 ****************************************************/
console.log("----------------------");

(() => {
    // even though laterVar is defined later on in the function
    // it is initialized to undefined during hoisting.
    // In most C-style languages this would be an error.
    console.log("1. 'laterVar' before declaration: ", laterVar); // Output: undefined
    var laterVar = 10;
})();

console.log("----------------------");
 /****************************************************
 * Prior to ES6, there was only one way to declare
 * variables: through the use of the `var` keyword.
 * Variables declared using `var` are accessible
 * within the scope of the function where they were
 * declared and disregard code blocks (due to hoisting).
 ****************************************************/
 console.log("----------------------");

 (() => {
     var myVar = "";

     //Code block:
     if(true) {
         // accidental redefinition of `myVar` results
         // in outer defined `myVar` being reassigned
         // to 'foo'
         var myVar = "foo"
         console.log('2. ' + myVar); // Output: foo
     }

    console.log('2. ' + myVar); // Output: foo
 })();

console.log("----------------------");
/****************************************************
 * Variables declared in a parent scope can be
 * accessed inside a child scope, but not the other
 * way around.
 *
 * This is because when looking for a variable
 * declaration, if it is not found inside the current
 * execution context, javascript looks it up on the
 * parent scope and keeps on going up the scope chain
 * until it finds it. Variable and function
 * declarations of a parent function can be found and
 * are still accessible regardless whether its
 * execution context is still in memory or not.
 * This Javascript feature is called Closure.
 ****************************************************/
console.log("----------------------");

(() => {
    var greeting = "Greetings!";

    (() => {
        console.log('3. ' + greeting); // Output: Greetings!
        var farewell = "Farewell!"
    })();

    // console.log(farewell);  // ReferenceError: farewell is not defined
})();

console.log("----------------------");
/****************************************************
 * The new ES6 keywords `let` and `const` declare
 * variables that can only be used within their block
 * of code (Block-level scoping as opposed to function-
 * level scoping). Using 'let` to declare a variable
 * inside of a block scope with the same name of a
 * variable outside of the block scope doesn't
 * overwrite its value, like with `var`.
 ****************************************************/
console.log("----------------------");

(() => {
    let greeting = "hello";

    //Code block:
    if(true) {
        let greeting = "Greetings!"
        console.log('4. ' + greeting); // Output: Greetings!
    }

    console.log('4. ' + greeting); // Output: hello
})();

console.log("----------------------");
/****************************************************
 * 'let` throws a ReferenceError error if we try to
 * access it outside of its block scope.
 ****************************************************/
console.log("----------------------");

(() => {
    if(true) {
        let greeting = "Greetings!";
    }

    try {
        // Accessing greeting is a ReferenceError because it
        // was defined within the if-block.
        console.log(letValue);

        // if we get here, it means that the JS engine didn't
        // throw an exception, which means that the engine
        // did not faithfully reproduce how `let` should work.
        console.log('5. let not faithfully handled.');
    } catch (e) {
        console.log('5. Working as expected');
    }
})();

console.log("----------------------");
/****************************************************
 * `const` works similarly to `let` except that you
 * must initialize the variable immediately with a
 * value and that value cannot be changed afterwards.
 * You will get a SyntaxError if you either fail to
 * initialize the variable at declaration or if you
 * try to reassign its value.
 ****************************************************/

// All const declarations must be initialized.
// It's a SyntaxError otherwise:

//       const VALUE_KEY;

/****************************************************/

const NAME_KEY = 'name';

// Const variables are read-only, so trying to
// reassign is a SyntaxError too

//       NAME_KEY = 'key';

/****************************************************/

/****************************************************
 * Even though the object is `const`, you can still
 * change properties of it. It's the variable
 * that cannot be reassigned.
 ****************************************************/
console.log("----------------------");

(() => {
    const OBJ_CONST = { key1: 'val1', key2: 'val2' };
    const value = 'another value';
    OBJ_CONST.key1 = value;
    console.log('6. ' + (value === OBJ_CONST.key1));
})();

console.log("----------------------");
/****************************************************
 * By freezing the object, using ES5 Object.freeze
 * its properties cannot be changed.
 * in strict mode this a TypeError. In non-strict
 * mode the value silently doesn't change.
 ****************************************************/
console.log("----------------------");

(() => {
    const FROZEN_OBJ_CONST = Object.freeze({ key1: 'val1', key2: 'val2' });

    try {
        FROZEN_OBJ_CONST.key1 = 'another value';
    } catch(e) {
        console.log('7. TypeError on Strict mode');
        console.log('7. frozen object', FROZEN_OBJ_CONST);
    }


})();

console.log("----------------------");
/****************************************************
 * The lack of block-level scoping with `var` can
 * cause a few problems if the developer doesn't
 * understand how hoisting and closures work. A
 * classic example is using callbacks and for-loops:
 ****************************************************/
console.log("----------------------");

(() => {
    for (var i = 0; i < 5; i++) {
        // `var i` belongs to the IIAF's execution context.
        // When setTimeout executes the function, the value
        // of `i` is always 5 since it is the same variable
        // that updates for each loop iteration.
        setTimeout(
            () => console.log('8. i = ' + i),
            100
        )
    }

    // i is accessible outside of the for loop
    // and has the value 5
    console.log('8. after i = ' + i);

})();

console.log("----------------------");
/****************************************************
 * The ES3/ES5 way of fixing this issue is to take
 * advantage of function-level scope and use closures
 * to 'bind' the value of i to a new variable inside
 * the extra function.
 ****************************************************/
console.log("----------------------");

(() => {
    for (var i = 0; i < 5; i++) {
        setTimeout(
            (function(index) {
                return function() {
                    console.log('9. index = ' + index);
                }
            })(i),
            100
        )
    }

    // i is still accessible outside of the for loop
    // and has the value 5
    console.log('9. after i =' + i);

})();

console.log("----------------------");
/****************************************************
 * With ES6, all is needed is to use `let` instead of
 * `var` since `let` declares a new variable for each
 * loop iteration.
 ****************************************************/
console.log("----------------------");

(() => {
    for (let i = 0; i < 5; i++) {
        setTimeout(
            () => console.log('10. i = ' + i),
            100
        )
    }

    // console.log('10. after i =' + i); // ReferenceError: i is not defined
})();

console.log("----------------------");
/****************************************************
 ****************************************************/

console.log("\nDONE.");
