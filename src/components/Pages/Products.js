import React from 'react';
import axios from 'axios';


export default  class  Products  extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            
           product_list : []
        };
    }

    static defaultProps = {
        apiUrl : 'http://localhost/selfy1/'
    };

    componentDidMount = async () =>{
        const data = new FormData();
        data.append('get_posts', 'true');
        data.append('post_type', '10');

        const config2 = {
        method: 'post',
        url: this.props.apiUrl,
        headers:{},
        data : data
        };

       const product_list = await axios(config2)
       const products = [];

        for (let key in product_list.data.data){
            let row = product_list.data.data[key];

            let discount = row.metas.discount,
            price = row.metas.price,
            discount_start_date=new Date(row.metas.discount_start_date),
            discount_end_date=new Date(row.metas.discount_end_date),
            now_date=new Date(),
            calc_discount=(price * (100 - discount)) / 100;
        let has_discount=(discount_start_date <= now_date && discount_end_date >= now_date) ? true : false;
        let new_price=(has_discount) ? calc_discount : null;


            products.push({
                    id : row.id,
                    title : row.title,
                    featured : row.featured,
                    excerpt : row.excerpt,
                    link : '/products/'+row.slug,
                    has_discount : has_discount,
                    discount : discount,
                    price : price,
                    new_price : new_price
                });
            };

            this.setState({
                product_list :  products
            });

    };

    render(){
        const {product_list}=this.state;
        return(
            <div className="main-container">
            <div className="main wrapper clearfix">
                <div className="main-content full">
                	<div className="clearfix">
                		
                		<ul className="product_list full">
                           {
                               product_list.map(product => {
                                return(
                                    <li key={product.id}>
                                <div className="product_img full">
                                    <a href={product.link} title={product.title} className="full full_h">
                                        <div className="compare_and_wish_btn">
                                            {
                                                (product.has_discount) ? <span className="show_discount">{'-' + product.discount + '%'} </span> : null
                                            }
                                            <button type="button" className="add_wish_list active">
                                            <svg  className="first_heart" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" ><path fill="currentColor" d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z" className=""></path></svg>
                                            <svg className="second_heart" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" className=""></path></svg> 
                                            </button>
                                            <button type="button" className="add_compare"><i className="fa fa-exchange"></i></button>
                                            
                                            <button type="button" className="add_cart">
                                                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" ><path fill="currentColor" d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z" className=""></path></svg>
                                            </button>
                                        </div>
                                      
                                  
                                        
                                <img src={product.featured} title={product.title} alt={product.title} className="full full_h"/>
                                    </a>
                                </div>
                                    <a href={product.link}  title={product.title} className="full product_box_bottom">
                                <h4>{product.title}</h4>
                                        {
                                            (product.has_discount) ? <p  className="meta">{product.new_price} &#8380; <del>{product.price}&#8380;</del></p> : <p  className="meta">{product.price}&#8380;</p>
                                        }
                                     </a>
                            </li>
                                )
                               })
                           }
                            </ul>
                           

                	</div>    
                </div>
        	</div> 
        </div> 
           
        )
    }
}
