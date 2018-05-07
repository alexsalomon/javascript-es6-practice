
"use strict";

/****************************************************
 * Classes and Prototypes
 ****************************************************/

{
    /****************************************************
     * ES5: Prototypes
     ****************************************************/
    console.log("----------------------");

    // Constructor
    function Person(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // Methods
    Person.prototype.getFullName = function () {
        return this.firstName + ' ' + this.lastName;
    }

    // Instantiating objects
    {
        let person = new Person('John', 'Doe');
        let name = person.getFullName();
        console.log('1. name: ' + name);
    }

    console.log("----------------------");
    /****************************************************
     * ES5: Prototypal Inheritance
     ****************************************************/
    console.log("----------------------");

    // Constructor
    function Actor(firstName, lastName) {
        Person.call(this, firstName, lastName);
        this.oscars = 2;
    }

    // Inheriting Person's methods
    Actor.prototype = Object.create(Person.prototype);

    // Setting the constructor
    Actor.prototype.constructor = Actor;

    // Actor specific methods
    Actor.prototype.getOscars = function () {
        return this.oscars;
    }

    {
        let actor = new Actor('Al', 'Pacino');
        let name = actor.getFullName();
        let oscars = actor.getOscars();
        console.log('2. name: ' + name);
        console.log('2. oscars: ' + oscars);
    }

    console.log("----------------------");
}

{
    /****************************************************
     * ES6: Classes
     ****************************************************/
    console.log("----------------------");

    class Person {
        constructor(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
        }

        getFullName() {
            return this.firstName + ' ' + this.lastName;
        }
    }

    {
        let person = new Person('John', 'Doe');
        let name = person.getFullName();
        console.log('3. name: ' + name);
    }

    console.log("----------------------");
    /****************************************************
     * ES6: 'Classical' Inheritance
     ****************************************************/
    console.log("----------------------");

    class Actor extends Person {
        constructor(firstName, lastName) {
            super(firstName, lastName);
            this.oscars = 2;
        }

        getOscars() {
            return this.oscars;
        }
    }

    {
        let actor = new Actor('Al', 'Pacino');
        let name = actor.getFullName();
        let oscars = actor.getOscars();
        console.log('4. name: ' + name);
        console.log('4. oscars: ' + oscars);
    }


    console.log("----------------------");
}
/****************************************************
 ****************************************************/

console.log("\nDONE.");
