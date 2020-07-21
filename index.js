const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// middleware
// app.use(function(req, res, next){
//    req.myName = "Suvendu";
//   // console.log('middleware 1 called');
//    next();
// });

// middleware 2
// app.use(function(req, res, next){
//     console.log("My name from MW2", req.myName);
//    // console.log('middleware 2 called');
//     next();
// });

var contactList = [
   {
       name: "Suvendu",
       phone: "9547332282"
   },

   {
       name: "BatMan",
       phone: "9874783447"
   },

   {
      name: "Black Panther",
      phone: "7583747951"
   }

]

app.get('/', function(req, res){
   // console.log('From the get route controller', req.myName)
  
   Contact.find({}, function(err, contacts){
       if(err){
           console.log('Error in fetching contacts from db');
           return;
       }
       return res.render('home',{
        title: "Contacts List",
        contact_list: contacts
       });
   });
    
});

app.get('/practice', function(req, res){
    return res.render('practice',{
       title: "Let us play with ejs"
    });
});

app.post('/create-contact', function(req, res){
//    contactList.push({
//        name: req.body.name,
//        phone:req.body.phone
//    });

//contactList.push(req.body);

     Contact.create({
         name:req.body.name,
         phone:req.body.phone
     }, function(err,newContact){
         if(err){
             console.log('error in creating a contact!');
             return;
            }
            console.log('********', newContact);
            return res.redirect('back');
     });

});

//for deleting a contact
app.get('/delete-contact', function(req, res){
    // get the id from query in the url
    let id = req.query.id;

    // find the contact in the database using id and delete
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }
        return res.redirect('back');
    });

});

app.listen(port, function(err){
   if(err){
       console.log('Error!', err);
   }

   console.log('Yup myExpress is running on port:', port);
});