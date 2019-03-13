//////////////////////////
///Code to set up server
/////////////////////////

//add Database
var Datastore = require('nedb');
var db = new Datastore({filename: "data.db", autoload: true});

////////////////////////
// Express, Web Portion, set up server
/////////////////////

//  calling the express module
//  then making an express application
//  then calling socket
//  io will be the thing that keeps track of messages in and out of sockets

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//telling server where to listen
server.listen(80);

//starting express and sending public folder to the app so people can see it
app.use(express.static('public'));

//send response if working
app.get('/', function (request, response) {
  res.send("Hello");
});

//////////////////////
// WebSocketsssssssss
/////////////////////
var watcher = null;

// Callback function for each new user connection
// open up a new connection

io.sockets.on('connection',

  // function is passed a websocket object
  function(socket){
    //say ID
		console.log("We have a new client: " + socket.id);

    // Socket for the watcher
		socket.on('watch',
      function(data) {
			// It's the watcher
			watcher = socket;
			console.log("have a watcher");
		});

		// Socket for events coming from the client side
    // looking for mouse socket
		socket.on('mouse',
			function (data) {

        // //Note it in the console
        console.log("Data Recieved");

        //create an object to save
        var datatosave = {
          socketid: socket.id,
          info: data
          //add xy here?
        };

        //insert data into the Database
        db.insert(datatosave, function (err, newDocs){
          console.log(datatosave);
          console.log("err: " + err);
          console.log("newDocs: " + newDocs);
        });



			}
		);

    //socket for drawing
    socket.on('drawing',
      function(data){

        // If there is a watcher, send to them
        if (watcher != null) {
        	console.log("send to watcher");
        	data.socket_id = socket.id;
        	watcher.emit('drawing', data);
        }

      }
    );

    //add drawing socket?

    //socket disconnect
		socket.on('disconnect', function() {
			console.log("Client has disconnected");
      //clear database
    });
	}
);
