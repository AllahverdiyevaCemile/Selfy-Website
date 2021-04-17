import React, {Component} from 'react';
import axios from 'axios';
import FormData from 'form-data';

export default class Contact extends Component{

    constructor(props) {
        super(props);

        this.state = {
            title : '',
            content : '',
            email : '',
            showErrorMessage : false,
            successMessage : '',
            showSuccessMessage : false,
            post_data: []
        };
    }

    static defaultProps = {
        apiUrl : 'http://localhost/selfy1/'
    };

    componentDidMount = async () => {

        const data = new FormData();
            data.append('get_post', 'true');
            data.append('post_id', 9);

        const config = {
            method: 'post',
            url: this.props.apiUrl,
            headers: {},
            data : data
        };

        const post_data = await axios(config);

        this.setState({
            post_data : post_data.data
        });
    };

    updateState =  (e) => {

        const {value, name} = e.target;

        this.setState({
           [name]  : value
        });
    };

    sendMessage = async (e) => {
        e.preventDefault();

        const {title, content, email} = this.state;

        this.setState({
            showErrorMessage : true,
            showSuccessMessage : false
        });



        if (title && content && email){

            const data = new FormData();
                data.append('contact_form', 'true');
                data.append('title', title);
                data.append('content', content);
                data.append('meta[1]', email);

            const config = {
                method: 'post',
                url: this.props.apiUrl,
                headers: {},
                data : data
            };

            const successMessage = await axios(config);


            this.setState({
                title : '',
                content : '',
                email : '',
                showErrorMessage : false,
                showSuccessMessage : true,
                successMessage : successMessage.data.message
            });


            setTimeout(() => {
                this.setState({
                    showSuccessMessage : false,
                    successMessage : ''
                })
            }, 3000);

        }


        return false;
    };

    render() {
        const {title, content, email, showErrorMessage, successMessage, showSuccessMessage, post_data} = this.state;

        return(
            <div className="main-container">
                <div className="main wrapper clearfix">


                    <div className="main-content">
                        <div className="clearfix">

                            <h1>{post_data.title}</h1>
                            <p className="lead">{post_data.content}</p>

                            <p className="">{post_data.excerpt}</p>


                            <form id="contactform" onSubmit={this.sendMessage} action="" method="post">
                                <table width="100%" className="tableless">
                                    <tbody>
                                        <tr>
                                            <td>
                                                {
                                                    showErrorMessage && !title ? <span>Adiniz daxil edin</span> : null
                                                }
                                                <input type="text" id="name" value={title} onChange={this.updateState} name="title" placeholder="What's your name" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                {
                                                    showErrorMessage && !email ? <span>Emailiniz daxil edin</span> : null
                                                }
                                                <input type="email" value={email} id="email" name="email" onChange={this.updateState} placeholder="Email goes here"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                {
                                                    showErrorMessage && !content ? <span>Mesajinizi daxil edin</span> : null
                                                }
                                                <textarea id="message" name="content" onChange={this.updateState} value={content} rows="5" cols="20" placeholder="Whats this about?"></textarea>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <input name="button" className="btn" type="submit" value="Send Message" id="send"/><br/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                {
                                                    showSuccessMessage ? <p>{successMessage}</p> : null
                                                }
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                            <div id="response"></div>


                        </div>
                    </div>


                    <aside className="right-aside">
                        <h2>Networks</h2>
                        <ul>
                            <li><a href="post.html">Follow Me on Facebook</a></li>
                            <li><a href="post.html">Hanging out on Dribbble</a></li>
                            <li><a href="post.html">Tweeting up a storm</a></li>
                        </ul>

                        <hr className="dots"/>


                        <p><em>Vestibulum id ligula porta felis euismod semper. Maecenas sed diam eget risus varius
                            blandit sit ametr nulla non metus auctor fringilla.</em></p>
                        <p><a className="more" href="styles.html">See the Full Theme Styles</a></p>

                    </aside>


                </div>
            </div>
        );
    }
}