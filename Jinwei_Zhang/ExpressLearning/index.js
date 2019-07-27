const express = require('express');
const path = require('path');

const app = express();

const members = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@gmail.com',
        status: 'active'
    },
    {
        id: 2,
        name: 'Bob Williams',
        email: 'bob@gmail.com',
        status: 'inactive'
    },
    {
        id: 3,
        name: 'Shannon Jackson',
        email: 'shannon@gmail.com',
        status: 'active'
    }
];


app.get('/api/members',(req,res)=>{
    res.json(members);
});
// //this is not ideal we want to make publc folder static
// app.get('/', (req,res)=>{
//    //could send file/ json/ render html
//    // res.send('<h1>Express using!!</h1>');
//    res.sendFile(path.join(__dirname, 'public','index.html'));
// });

app.use(express.static(path.join(__dirname,'public')));

//means: whatever is in the environment variable PORT, or 3000 if there's nothing there.
//If you pass 3000 hard-coded to app.listen(), you're always listening on port 3000, which might be just for you, or not,
// depending on your requirements and the requirements of the environment in which you're running your server.
const PORT = process.env.PORT || 5000;

// can not get/
app.listen(PORT,()=>console.log(`server started on port ${PORT}`));
