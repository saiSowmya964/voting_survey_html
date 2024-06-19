var express=require('express');
var mongoose=require('mongoose');
var path=require('path');
var bodyParser = require('body-parser');

var app=express();
app.use(bodyParser.json())
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect("mongodb://127.0.0.1:27017/project",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{console.log("connected");})
.catch((err)=>{console.log(err);})

var db=mongoose.connection;
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/login.html'));
}).listen((4040),()=>{
    console.log("server runs on port 4040");
})
app.get('/index.html',(req,res)=>{
    res.sendFile(path.join(__dirname+'/index.html'));
})
app.get('/thankyou.html',(req,res)=>{
    res.sendFile(path.join(__dirname+'/thankyou.html'));
})
app.post('/login',(req,res)=>{
    var name=req.body.firstname;
    var lastname=req.body.lastname;
    var aadharnumber=req.body.aadharnumber;
    var check=req.body.check;
    
    var data={
        "Name":name,
        "LastName":lastname,
        "aadharnumber":aadharnumber,
        "Check-Box":check
    };

    db.collection('login').insertOne(data,(err,collection)=>{
        if(err){throw err}
        else{console.log("Successfully inserted");
        // res.sendFile(path.join(__dirname+'/index.html'));
        res.redirect('/index.html');
    }
    });
});
app.post('/index',(req,res)=>{
    var firstname=req.body.firstname;
    var lastname=req.body.lastname;
    var middlename=req.body.middlename;
    var fathername=req.body.fathername;
    var mothername=req.body.mothername;
    var gender=req.body.gender;
    var aadharnumber=req.body.aadharnumber;
    var phonenumber=req.body.phonenumber;
    var age=req.body.age;
    var address=req.body.address;
    var city=req.body.city;
    var state=req.body.state;
    var district=req.body.district;
    
    
    var data1={
        "Name":firstname,
        "LastName":lastname,
        "MiddleName":middlename,
        "FatherName":fathername,
        "MotherName":mothername,
        "Gender":gender,
        "aadharnumber":aadharnumber,
        "phonenumber":phonenumber,
        "age":age,
        "address":address,
        "city":city,
        "state":state,
        "district":district
    }
    db.collection('index').insertOne(data1,(err,collection)=>{
        if(err){throw err}
        else{console.log("Successfully inserted");
        res.redirect('/thankyou.html');
    }
    });
});
app.post('/login.html', (req, res) => {
   res.redirect('/'); 
});