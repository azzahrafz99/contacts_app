showContacts();

$('body').on('click', '#submit', function() {
  var name = $('input[name=name]').val();
  var phone_number = $('input[name=phone_number]').val();
  var uid = Math.floor(Date.now() / 1000);
  writeContacts(uid, name, phone_number);
});

$('body').on('click', '.edit-btn', function() {
  var contact_id = $(this).parent().parent().data('uid');
  var ref = firebase.database().ref('/contacts/' + contact_id).once('value').then(function(snapshot) {
    $('input[name=name]').val(snapshot.val().name);
    $('input[name=uid]').val(contact_id);
    $('input[name=phone_number]').val(snapshot.val().phone_number);
    $('.btn-container').html('<input class="button-primary" id="update" type="submit" value="Update"><input class="button-primary" id="cancel" type="submit" value="X">');
  });
});

$('body').on('click', '#cancel', function() {
  $('input[name=name]').val('');
  $('input[name=phone_number]').val('');
  $('input[name=uid]').val('');
  $('.btn-container').html('<input class="button-primary" id="submit" type="submit" value="Submit">');
});

$('body').on('click', '#update', function() {
  var phone_number = $('input[name=phone_number]').val();
  var name = $('input[name=name]').val();
  var contactId = $('input[name=uid]').val();
  updateContact(phone_number, name, contactId);
});

var rootRef = firebase.database().ref().child('contacts');
$('body').on('click', '.destroy-btn', function(){
  clearForm();
  var row = $(this).parent().parent(), rowId = row.data('uid');
  if (rootRef.child(rowId).remove()) {
    row.remove();
  }
});

$('body').on('click', '#destroy-all', function() {
  clearForm();
  $('tr').each(function() {
    if (rootRef.remove()) {
      if ($(this).hasClass('data')) {
        $(this).remove();
      }
    }
  });
});

function clearForm() {
  $('input[name=name]').val('');
  $('input[name=phone_number]').val('');
  $('input[name=uid]').val('');
  $('.btn-container').html('<input class="button-primary" id="submit" type="submit" value="Submit">');
}
