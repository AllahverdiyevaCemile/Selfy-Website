import  React,{Component} from 'react';
import axios from 'axios';
import FormData from 'form-data';


export default class  Index extends Component{
    constructor(props){
        super(props);

        this.state = {
            
            home_boxes : []
        };

        
    }

    static defaultProps = {
        apiUrl : 'http://localhost/selfy1/'
    };

    componentDidMount = async () =>{
        const data = new FormData();
                        data.append('get_posts', 'true');
                        data.append('post_type', '12');

                        const config = {
                        method: 'post',
                        url: this.props.apiUrl,
                        headers:{},
                        data : data
                        };

                       const home_boxes= await axios(config)
                        const makeHomeBoxes =[];
                       for (let key in home_boxes.data.data){
                                    let row = home_boxes.data.data[key];
                    
                                    makeHomeBoxes.push({
                                        id : row.id,
                                        title : row.title,
                                        content : row.content
                                        
                                    });
                                };
                    
                                this.setState({
                                  home_boxes : makeHomeBoxes
                                })
                            }
    
        render(){
            const {home_boxes} = this.state;
            return(
            <div className="main-container">
            <div className="main wrapper clearfix">
    
                    
    
            <div className="main-content full">
                <div className="clearfix">
                    
                
                    <div className="clearfix">
                    {
                    home_boxes.map((box,index) =>{
                    return(
                    <div key={index} className={(index===home_boxes.length - 1) ? 'third last' : 'third'}>	
                        <h2>{box.title}</h2>
                        {box.content}
                        {
                            (index===home_boxes.length - 1) ? <p><a href="/contact" className="more">Say hi,Email me </a></p> : null
                            
                        }

                        
                    </div>
                            )
                        })
                    }
                                            

                    </div>
            
                                                            
        
        </div>    
    </div>
    
                        
                        
        
                    </div>
                </div>
            )
        }
   
}