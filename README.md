# Real Time Chat Application
A simple, pure JavaScript chat app built using Node.js express.js and socket.io

# Demo 
You can test this app out live here: https://chatapp-qh55.onrender.com

# Features
  <li>Uses Express as the application Framework.</li> 
  <li>Real-time communication between a client and a server using Socket.io.</li>
  <li>Created rooms using concept of rooms</li>
  
## ScreenShots


  
# Installation

### Running Locally 

Make sure you have Node.js and npm install.

  1. Clone or Download the repository 
    <pre>git clone https://github.com/abdul0398/ChatApp
    $ cd Real-Time-Chat-Application</pre>
  2. Install Dependencies
      <pre>npm install</pre>
  3. Start the Application
     <pre>node app.js</pre>
  Application runs from localhost:3000.
  
  
   ## Sockets
    
   Having an active connection opened between the client and the server so client can send and receive data. This allows             real-time communication using TCP sockets. This is made possible by Socket.io.

   The client starts by connecting to the server through a socket(maybe also assigned to a specific namespace). Once connections is successful, client and server can emit and listen to events. 
      
