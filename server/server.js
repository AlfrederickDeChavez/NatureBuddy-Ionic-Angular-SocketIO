const express = require('express')
const app = express()
const server = require('http').createServer(app)
const { Server } = require('socket.io')
const cors = require('cors')

app.use(cors())

const io = new Server(server, {
    cors: {
        origin: "http://localhost:8100", 
        methods: ["GET", "POST"] 
    }
})

io.on("connection", (socket) => {

    socketInfo = { id: socket.id, username: ''}
    console.log('User connected.')

    //User has logged in.
    socket.on('login', username => {
        socket.emit('user-joined', username)
        socketInfo.username = username
        console.log(socketInfo)

        //User has post an action --> feeds
        socket.on('post-action', data => {
            console.log(data)
            io.emit('receive-post', data)
        })  

        
    })   

    //User has start a project.
    socket.on('start-project', project => {
        socket.broadcast.emit('receive-project', project)
        console.log(project)
    })
    

})

var PORT = process.env.PORT || 3001

server.listen(PORT, () => {
    console.log(`SERVER RUNNING AT PORT ${PORT}`)
})

