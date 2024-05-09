const express = require('express')
const port = 3000
const path=require('path');
const mongoose=require('mongoose');
const { type } = require('os');
const router=express.Router();
const uri='mongodb+srv://collegedb:collegedb123@cluster0.yubriwt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
router.get('/',(req, res)=>{
    res.render('regform');
})

//schema
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    number:{
        type: Number,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
})
// Model
userModel=mongoose.model('userdata',userSchema);
//function of connection;

async function run()
{
    try{
        const dboption={
            dbname:'tempdata',
        }
        await mongoose.connect(uri, dboption);
        console.log('connected mongoDb');
    } catch(err) {
        console.log(err);
    }
}

router.post('/',async (req, res)=>{
    const {name, number, userEmail, userPassword, address}=req.body;
    const createDoc=new userModel({
        name:name,
        number: number,
        email: userEmail,
        password: userPassword,
        address:address,
    })

    try{
        await createDoc.save();
        // console.log('record saved');
        res.status(200).json({message:'data saved seccussfully'});
    } catch(err) {
        console.log(err);
        res.status(500).send('error');
    }
})

run();

const getAllData=async()=>{
    const res=await userModel.find();
    return res;
}

//update document;

//update oc by id

const updateDocById = async (id) => {
    try {
        const result= await userModel.findByIdAndUpdate(id, {name:'komal'},{returnDocument:'after'});
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}

updateDocById('663c62bb6856423a810ea115');

const updateOneDocWithUpsert = async (id) => {
    try{
        const result= await userModel.updateOne({_id: id}, { name:'jivan sarraf'});
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}
updateOneDocWithUpsert('663bb3571d159fef1478cd96');

//upsert
const updateOneDoc = async (id) => {
    try{
        const result= await userModel.updateOne({_id: id}, { name:'ridhi sarraf'}, {upsert:true});
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}
updateOneDoc('716bb3571d159fef1478cd96'); //when id is not matched then insert






//delete document

//delete by id 
const deleteByIcDoc = async (id) => {
    try {
        const result=await userModel.findByIdAndDelete(id);
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}

deleteByIcDoc('716bb3571d159fef1478cd96');

//delete one

const deleteOneDec = async (id) => {
    try {
        const result= await userModel.deleteOne({_id:id})
        console.log(result);
    } catch(err) {
        console.log(err);
    }
}

deleteOneDec('663bb2b54b559b4914f42daf');

const deletemanyDoc = async (name) =>{
    try {
        const res= await userModel.deleteMany({name: name})
        console.log(res);
    } catch (err) {
        console.log(err);
    }
}
deletemanyDoc("aniket");

module.exports=router;