const express = require("express");
const  app=express();
const port=3000;
const path=require("path");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
const methodOverride=require("method-override");
app.use(methodOverride("_method"));

const { v4: uuidv4 } = require('uuid');
// ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

let posts=[
    {   
        id:uuidv4(),
        username:"Riya",
        content:"This is my most fav quote I wanna share with y'all... Where there’s a will, there’s a way.",
    },
    {
        id:uuidv4(),
        username:"Rohan",
        content:"If you want to lift yourself up, lift up someone else.’ – Booker T. Washington"
    },
    {   
        id:uuidv4(),
        username:"Saanvi",
        content:"Sharing this because it’s so true! ‘Do what you feel in your heart to be right – for you’ll be criticized anyway.’ – Eleanor Roosevelt"
    },
    {
        id:uuidv4(),
        username:"Aarav",
        content:"Success is not final, failure is not fatal: it is the courage to continue that counts. – Winston Churchill"
   
    }
];

app.get("/posts",(req,res)=>{
    res.render("index",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});


app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
   res.redirect("/posts");
});

//SHOW
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});
});


//UPDATE-fully back work
app.patch("/posts/:id",(req,res)=>{   //patch -to update specific post
    let {id}=req.params;              //taking the id that user entered
    let newContent=req.body.content;    //taking the content entered by user from request body 
    let post=posts.find((p)=>id===p.id);  //find the specific post in array that matches id of current user
    post.content=newContent;            //uploading newContent
  res.redirect("/posts");
});


//EDIT-user edits
app.get("/posts/:id/edit",(req,res)=>{   //will go on this url
let {id}=req.params;                    
let post=posts.find((p)=>id===p.id);       //will take id n specific post and go to edit.ejs
res.render("edit.ejs",{post});          
});

app.delete("/posts/:id",(req,res)=>{  
    let {id}=req.params;
     posts=posts.filter((p)=>id!==p.id);
     res.redirect("/posts");
    });

app.listen(3000,()=>{
    console.log(`listening to port ${port}`);
});





