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
    socket.on('login', username=> {
        socket.emit('user-joined', username)
        console.log(username)

        socket.on('post-action', data => {
            console.log(data)
            io.emit('receive-post', data)
        })
    })

    
})


var PORT = process.env.PORT || 3001

server.listen(PORT, () => {
    console.log(`SERVER RUNNING AT PORT ${PORT}`)
} )