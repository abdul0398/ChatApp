const socket = io();// we want to start this function when some one come to the landing page;
$("#send-btn").click(()=>{// getting button through jquery and event of click
    const msg = $('#input').val();// getting value of input
    $('#input').val(" ");
    socket.emit("msg",{// socket.emet sends the message on to the pipeline;
        msg:msg,
    }) 
});
$('#chat-box').hide();
$('#btn-login').click(()=>{
    const username = $('#username').val();
    const room = $('#room').val();
    $('#username').val("");
    $('#room').val(" ");
    socket.emit('login', {
        username:username,
        room:room
    })
    socket.on('login-msg',(data)=>{
        $("#chat").append(`<li class="p-2 ms-0 mb-2"><span class="fw-bold">${data.data.msg} </span><span></span></li>`);
        const arr = data.data.connected;
        $("#activeUsers").empty();
        for (const user of arr) {
            $("#activeUsers").append(`<li class="p-2 ms-0 mb-2"><span class="fw-bold">${user.username}</span><span></span></li>`);    
        }
    })
    socket.on('received_message', data =>{
        $('#chat').append(`<li class="p-2 ms-0 mb-2"><span class="fw-bold">${data.name}: ${data.msg} </span><span></span></li>`)
      });
    $('#login').hide();
    $("#chat-box").show();
    $("#chat-box").addClass("d-flex");
})
socket.on('dissconnected-msg', data =>{
    console.log(data);
    const arr = data.connected;
    $('#chat').append(`<li class="p-2 ms-0 mb-2"><span class="fw-bold">${data.name} left the room </span><span></span></li>`)
    $("#activeUsers").empty();
    for (const user of arr) {
        $("#activeUsers").append(`<li class="p-2 ms-0 mb-2"><span class="fw-bold">${user.username}</span><span></span></li>`);    
    }
  });
