import React,{Component} from 'react';
import axios from 'axios';



export default  class  Blog  extends Component{
    constructor(props){
        super(props);

        this.state = {
         post_slug : this.props.match.params.slug,
         blog_data : [],
         translate_list : [],
         post_date : '',
         latest_blog : []
        };
    }

    static defaultProps = {
        apiUrl : 'http://localhost/selfy1/'
    };

    componentDidMount = async () =>{
        const data2 = new FormData();
        data2.append('get_translate', 'true');
       

        const config2 = {
        method: 'post',
        url: this.props.apiUrl,
        headers:{},
        data : data2
        };

       const translate_list = await axios(config2);

      this.setState({
        translate_list : translate_list.data
      });

  

        /**/
        const data= new FormData();
        data.append('get_post_by_slug', 'true');
        data.append('slug', this.state.post_slug);
       

        const config = {
        method: 'post',
        url: this.props.apiUrl,
        headers:{},
        data : data
        };

        const blog_data = await axios(config);

        this.setState({
            blog_data : blog_data.data
        })

       
              const date=blog_data.data.date.split(' ');
              const date_2=date[0].split('-');
      
              console.log(translate_list.month_list);
      
              const month=translate_list.data.month_list.split(',');
      
              let month_index=parseInt(date_2[1] - 1);
              
          
        this.setState({
            post_date : date_2[2] + ' ' + month[month_index] + ' ' + date_2[0]
        });

        /**/
        const data3 = new FormData();
        data3.append('get_posts', 'true');
        data3.append('post_type', '8');

        const config3 = {
        method: 'post',
        url: this.props.apiUrl,
        headers:{},
        data : data3
        };

       const news_list = await axios(config3)
        const makeBlog = [];
       for (let key in news_list.data.data){
                let row = news_list.data.data[key];
            
                if(this.state.post_slug === row.slug){continue;} /*latest post*/
        
                    makeBlog.push({
                        id : row.id,
                        title : row.title,
                        link : '/blog/'+row.slug
                    });
                };
    
                this.setState({
                    latest_blog : makeBlog
                });

            
    };

    

    render(){

        const {post_slug,blog_data,translate_list,post_date,latest_blog}=this.state;
        
      
        return(
            <div className="main-container">
            <div className="main wrapper clearfix">
            	
                <div className="main-content">
                	<div className="clearfix">
                		
                         <h2>{blog_data.title}</h2>
                		<h6 className="meta">Posted on {post_date} </h6>
                		
                		<img src={blog_data.featured} alt={blog_data.title} />
                		
                      <p className="lead">{blog_data.excerpt}</p>
                		
                		
                    <p>{blog_data.content}</p>
                		
                		<p><a href="/blog" className="more">Back to Blog</a></p>		
                			                                   
				
                	</div>    
                </div>
				
			
				<aside className="right-aside">
				    <h2>Latest Posts</h2>
				    <ul>
                        {
                            latest_blog.map(news => {

                                return(	   
                           <li key={news.id}><a href={news.link} title={news.title}>{news.title}</a></li>

                                );
                                
                            })
                        }
				    </ul>
				   
				   <hr className="dots"/> 
				   
				   
                    <p><em>{translate_list.blog_single_page_disc}</em></p>
				    
				    	
				</aside>
				
				

        	</div> 
        </div> 
       
        )
    }
}
