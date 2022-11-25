const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
const app = express()
connectToMongo();



const port = 5000
// routes are like paths or pages we add in our website
// We are creating a Models folder to store the Mongoose Models. A Mongoose model is a wrapper on the Mongoose schema. A Mongoose schema defines the structure of the document, default values, validators, etc., whereas a Mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc.
app.use(cors())
app.use(express.json())    // middleware They are the functions that have access to the request and response object in the request-response cycle. They are used to alter res and req objects for some specific tasks. We have to use the middleware before using the req.body command.
// Avaliable Routes
//The app.use() function is used to mount the specified middleware function(s) at the path which is being specified. It is mostly used to set up middleware for your application.
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('Hello World!')
}),

  app.listen(port, () => {
    console.log(`iNoteBook Backend listening on port ${port}`)
  })