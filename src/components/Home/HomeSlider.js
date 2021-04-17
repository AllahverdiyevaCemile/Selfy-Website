import React,{Component} from 'react';
import axios from 'axios';


export default  class  HomeSlider  extends Component{
    constructor(props){
        super(props);

        this.state = {
            sliders : []
        };
    }

    static defaultProps = {
        apiUrl : 'http://localhost/selfy1/'
    };

    componentDidMount = async () =>{

                        /**/
                        const data2 = new FormData();
                        data2.append('get_posts', 'true');
                        data2.append('post_type', '7');

                        const config2 = {
                        method: 'post',
                        url: this.props.apiUrl,
                        headers:{},
                        data : data2
                        };

                       const sliders= await axios(config2)
                        const make_slider =[];
                       for (let key in sliders.data.data){
                                    let row = sliders.data.data[key];
                    
                                    make_slider.push({
                                        id : row.id,
                                        title : row.title,
                                        featured : row.featured,
                                        content : row.content,
                                        excerpt : row.excerpt
                                    });
                                };
                    
                                this.setState({
                                    sliders : make_slider
                                });
                            };
         render(){
        const {sliders} = this.state;
        return( 
                <div className="wrapper clearfix">
                    <div className="cta two-third">
                        {
                            sliders.map(slider => {
                                return(
                                    <div key = {slider.id} className="slider_box" data-image={slider.featured}>
                                   
                                    <h1>{slider.title}</h1> 
                                    <h3>{slider.content}</h3>
                                    <h5>&mdash; Spaceballs</h5>
                                    <br/>
                                    <p>{slider.excerpt}...  <a href="styles.html">Read More</a></p>
                                     
                                     </div>

                                );
                            })
                        }
                       
                    </div>   	   
                
           </div>
    
        )
    }

}
