import React from 'react';
import axios from 'axios';


export default  class  Product  extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            
            post_slug : this.props.match.params.slug,
            product_data : [],
            images : [],
            has_discount : false,
            discount : 0,
            price : 0,
            new_price : 0
        };
    }

    static defaultProps = {
        apiUrl : 'http://localhost/selfy1/'
    };

    componentDidMount = async () =>{
        const data= new FormData();
        data.append('get_post_by_slug', 'true');
        data.append('slug', this.state.post_slug);
       

        const config = {
        method: 'post',
        url: this.props.apiUrl,
        headers:{},
        data : data
        };

        const  product_data = await axios(config);
        const productData = product_data.data;

        this.setState({
            product_data : productData
        })

        const images=[];

       

        for(let key in   productData.metas.images){
            let row= productData.metas.images[key];

            

            images.push(row);

        }

        let discount = productData.metas.discount,
            price = productData.metas.price,
            discount_start_date=new Date(productData.metas.discount_start_date),
            discount_end_date=new Date(productData.metas.discount_end_date),
            now_date=new Date(),
            calc_discount=(price * (100 - discount)) / 100;
        let has_discount=(discount_start_date <= now_date && discount_end_date >= now_date) ? true : false;
        let new_price=(has_discount) ? calc_discount : null;

        this.setState({
           images :  images,
           has_discount : has_discount,
           discount : discount,
           price : price,
           new_price : new_price
        });


    }

    render(){
        const {product_data,images, has_discount,discount,price,new_price} = this.state;
        console.log(images);

        return(
           
 <div class="main-container">
    <div class=" product_single_main wrapper clearfix">
    <div class=" full">
    <div class="clearfix">

    <div class="full product_single_sides_box">
        <div class="product_single_sides product_single_left">
            <div class="product_images_box">
                
                    <ul class="full product_images">
                        {
                            images.map(image =>{
                                return(
                                    <li>
                                    <a data-fancybox="gallery" href={image} title={product_data.title} >
                                        <img src={image} title={product_data.title} alt={product_data.title} />
                                    </a>
                                </li>
                                )
                            })
                        }
                        
                    </ul>
            </div>
            <div class="product_single_big_photo">
                <a href={product_data.featured} data-fancybox="gallery" title={product_data.title}>
                <img src={product_data.featured}  title={product_data.title} alt={product_data.title}/>
                </a>
                    
                </div>

        </div>
        <div class="product_single_sides product_single_right">
        <h1>{product_data.title}</h1>
           {
               (has_discount) ?  <p class="product_single_price">{new_price} &#8380; <del>{price} &#8380;</del></p> :  <p class="product_single_price">{price} &#8380;</p>
           }
        <p  class="product_single_excerpt">{product_data.excerpt}</p>

     <ul class="full product_in_compare_btn">
         <li>
                <input type="number" min="1" max="99" class="product_add_cart_qty" value="1"/>

                <button type="button" class="add_cart">
                  <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" ><path fill="currentColor" d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z" class=""></path></svg>
                    <span>Add to cart</span>
                </button>

            </li>
            <li>
                <button type="button" class="add_wish_list">
                    <svg  class="first_heart" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-heart fa-w-16 fa-2x"><path fill="currentColor" d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z" class=""></path></svg>
                    <svg class="second_heart" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" class=""></path></svg> 
                    <span>Add to wishlist</span>
                </button>
            </li>
            <li>
                <button  type="button" class="add_compare"><i class="fa fa-exchange"></i>
                    <span>Compare</span>
                </button>
               
            </li>
               
            </ul>

        </div>
    
    </div>
    <div class="full product_general_inf">
        <h3>{product_data.title}</h3>
        <p>{product_data.content}</p>
    </div>
    <div class="full similar_products">
        <h3>Similar Products</h3>
        <ul class="product_list full">
            <li>
                <div class="product_img full">
                    <a href="#" class="full full_h">
                        <div class="compare_and_wish_btn">
                            <button type="button" class="add_wish_list">
                            <svg  class="first_heart" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-heart fa-w-16 fa-2x"><path fill="currentColor" d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z" class=""></path></svg>
                            <svg class="second_heart" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" class=""></path></svg> 
                            </button>
                            <button type="button" class="add_compare"><i class="fa fa-exchange"></i></button>
                            
                            <button type="button" class="add_cart">
                                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" ><path fill="currentColor" d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z" class=""></path></svg>
                            </button>
                        </div>
                      
                  
                        
                <img src="img/mock2.jpg" class="full full_h"/>
                    </a>
                </div>
                    <a href="#" class="full product_box_bottom">
                        <h2>Məhsul adı</h2>
                        <p  class="meta">500$ <del>600$</del></p>

                    </a>
                  
                
            </li>
            <li>
                <div class="product_img full">
                    <a href="#" class="full full_h">
                        <div class="compare_and_wish_btn">
                            <button type="button" class="add_wish_list">
                            <svg  class="first_heart" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-heart fa-w-16 fa-2x"><path fill="currentColor" d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z" class=""></path></svg>
                            <svg class="second_heart" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" class=""></path></svg> 
                            </button>
                            <button type="button" class="add_compare"><i class="fa fa-exchange"></i></button>
                            
                            <button type="button" class="add_cart">
                                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" ><path fill="currentColor" d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z" class=""></path></svg>
                            </button>
                        </div>
                      
                <img src="img/mock2.jpg" class="full full_h"/>
                    </a>
                </div>
                    <a href="#" class="full product_box_bottom">
                        <h2>Məhsul adı</h2>
                        <p  class="meta">500$ <del>600$</del></p>

                    </a>
                  
                
            </li>
            <li>
                <div class="product_img full">
                    <a href="#" class="full full_h">
                        <div class="compare_and_wish_btn">
                            <button type="button" class="add_wish_list">
                            <svg  class="first_heart" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-heart fa-w-16 fa-2x"><path fill="currentColor" d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z" class=""></path></svg>
                            <svg class="second_heart" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" class=""></path></svg> 
                            </button>
                            <button type="button" class="add_compare"><i class="fa fa-exchange"></i></button>
                            
                            <button type="button" class="add_cart">
                                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" ><path fill="currentColor" d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z" class=""></path></svg>
                            </button>
                        </div>
                      
                <img src="img/mock2.jpg" class="full full_h"/>
                    </a>
                </div>
                    <a href="#" class="full product_box_bottom">
                        <h2>Məhsul adı</h2>
                        <p  class="meta">500$ <del>600$</del></p>

                    </a>
                  
                
            </li>
            <li>
                <div class="product_img full">
                    <a href="#" class="full full_h">
                        <div class="compare_and_wish_btn">
                            <button type="button" class="add_wish_list">
                            <svg  class="first_heart" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-heart fa-w-16 fa-2x"><path fill="currentColor" d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z" class=""></path></svg>
                            <svg class="second_heart" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" class=""></path></svg> 
                            </button>
                            <button type="button" class="add_compare"><i class="fa fa-exchange"></i></button>
                            
                            <button type="button" class="add_cart">
                                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" ><path fill="currentColor" d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z" class=""></path></svg>
                            </button>
                        </div>
                      
                <img src="img/mock2.jpg" class="full full_h"/>
                    </a>
                </div>
                    <a href="#" class="full product_box_bottom">
                        <h2>Məhsul adı</h2>
                        <p  class="meta">500$ <del>600$</del></p>

                    </a>
                  
                
            </li>
            
        </ul>
    </div>
    </div>    
    </div>

    </div>
    </div>
           
        );
    }

}