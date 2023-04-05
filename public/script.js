const socket = io();// we want to start this function when some one come to the landing page;
$("#send-btn").click(()=>{// getting button through jquery and event of click
    const msg = $('#input').val();// getting value of input
    $('#input').val(" ");
    socket.emit("msg",{// socket.emet sends the message on to the pipeline;
        msg:msg,
    }) 
});
//$("#chat-box").addClass("d-flex");
$('#chat-box').hide();
$('#btn-login').click(()=>{
    const username = $('#username').val();
    const room = $('#room').val();
    console.log(!/^[A-Za-z0-9]*$/.test(room));
    if(!/^[A-Za-z0-9]*$/.test(username) || !/^[A-Za-z0-9]*$/.test(room) || room.length == 0 || username.length == 0){
        $('#error').empty();
        $('#error').append(`<li class="p-2 ms-0 mb-2 text-center">Write only letters and number</li>`)
        return;
    }
    $('#username').val("");
    $('#room').val("");
    socket.emit('login', {
        username:username,
        room:room
    })
    socket.on('login-msg',(data)=>{
        $("#chat").append(`<li class="p-2 ms-0 mb-2 text-white"><span class="fw-bold">${data.data.msg} </span></li>`);
        const arr = data.data.connected;
        $("#activeUsers").empty();
        $('room').append(`<span>${data.data.room}</span> `);
        for (const user of arr) {
            $("#activeUsers").append(`<li class="p-2 ms-0 mb-2 text-white"><span>${user.username}</span></li>`);    
        }
    })
    socket.on('received_message', data =>{
        $('#chat').append(`<li class="p-2 ms-0 mb-2 text-white"><span>${data.name}: ${data.msg} </span></li>`)
      });
    $('#login').hide();
    $("#chat-box").show();
    $("#chat-box").addClass("d-flex");
})
socket.on('dissconnected-msg', data =>{
    const arr = data.connected;
    $('#chat').append(`<li class="p-2 ms-0 mb-2 text-white"><span class="fw-bold">${data.name} left the room </span><span></span></li>`)
    $("#activeUsers").empty();
    for (const user of arr) {
        $("#activeUsers").append(`<li class="p-2 ms-0 mb-2 text-white"><span class="fw-bold">${user.username}</span><span></span></li>`);    
    }
  });
