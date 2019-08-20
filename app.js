
const express = require('express');
const port = 3003;
const app = express()//app.listen(port);
const bodyParser  = require('body-parser');
var async = require('async');
var cors = require('cors');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 app.use(cors());
 app.use( cors({  origin: 'http://localhost:3000', credentials: true, })); 
 var firebase = require("firebase-admin"); var serviceAccount = require("./serviceAccountKey.json");
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://track-8263b.firebaseio.com"
}); var db = firebase.database();
const http = require('http')
const socketIO = require('socket.io')
const server = http.createServer(app);
const io = socketIO(server);
server.listen(port);

 
 {

 
 // socket.on('disconnect', () => {   console.log('user disconnected')  })
//var ref =db.ref("users/").child("alaah akber");
 // ref.remove()//set({name:'fffffffff',no:11444422})
  /*io.on('connection', socket => { 
  
  db.ref("ambulance/ataa/latlng").on("value", function(snapshot) {
     socket.emit('ambulance', snapshot.val())
   console.log(snapshot.val()) ;

  } );

    
})*/
 }
app.get('/',function(req,res, next){
  var dataa={ title :'ddddddvv'  };
 
  res.json({ title :'ddddddvv'  });
}); 

app.post ('/login', function(req, res) {
  
 // console.log(req.body.user+' fffff '+req.body. password);
 var ref = db.ref("hospital/");
  var Res=301;
  var datas ;

  async.series([
    function(callback){
       ref.once("value", function(snapshot) {
       datas =snapshot.child(req.body.user).val();
       
 
     callback();
     });
       
    },  function(callback){

      if(datas.password){
        console.log(datas.password);
        if(datas.password==req.body. password){
         Res=200;
          console.log(datas.password);
        }else{
          Res=404;
        }
      } 
res.send(Res)
 
    }]);
  
  
    
 // res.redirect('./fontend/src/Request/Request');
 
});

app.get('/api/Request',function(req,res) {
   
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
  
});

app.get('/getAmb',function(req,res) {
   
   var datas;
   async.series([
    function(callback){ 
var amb = db.ref("ambulance/");
  amb.on("value", function(snapshot) {
     //console.log(snapshot.val());
   datas=snapshot.val();

 callback();
  } );
      
    },  function(callback){
      if(datas){

       
     
     res.json([{ title :'ddddddvv'  }])
     } 
      }])

    
 
    
});

io.on('connection', socket => { 
  var amb = db.ref("hospital/Arabi/patient/2019-05-08");
  var amb = db.ref("ambulance");
  
  
  socket.on('Hospital', function(hospital){
    
    amb.on("value", function(snapshot) {
    var amb_Hospital=[];

    snapshot.forEach((function(child) {
      console.log(child.val().latlng)
      if(child.val().destination==hospital)
      amb_Hospital.push(child.val()) 
    }))
    socket.emit('ambulances', amb_Hospital)
    });

  });

  socket.on('amb_Hilal', function(hospital){
    
    var amb = db.ref("ambulance");
    amb.on("value", function(snapshot) { 
    var amb_Hilal=[];

    snapshot.forEach((function(child) {
      if(child.val().stateIn==true)
      amb_Hilal.push(child.val())
      console.log(child.val())
    }))
 
    socket.emit('amb_Hilal', amb_Hilal)
  });


  }); 


})


app.get('/History-patient-hospital',function(req,res, next){
  var History_patient =[];
  
  async.series([
   function(callback){ 

      var amb = db.ref("hospital/Arabi/patient");
      amb.on("value", function(snapshot) {
        
      snapshot.forEach(function(child){
        var Datas_patient =[];
        Object.keys(snapshot.child(child.key).val()).map(key=>{
          Datas_patient.push({'name':key,'datas':snapshot.child(child.key).child(key).val()})
      
        })
       
        History_patient.push({'history':child.key,'patient':Datas_patient} )
        console.log(History_patient)
         //console.log(Array.isArray(Object.keys(snapshot.child(child.key).val()))  )
       // console.log(snapshot.child(child.key).child('ali').child('age').val())

       })

      callback();
      });
     
   },  function(callback){

    //console.log(History_patient);
    if(History_patient)
    res.json(History_patient );
 }])

});
/*
 app.get('/History-patient-hospital',function(req,res, next){
  var History_patient =[];
  async.series([
   function(callback){ 
var amb = db.ref("hospital/Arabi/patient");
 amb.on("value", function(snapshot) {
 
  snapshot.forEach(function(child){
    History_patient.push({'history':child.key})
    
     }
 
  )
callback();
 } );
     
   },  function(callback){
  //    console.log(History_patient);
   if(History_patient)
     console.log(History_patient)
    
  res.json(History_patient);
 }])

});
*/
//يستمع للاضافه 
/*
 var amb = db.ref("ambulance/");
  amb.on("child_added", function(snapshot, prevChildKey) {
    
    console.log( "Author: " + snapshot.key); 
  });
  */