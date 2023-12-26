var express = require("express");
var router = express.Router();
const customerModel = require("../Models/customer");
const customer = require("../Models/customer");

router.get("/allcustomers",async function(req,res){
    try{
        customers = await customerModel.find({});
        res.send(customers);
    }
    catch(error){
        console.log("Error in getting data");
        res.status(400).send(error);
    }
});

router.get("/getcustomer/:id",async function(req,res){
    try{
        const _id = req.params.id;
        let customer = await customerModel.findById({_id:_id});
        res.send(customer);
    }
    catch(error){
        console.log(error);
        res.status(400).send(error);
    }
});

router.post("/addcustomers",async function(req,res){
    try{
        const customer = new customerModel(req.body);
        await customer.save();
        res.status(201).send({
            status:true,
            message:"Record Created"
        });
    }
    catch(error){
        res.status(400).send(error);
    }
});

router.patch("/updatecustomers/:id",async function(req,res){
    try{
        const _id = req.params.id;
        var body = req.body;
        const customers = await customerModel.findByIdAndUpdate({_id},body,{new:true});

        if(!customers){
            res.status(404).send("No records Found");
        }

        res.status(201).send({
            status:true,
            message:"Record Updated"
        })

    }
    catch(error){
        res.status(400).send(error);
    }
});

router.delete("/deletecustomers/:id",async function(req,res){
    try{
        const _id = req.params.id;
        const customers = await customerModel.findOneAndDelete({_id});

        if(!customers){
            res.status(404).send("No record Found");
        }
        res.status(201).send({
            status:true,
            message:"Record Deleted"
        });
    }
    catch(error){
        res.status(400).send(error);
    }
});

module.exports = router;