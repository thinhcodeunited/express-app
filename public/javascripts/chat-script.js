var socket = io();

jQuery(document).ready(function($) {
  $('.msg-input').keyup(function(e) {
    if ($(this).val() !== '') {
      $('.msg-send').removeAttr('disabled');
    } else {
      $('.msg-send').prop('disabled', true);
    }
  }).keydown(function(e){
    if(e.keyCode == 13) {
      e.preventDefault();
      return false;
    }
  });
 
  $('.msg-send').on('click', (e) => {
    $('.msg-send').prop('disabled', true);
    const obj_send = {
      user : 'guest',
      text : $('.msg-input').val()
    };
    socket.emit('send_msg', obj_send);
    $('.msg-input').val('');
  });

  socket.on('open_chat', (obj) => {
    $('ul.msg').append('<li data-id="'+obj.id+'" class="server-notification">'+obj.user+' start a conversation</li>')
  });
  socket.on('close_chat', (obj) => {
    $('ul.msg li[data-id="'+obj.id+'"').remove();
  });

  socket.on('send_msg', (obj) => {
    const usertext = '<b>'+obj.user+' </b>';
    const text = '<span>'+obj.text+'</span>';
    $('ul.msg').append('<li>'+usertext + text+'</li>')
  });
});


const openForm = () => {
  socket.emit('open_chat', {id : socket.id, user : obj.username});
  document.getElementById("myForm").style.display = "block";
}
const closeForm = () => {
  socket.emit('close_chat', {id : socket.id, user : 'Guest'});
  document.getElementById("myForm").style.display = "none";
}