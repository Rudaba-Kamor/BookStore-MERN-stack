import express from "express";
import { connect, mongoose } from "mongoose";
import { PORT, mongoDBURL } from './config.js';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';


///////////////////////////////APP INIT////////////////////////////////////////////

const app = express();

// https://stackoverflow.com/a/73744592/22545691
connect(mongoDBURL, {});

//"connection" to listen to events
mongoose.connection.on("connected", () => {
    console.log("MongoDB connection established!", mongoDBURL);
});

mongoose.connection.on('error', err => {
    console.log(err);
    process.exit(1);
});

app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
});

//////////////////////////////////////////////////////////////////////////


//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS POLICY
//Option 1: Allow All Origins with Default of cors(*)
app.use(cors("*"));


//Option 2: Allow Custom Origins
//app.use(
//cors({
  //  origin: 'http:// localhost:3000',
   // methods: ['GET', 'POST', 'PUT','DELETE'],
    //allowedHeaders:['Countent-Type'],
//})

//);


app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome To MERN Stack Tutorial')
});

app.use('/books', booksRoute);