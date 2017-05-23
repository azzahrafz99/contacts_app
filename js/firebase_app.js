var config = {
  apiKey: "AIzaSyBIArpxQWqmWnjx420bAtttVSuZklkCjbE",
  authDomain: "contacts-107e4.firebaseapp.com",
  databaseURL: "https://contacts-107e4.firebaseio.com",
  projectId: "contacts-107e4",
  storageBucket: "contacts-107e4.appspot.com",
  messagingSenderId: "215367402221"
};
firebase.initializeApp(config);


// Get a reference to the database service
var database = firebase.database();

function writeContacts(uid, name, phone_number) {
  var database_ref = firebase.database().ref('contacts/' + uid);

  database_ref.set({
    uid: uid,
    name: name,
    phone_number: phone_number
  });

  var newContactKey = firebase.database().ref().child('contacts').push().key;
}

function showContacts(){
  var ref = firebase.database().ref().child('contacts');

  ref.once("value", function(snapshot) {
    data = snapshot.val();
    var txt;
    for (var key in data) {
      var result = data[key];
      console.log(result);
      $('tbody').append("<tr data-uid='"+key+"' class='data'><td>"+result.name+"</td><td><input class='button-small' id='update_name' type='submit' value='Update'></td><td>"+result.phone_number+"</td><td><input class='button-small' id='update_phone' type='submit' value='Update'</td><td><input class='button-small' id='destroy' type='submit' value='Delete'></td></tr>");
    }
  });
}
