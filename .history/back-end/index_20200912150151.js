require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT;

const db = require('./db');

app.use(morgan('dev'));
app.use(express.json());
// app.use((req, res, next) =>{
//     console.log("In middleware");
//     next();
// });

//Get all restaurants
app.get('/api/v1/restaurants', async (req, res) => {

    try{
        const {rows} = await db.query('SELECT * FROM restaurants');
        console.log(rows);
         res.status(200).json({
             status:"sucess",
             results: rows.length,
             data: {
                 restaurant: rows
             }
         });
    } 
    catch (err){
        res.status(404).json({status: 'failed'});
    }

});

//Get specific restaurant
app.get('/api/v1/restaurants/:id', async (req, res) => {

    try{
        const {rows} = await db.query('SELECT * FROM restaurants WHERE id = $1', [req.params.id]);
        console.log(req.params);
         res.status(200).json({
             status:"sucess",
             results: rows.length,
             data: {
                 restaurant: rows
             }
         });
    } 
    catch (err){
        res.status(404).json({status: 'restaurant does not exist'});
    }
});

//create restaurant entry
app.post('/api/v1/restaurants/', async (req, res) => {
    try{
        console.log(req.body);
        const { rows } = await db.query(
            'INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) returning *', 
            [req.body.name, req.body.location, req.body.price_range]);
         res.status(201).json({
             status:"sucess",
             results: rows.length,
             data: {
                 restaurant: rows
             }
         });
    } 
    catch (err){
        res.status(404).json({status: 'restaurant does not exist'});
    }
});


//update restaurant
app.put('/api/v1/restaurants/:id', async (req, res) => {
    try{
        console.log(req.body);
        const {rowCount, rows} = await db.query(
            'UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *', 
            [req.body.name, req.body.location, req.body.price_range, req.params.id]);
        if(rowCount === 1){
            res.status(201).json({
                status:"sucess",
                results: rows.length,
                data: {
                    restaurant: rows
                }
            });
        }
        else{
            res.status(404).json({
                status:"restaurant does not exist",
            });
        }
    } 
    catch (err){
        res.status(404).json({status: 'restaurant does not exist'});
    }
});

//delete restaurant
app.delete('/api/v1/restaurants/:id', async (req, res) => {
    try{
        console.log(req.body);
        const { rowCount, rows } = await db.query(
            'DELETE FROM restaurants WHERE id=$1', [req.params.id]);
        if(rowCount === 1){
            res.status(201).json({
                status:"sucess",
                results: rows.length,
                data: {
                    restaurant: rows
                }
            });
        }
        else{
            res.status(404).json({
                status:"restaurant does not exist",
            });
        }
        } 
        catch (err){
            res.status(404).json({status: 'restaurant does not exist'});
        }
});

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});