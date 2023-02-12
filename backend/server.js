const io=require("socket.io")(9000)
// const cors=require("cors");

const users={};

io.on("connection",(socket)=>{
    socket.on("new-user-joined",(name)=>{
        users[socket.id]=name;
        socket.broadcast.emit("user-joined",name);
    });

    socket.on("send",(message)=>{
        socket.broadcast.emit("receive",{"message":message,"name":users[socket.id]});
        
    });

    socket.on("disconnect",()=>{
        socket.broadcast.emit("user-left",users[socket.id]);
        delete users[socket.id];
    })

})
