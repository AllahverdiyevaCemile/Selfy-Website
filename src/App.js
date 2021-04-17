import React,{Component} from 'react';
import {Route,Link,BrowserRouter as Router} from 'react-router-dom';



// home page
 import Index from "./components/Home/Index";

// general component
import Header from "./components/General/Header";
import Footer from "./components/General/Footer";

//pages

import About from "./components/Pages/About";
import Products from "./components/Pages/Products";
import Blog from "./components/Pages/Blog";
import Contact from "./components/Pages/Contact";

// //posts

import SingleBlog from "./components/Posts/Blog";
import SingleProduct from "./components/Posts/Product";




export default class  App extends Component{
   render(){
      return(
         <div>
           <Header/>
           <Router>
              <div>
                 <Route path="/" exact component={Index}/> 
                 {/* deafult sehife-Index sehifesdir */}
                 <Route path="/about" exact component={About}/>
                 
                 <Route path="/products" exact component={Products}/>
                 <Route path="/products/:slug" exact component={SingleProduct}/> 
                
                 <Route path="/blog" exact component={Blog}/> 
                 <Route path="/blog/:slug" exact component={SingleBlog}/>
  
  
                 <Route path="/contact" exact component={Contact}/>   
  
              </div>
           </Router> 
           
           <Footer/>
           
  
           </div>
        )
   }

      

   
}


