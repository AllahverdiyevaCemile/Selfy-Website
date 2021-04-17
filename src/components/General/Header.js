import React,{Component} from 'react';
import axios from 'axios';
import HomeSlider from '../Home/HomeSlider';
import {Route,BrowserRouter as Router} from 'react-router-dom';

export default  class  Header  extends Component{
    constructor(props){
        super(props);

        this.state = {
            
            menus : [],
            pathName : window.location.pathname
            
        };
    }

    static defaultProps = {
        apiUrl : 'http://localhost/selfy1/'
    };

    componentDidMount = async () =>{

        /**/
        const FormData = require('form-data');
        const data = new FormData();
        data.append('get_menus', 'true');
        data.append('menu_type', '1');

            const config = {
            method: 'post',
            url: this.props.apiUrl,
            headers: {},
            data : data
            };

            const menus = await axios(config);
            const make_menus = [];

            for(let key in menus.data){
                        let row=menus.data[key];
                         make_menus.push({
                                id : row.id,
                                title : row.title,
                                link : row.link,
                                content : row.content
                            });
                        }
            
                        this.setState({
                            menus : make_menus
                        });

                        
                            };
         render(){
        const {menus,pathName} = this.state;
        return(
            <div className="header-container" id={(pathName==='/') ? 'masthead' : '' }>
                <header className="wrapper clearfix">
                    <a href="index.html" className="logo"><img src="/assets/img/logo@2x.png" alt="Logo" /></a>
                    <nav>
                           <ul className="nav" id="nav">
                               {
                                   menus.map( menu => {
                                       return(
                                       <li key = {menu.id}><a href={menu.content} title={menu.title}>{menu.title}</a></li>
                                       )
                                   })
                                  
                               }
                           
                        </ul>                	
                    </nav>
                </header>
                    <Router>
                        <div>
                        <Route path="/" exact component={HomeSlider}/>
                        </div>
                    </Router>
                
               
                </div>
        )
    }

}