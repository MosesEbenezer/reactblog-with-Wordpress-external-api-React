import React from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import renderHTML from 'react-render-html';
import '../Style.css';
import Moment from 'react-moment';


class Post extends React.Component {

    constructor( props ) {
        super( props );
    
        this.state = {
            loading: false,
            post: {},
            error: ''
        }
    }

    componentDidMount() {
        const wordPressSiteUrl = 'https://epower.ng';
        this.setState( { loading: true }, () => {
            axios.get( `${wordPressSiteUrl}/wp-json/wp/v2/posts/${this.props.id}` )
            .then( res => {
                this.setState( { loading: false, post: res.data })
                
            })
            .catch( error => this.setState({loading: false, error: error.response.data.message }))
        } )
    }

    render() {

        const { post, error, loading } = this.state;

        return(
             <div>

            <Navbar/>
                 { error && <div className="alert alert-danger"> { error } </div> }
                    { Object.keys(post).length ? (
                        <div className="mt-5 post-container ml-5">
                                <div key={ post.id } className="card border-dark mb-3" style={{ width: '50rem' }}> 
                                    <div className="card-header">
                                        {post.title.rendered}
                                    </div>
                                    <div className="card-body">
                                        <div className="card-text post-content">
                                            {/* {post.content.rendered}  */}
                                            {renderHTML(post.content.rendered)} 
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <Moment fromNow>{post.date}</Moment>
                                    </div>
                                </div>
                        </div>
                    ) : '' }
             </div>
        )
    }

}

export default Post;