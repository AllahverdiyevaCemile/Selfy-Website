import React from 'react';
import axios from 'axios';


export default  class  About  extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            
            post_data : []
        };
    }

    static defaultProps = {
        apiUrl : 'http://localhost/selfy1/'
    };

    componentDidMount = async () =>{
        const data = new FormData();
        data.append('get_post', 'true');
        data.append('post_id', '6');

        const config = {
        method: 'post',
        url: this.props.apiUrl,
        headers: {},
        data : data
        };

        const  post_data= await axios(config);

        this.setState({
            post_data : post_data.data
        })
            }

    render(){
        const {post_data}=this.state;
        return(

            <div className="main-container">
            <div className="main wrapper clearfix">
            	
            	            	
            	
                <div className="main-content full">
                	<div className="clearfix">
                		
                	
	                	<img src={post_data.featured} alt={post_data.title}  title={post_data.title}/>
	                	
                        <h1>{post_data.title}</h1>
                        <p className="lead three-fourths">{post_data.excerpt} </p>
                        
                        
                       
                        <div className="clearfix">
                       
                        {post_data.content}
                            
                       
                        </div>
                        </div>    
                </div>				
				

        	</div> 
        </div>
        )
    }
}