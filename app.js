// A re-usable solution that can be applied to occurring problems in software design (JS apps)
// Programming templates basically

// MODULE PATTERN SECTION

// Basic structure example
(function() {
  // Declare private vars and functions
  return{
    // Declare public var and functions
  }
})();

const UICtrl = (function() {
  let text = 'Hello World';

  const changeText = function() {
    const element = document.getElementById('top_text');
    element.textContent = text;
  }

  return {
    callChangeText: function() {
      changeText();
      console.log(text);
    }
  }
})();

UICtrl.callChangeText(); // Can do this one, public vars and functions can be accessed, which is accessing the private stuff while in the function still
// UICtrl.changeText(); // Can't do this one, it is private itself

// REVEALING MODULE PATTERN SECTION
const ItemCtrl = (function() {
  let _data = [];

  function add(item) {
    _data.push(item);
    console.log('Item added....');
  }

  function get(id) {
    return _data.find(item => {
      return item.id === id;
    });
  }

  // Return object literal of methods above
  // Reveals the methods for public use
  return {
    add: add,
    get: get
  }
})();

ItemCtrl.add({id: 1, name: 'John'});
ItemCtrl.add({id: 2, name: 'Mark'});
console.log(ItemCtrl.get(1));
console.log(ItemCtrl.get(2));

// SINGLETON PATTERN SECTION
// Manifestation of module pattern
// A singleton object is an immediate anonymous function, can only return one instance of an object at a time
// Repeated calls to the constructor will just return the same instance
// Maintains a private reference
// Used for one use object creation, like one user at once
// Have a bad rap for a few reasons, but can have their place

const Singleton = (function() {
  let instance;

  function createInstance() {
    const object = new Object({name: 'Levi'});
    return object;
  }

  return {
    getInstance: function() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  }
})();

const instanceA = Singleton.getInstance();
const instanceB = Singleton.getInstance();

console.log(instanceA === instanceB); // returns true, can never have more than one instance

// FACTORY PATTERN SECTION
// FACTORY METHOD
// Way of creating an interface for creating objects
// Can let subclasses define which classes to instantiate and factory methods are often used in applications to manage, maintain, and manipulate collections of objects that are different but also have a lot of common characteristics

function MemberFactory() {
  this.createMember = function(name, membershipType) {
    let member;

    if (membershipType === 'simple') {
      member = new SimpleMembership(name);
    } else if (membershipType === 'standard') {
      member = new StandardMembership(name);
    } else if (membershipType === 'super') {
      member = new SuperMembership(name);
    }

    member.membershipType = membershipType;

    member.define = function() {
      console.log(`${this.name} (${this.membershipType}): ${this.cost}`);
    }

    return member;
  }
}

const SimpleMembership = function(name) {
  this.name = name;
  this.cost = '$5';
}

const StandardMembership = function(name) {
  this.name = name;
  this.cost = '$15';
}

const SuperMembership = function(name) {
  this.name = name;
  this.cost = '$25';
}

const members = [];
const factory = new MemberFactory();

members.push(factory.createMember('John Doe', 'simple'));
members.push(factory.createMember('Mary Fae', 'super'));
members.push(factory.createMember('Janice Johnson', 'simple'));
members.push(factory.createMember('Will Thomas', 'standard'));

members.forEach(function(member) {
  member.define();
})