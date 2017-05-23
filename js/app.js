showContacts();

$('#submit').click(function() {
  var name = $('input[name=name]').val();
  var phone_number = $('input[name=phone_number]').val();
  var uid = Math.floor(Date.now() / 1000);
  $('tbody').append("<tr data-uid='"+uid+"' class='data'><td>"+name+"</td><td><input class='button-small' id='update_name' type='submit' value='Update'></td><td>"+phone_number+"</td><td><input class='button-small' id='update_phone' type='submit' value='Update'></td><td><input class='button-small' id='destroy' type='submit' value='Delete'></td></tr>");
  writeContacts(uid, name, phone_number);
});

var rootRef = firebase.database().ref().child('contacts');
$('body').on('click', '#destroy', function(){
  var row = $(this).parent().parent(), rowId = row.data('uid');
  if (rootRef.child(rowId).remove()) {
    row.remove();
  }
});

$('body').on('click', '#update_name', function() {
    var name = $('input[name=name]').val();
    var rowId = $(this).parent().parent().data('uid');
    if (rootRef.child(rowId).update({name: name})) {
      location.reload();
    }
});

$('body').on('click', '#update_phone', function() {
    var phone_number = $('input[name=phone_number]').val();
    var rowId = $(this).parent().parent().data('uid');
    if (rootRef.child(rowId).update({phone_number: phone_number})) {
      location.reload();
    }

});

$('body').on('click', '#destroy-all', function() {
  $('tr').each(function() {
    if (rootRef.remove()) {
      if ($(this).hasClass('data')) {
        $(this).remove();
      }
    }
  });
});
