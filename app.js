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
