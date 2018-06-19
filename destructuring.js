
"use strict";

/****************************************************
 * Destructuring
 ****************************************************/

/****************************************************
 * Destructuring makes it easier to work with objects
 * and arrays in JavaScript. Using a pattern syntax
 * similar to object and array literals, we can poke
 * into data structures and pick out the information
 * we want into variables.
 ****************************************************/

// Object destructuring:
(() => {
    let person = {
        firstname: 'John',
        lastname: 'Doe',
        genre: 'M',
        age: 34,
        interests: ['swim', 'run'],
        identification: {
            number: 7253732984
        }
    };

    // Match variable name with property name to get the value
    let {firstname} = person;
    console.log('1. First Name: ' + firstname); // Output: John

    let {lastname} = person;
    console.log('2. Last Name: ' + lastname); // Output: Doe

    let {genre, interests} = person;
    console.log('3. Genre: ' + genre + ' | Interests: ' + interests);
    // Output: Genre: M | Interests: swim,run | Age: 34

    // invalid property name returns 'undefined'
    let {invalid} = person;
    console.log('4. Invalid: ' + invalid); // Output: undefined

    // Using aliases to change the variable names:
    let { firstname: firsty,  lastname: lasty, invalid: trysomething } = person;
    console.log('5. firsty: ' + firsty + ' | lasty: ' + lasty + ' | trysomething: ' + trysomething);

    // We can also use a mix of both syntaxes:
    let { age,  identification: id } = person;
    console.log('6. Age: ' + age + ' | id: ' + id.number);

    // Destructuring also supports nesting:
    let { identification: {number} } = person;
    console.log('7. id: ' + number);

    // Nesting and aliases:
    let { identification: {number: idNumber} } = person;
    console.log('8. id: ' + idNumber);

    // Destructuring is fail-soft so missing properties result in undefined values.
    // This doesn’t apply, however, when trying to assign a missing child property
    // whose parent property is also missing:

    // let { invalid: {alsoinvalid} } = person; // TypeError: Cannot destructure property `alsoinvalid` of 'undefined' or 'null'.

    /****************************************************
     * You don’t have to exclusively use destructuring
     * when declaring a variable via let or const. You
     * can use it for normal assignments to variables
     * that have already been declared. However, when
     * you do assignment-only object destructuring, you
     * have to wrap the entire statement in parentheses.
     * If you leave off the parenthesis you will get a
     * SyntaxError. This is because without the
     * parentheses the statement looks like an invalid
     * code block to the JavaScript engine.
     ****************************************************/

    let a;
    let b = {};

    ( {a, b: b.count} = {a: 1, b: 2} );
    console.log('9.', a, b); // Output: 1, {count: 2}

})();
