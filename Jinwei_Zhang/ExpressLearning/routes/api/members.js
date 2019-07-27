const express = require('express');
const router = express.Router();
const members = require('../../MembersObj');

//this will get all members obj was (app.get(api/members/)) was api/members
router.get('/',(req,res)=>{
    res.json(members);
});

//get single member
router.get('/:id',(req,res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));
    // res.send(req.params.id);
    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }else{
        //    give a 400 status code not using the back tics.
        res.status(400).json({msg: 'No member with id of ' + req.params.id});
    }

});

// create a member
router.post('/',(req,res)=>{
   // res.send(req.body);
    const newMember = {

    }
});


module.exports = router;
