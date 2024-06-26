const path = require('path')
const db = require(path.join(__dirname,"../db/dbConnect"));
require('dotenv').config();

const loginView = (req,res)=>{
    if (req.session.isLoggedIn) {
        res.redirect("/")
        return;
    }
    res.render('login');
}

const signUpView = (req,res)=>{
    if (req.session.isLoggedIn){
        res.redirect("/");
        return;
    }
    res.render('register');
}

const forgotPassView = (req,res)=>{
    if (req.session.isLoggedIn){
        res.redirect("/");
        return;
    }
    res.render('forgotPass')
}

const productListView = (req,res)=>{
    if (!req.session.isLoggedIn) {
        res.redirect('/login');
        return;
    }
    db.query('SELECT * FROM products', (error, results, fields) => {
        if (error) {
            console.error('Error executing query: ' + error);
            res.send(error);
            return;
        }
        res.render('products',{products:results, isLoggedIn:req.session.isLoggedIn});
    });
}

const productDetailsView=(req,res)=>{
    if(!req.session.isLoggedIn){
        res.redirect('/login');
        return;
    }
    const { productId } = req.params
    db.query(`SELECT * FROM products WHERE id="${productId}"`,(error,results,fields)=>{
        if(error){
            console.log('Error executing query: '+error);
            res.send(error);
            return;
        }
        res.render("productDetails",{product:results[0],isLoggedIn:req.session.isLoggedIn});
    })
}

module.exports = {
    loginView,signUpView,forgotPassView,productListView,productDetailsView
}