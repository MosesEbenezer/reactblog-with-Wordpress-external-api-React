import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { Link } from '@reach/router';
import renderHTML from 'react-render-html';
import '../Style.css';
import Moment from 'react-moment';
import Pagination from './Pagination';


class Home extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {
            loading: false,
            posts: [],
            error: '',
            currentPage: 1,
            setCurrentPage: 1,
            postsPerPage: 6,
        }
    }


    componentDidMount() {
        const wordPressSiteUrl = 'https://epower.ng';
        this.setState( { loading: true }, () => {
            axios.get( `${wordPressSiteUrl}/wp-json/wp/v2/posts` )
            .then( res => {
                this.setState( { loading: false, posts: res.data })
                
            })
            .catch( error => this.setState({loading: false, error: error.response.data.message }))
        } )
    }


    render()  {

        const { posts, loading, error, currentPage, setCurrentPage, postsPerPage } = this.state; 

        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

        const paginate = pageNum => this.setState({ currentPage: pageNum });

        const nextPage = () => this.setState({currentPage: currentPage + 1});

        const prevPage = () => this.setState({currentPage: currentPage - 1});

        return (
            <div>
                <Navbar/>
                    { error && <div className="alert alert-danger"> { error } </div> }
                    { currentPosts.length ? (
                        <div className="mt-5 post-container ml-5">
                            {  currentPosts.map( post => (
                                <div key={ post.slug } className="card border-dark mb-3" style={{ width: '50rem' }}> 
                                    <div className="card-header">
                                        <Link to={`/post/${post.id}`}>
                                            {post.title.rendered}
                                        </Link>
                                    </div>
                                    <div className="card-body">
                                        <div className="card-text post-content">
                                             
                                            <img src={post.featured_image}/>
                                            {renderHTML(post.excerpt.rendered)} 
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <Moment fromNow>{post.date}</Moment>
                                        <Link to={`/post/${post.id}`} className="btn btn-primary float-right">Read More...</Link>
                                    </div>
                                </div>
                            ))}
                            <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage} />
                        </div>
                    ) : '' }
                    { loading && <p>Loading...</p>}                
            </div>
        )
    }
}

export default Home;