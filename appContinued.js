// MEDIATOR SECTION
const User = function(name) {
  this.name = name;
  this.chatroom = null;


}

User.prototype = {
  send: function(message, to) {
    this.chatroom.send(message, this, to);
  },
  recieve: function(message, from) {
    console.log(`${from.name} to ${this.name}: ${message}`);
  }
}

const Chatroom = function() {
  let users = {}; // list of users

  return {
    register: function(user) {
      users[user.name] = user;
      user.chatroom = this;
    },
    send: function(message, from, to) {
      if (to) {
        // Single user message
        to.recieve(message, from);
      } else {
        // Mass message
        for (key in users) {
          if (users[key] !== from) {
            users[key].recieve(message, from);
          }
        }
      }
    }
  }
}

const levi = new User('Levi');

const tyler = new User('Tyler');

const jess = new User('Jessica');

const andy = new User('Andy');

const chatroom = new Chatroom();

chatroom.register(levi);
chatroom.register(tyler);
chatroom.register(jess);
chatroom.register(andy);

levi.send('Hello Tyler', tyler);
jess.send('Get away from me', andy);
jess.send('Actually, all of you go away');