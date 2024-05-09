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


//retrieve all documents
getAllData().then(data=>{
    // console.log(data);
    data.forEach(element => {
        console.log(element.name);
    });
})

//retrieve specific feild

const specificFiend = async()=>{
    const result=await userModel.find().select(['name','number']); //DISPLAY BOTH NAME OR NUMBER
    const result=await userModel.find().select('name number'); //DISPLAY BOTH NAME OR NUMBER
    const result=await userModel.find().select({name:1, email:1}); //DISPLAY BOTH NAME OR EMAIL

    const result=await userModel.find().select('-name -email') //name aur email ke alawa (i.e chhor ke) bakee sabkuchh
    const result=await userModel.find().select(['-name', '-email']) //name aur email ke alawa (i.e chhor ke) bakee sabkuchh
    const result=await userModel.find().select({name:0, email:0}) //name aur email ke alawa (i.e chhor ke) bakee sabkuchh
    console.log(result);
}
specificFiend();

//retrieve single document

const getSingleDoc=async()=>{
    // const result=await userModel.findOne(); // gives first object
    // console.log(result);

    const result=await userModel.findById('663bb2b54b559b4914f42daf');
    console.log(result);
    console.log(result._id.getTimestamp())  gives inserted time (when data is inserted)
}

getSingleDoc();


//retrieve single document with specific field

const getSingleDocSpecificField= async ()=>{
    const result=await userModel.findById('663bb2b54b559b4914f42daf').select('name number'); //jiska id yah hai uska name aaur email
    console.log(result);
    //jiska name kumar hai uska number do
    const kumarNumber=await userModel.find({name:'kumar'}).select('number');
    console.log(kumarNumber);
}

getSingleDocSpecificField();

//get/ retrieve limited document

const getLimitedDoc=async ()=>{
    const result=await userModel.find().limit(4); //gives first 4 
    console.log(result);
}
getLimitedDoc();

//skip doc
const getSkipDoc=async ()=>{
    const result=await userModel.find().skip(2); //skip first 2 document and gives all
    console.log(result);
}
getSkipDoc();


//count all number of documents
const getCountDoc=async ()=>{
        const result=await userModel.find().countDocuments(); // return number of all documents
        console.log(result);
}
getCountDoc();

//sort documents
const getSortDoc=async ()=>{
    const result=await userModel.find().sort({password:1}); //gives sorted way according/base on password 
    //similarly sort karo age ya salary aya kis v field ke according
    //    in decinging order sort the .sort({password:-1}); -1 for decinding and 1 for accending
    console.log(result);
}
getSortDoc();


//mixed documents

const mixDoc = async () =>{
    //gives name and password start from 2nd and gives 4 records
    const result=await userModel.find({},{name:1, password:1},{limit:4,skip:1})
    console.log(result);
}

mixDoc();

//comparision operator

const comparisionDoc = async () =>{
  
    // age greater of eual or not or in
    const result=await userModel.find({password:{$gt:'1000'}}); //greater 
    const result=await userModel.find({password:{$gte:'1000'}}); //greater then equal 
    const result=await userModel.find({password:{$lt:'1000'}}); //less then
    const result=await userModel.find({password:{$lte:'1000'}}); //less tehn equal
    const result=await userModel.find({password:{$in:['0000','0011']}}); //jis ka password 0000 aur 0011 hai wah sab ka details do 
    const result=await userModel.find({password:{$nin:['0000','0011']}}); //jis ka password 0000 aur 0011 hai usko chhor ke  sab ka details do 
    console.log(result);
}

comparisionDoc();

//logical operator

const logicalOperatorDoc = async () =>{
    const result=await userModel.find({$and: [{name:'kumar'},{number:'9123'}]});
    console.log(result);
}

logicalOperatorDoc();


module.exports=router;