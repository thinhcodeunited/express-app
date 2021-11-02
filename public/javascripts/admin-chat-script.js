var socket = io();

jQuery(document).ready(($) => {
    $('#input').keydown(function(e){
        if(e.keyCode == 13) {
          e.preventDefault();
          return false;
        }
    });

    socket.on('open_chat', (obj) => {
        $('#messages').append('<li data-id="'+obj.id+'" class="server-notification">'+obj.user+' start a conversation</li>')
        $('#user').append('<li data-id="'+obj.id+'">'+obj.user+'</li>')
    });

    socket.on('close_chat', (obj) => {
        $('#user li[data-id="'+obj.id+'"').remove();
    });

    socket.on('send_msg', (obj) => {
        const usertext = '<b>'+obj.user+': </b>';
        const text = '<span>'+obj.text+'</span>';
        $('#messages').append('<li>'+usertext + text+'</li>')
    });  

    $('.msg-send').on('click', (e) => {
        e.preventDefault();
        const sendobj = {
            text : $('#input').val(),
            user : obj.username
        }
        if (sendobj.text === '') return false;
     
        socket.emit('send_msg', sendobj);
        $('#input').val('');
    });
});