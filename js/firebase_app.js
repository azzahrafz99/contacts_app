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
var rootRef = firebase.database().ref().child('contacts');

function writeContacts(uid, name, phone_number) {
  $('tr').removeClass('shaded-background');
  var database_ref = firebase.database().ref('contacts/' + uid);

  database_ref.set({
    uid: uid,
    name: name,
    phone_number: phone_number
  });

  database_ref.once('value', function(snapshot) {
    if (snapshot.val() != null) {
      $('tbody').append("<tr data-uid='"+uid+"' class='data shaded-background'><td colspan='2'>"+name+"</td><td colspan='2'>"+phone_number+"</td><td colspan='2'><input class='button-small destroy-btn' type='button' value='Delete'><input class='button-small edit-btn' type='button' value='Edit'></td></tr>");
      clearForm();
    }
  });
  var newContactKey = firebase.database().ref().child('contacts').push().key;
}

function showContacts(contactId){
  contactId = contactId || null;
  rootRef.once("value", function(snapshot) {
    data = snapshot.val();
    var txt;
    for (var key in data) {
      var result = data[key];
      if (contactId == key) {
        $('tbody').append("<tr data-uid='"+key+"' class='data shaded-background'><td colspan='2'>"+result.name+"</td><td colspan='2'>"+result.phone_number+"</td><td colspan='2'><input class='button-small destroy-btn' type='button' value='Delete'><input class='button-small edit-btn' type='button' value='Edit'></td></tr>");
      } else {
        $('tbody').append("<tr data-uid='"+key+"' class='data'><td colspan='2'>"+result.name+"</td><td colspan='2'>"+result.phone_number+"</td><td colspan='2'><input class='button-small destroy-btn' type='button' value='Delete'><input class='button-small edit-btn' type='button' value='Edit'></td></tr>");
      }
    }
  });
}

function updateContact(phone_number, name, contactId) {
  if (rootRef.child(contactId).update({
    phone_number: phone_number,
    name: name
  })) {
    $('tbody').html('');
    showContacts(contactId);
    clearForm();
  }
}
