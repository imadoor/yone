require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT;


// app.use((req, res, next) =>{
//     console.log("In middleware");
//     next();
// });
app.use(morgan('dev'))

//Get all restaurants
app.get('/api/v1/restaurants', (req, res) => {
     res.status(200).json({
         "status":"sucess",
         "data": {
             "restaurant":[
                 "Chipotle",
                 "Dominos"
             ]
         }
     });
});

app.get('/api/v1/restaurants/:id', (req, res) => {
    console.log(req.params);
});

app.post('/api/v1/restaurants/', (req, res) => {
    console.log(req);
});



app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});