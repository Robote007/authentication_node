require("dotenv").config();
const express =require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
 
const app = express();
 
const PORT= process.env.PORT;
 
app.use(bodyParser.json());
 

/*ROUTES  */
app.get('/', (req, res) => {
    res.status(200)
        .json({message: "You are on / road", statusCode: 200});
});

app.get('/:name', (req, res) => {
    const name = req.params.name;
    console.log("NAME BODY ===>", name);
    res.status(200)
        .json({message: "You are on / road " + name, statusCode: 200});
});

app.post('/post', (req, res) => {
    res.status(200)
        .json({message: "You are on POST", statusCode: 200});
});

app.put('/update', (req, res) => {
    res.status(200)
        .json({message: "You are on  UPDATE", statusCode: 200});
});

app.delete('/delete', (req, res) => {
    res.status(200)
        .json({message: "You are on DELETE", statusCode: 200});
});


app.use(morgan('dev'));
 
 
app.listen(PORT, ()=>{
    console.log(`server is listening  on ${PORT}`);
});
 
module.exports = app;