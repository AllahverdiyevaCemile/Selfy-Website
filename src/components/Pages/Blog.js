import React from 'react';
import axios from 'axios';
// import { Route } from 'react-router';


export default  class  Blog  extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            
            news_list : [],
            translate_list : []
        };
    }

    static defaultProps = {
        apiUrl : 'http://localhost/selfy1/'
    };


    componentDidMount = async () =>{

        const data2 = new FormData();
        data2.append('get_translate', 'true');
       

        const config = {
        method: 'post',
        url: this.props.apiUrl,
        headers:{},
        data : data2
        };

       const translate_list = await axios(config);

      this.setState({
        translate_list : translate_list.data
      });

      const month=translate_list.data.month_list.split(',');


    

        /**/       
        const data = new FormData();
        data.append('get_posts', 'true');
        data.append('post_type', '8');

        const config2 = {
        method: 'post',
        url: this.props.apiUrl,
        headers:{},
        data : data
        };

       const news_list = await axios(config2)
        const makeBlog = [];
       for (let key in news_list.data.data){
                let row = news_list.data.data[key];
                let date=row.date.split(' ');
                let date_2=date[0].split('-');

                let month_index=parseInt(date_2[1] - 1);
    
                    makeBlog.push({
                        id : row.id,
                        title : row.title,
                        featured : row.featured,
                        excerpt : row.excerpt,
                        date : date_2[2] + ' ' + month[month_index] + ' ' + date_2[0],
                        link : '/blog/'+row.slug
                    });
                };
    
                this.setState({
                    news_list : makeBlog
                });

            }

               
  


    render(){

        const {news_list}=this.state;
        
       
        return(

    <div className="main-container">
    <div className="main wrapper clearfix">
          <div className="main-content full">
            <div className="clearfix">
            {
                news_list.map( news =>{
                return(
                <div className="clearfix"  key={news.id}>
                <div className="third">
                <h2><a href="post.html">{news.title}</a></h2>
                <h6 className="meta">Posted on {news.date}</h6>
                <p>{news.excerpt}</p>
                    <p><a href={news.link} className="more" title={news.title}>Read More</a></p>
                </div>
                
                <div className="two-third last">
                    <a href={news.link} title={news.title}><img src={news.featured}  title={news.title} alt={news.title} /></a>
                </div>
                <hr/>
            </div>
                );
            
                })
            }
                		
                		
                		
                		

                	</div>    
                </div>
				
			

        	</div> 
        </div> 
        )
    }
}

