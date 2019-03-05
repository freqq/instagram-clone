import React, {Component} from 'react'
import './Posts.css'
import {connect} from 'react-redux';
import {fetchPosts, clearPosts} from '../../../actions/postActions';
import PropTypes from 'prop-types';
import Post from './post/Post'
import SmallFooter from '../footer/SmallFooter'
import InfiniteScroll from 'react-infinite-scroller';

class Posts extends Component {
    state = {
        hasMore: false,
        page: 0,
        size: 5
    }

    componentWillUnmount() {
        this
            .props
            .clearPosts()
    }

    componentDidMount() {
        const {size, page} = this.state
        this
            .props
            .fetchPosts(size, page);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.posts){
            console.log(nextProps.posts)
        }
        if(nextProps.hasMore){
            this.setState({hasMore: nextProps.hasMore})
        }
        if (nextProps.newPost) {
            this
                .props
                .posts
                .unshift(nextProps.newPost);
        }
    }

    loadMore = () => {
        const {size, page} = this.state
        this.setState({ page: this.state.page + 1 });
        this
            .props
            .fetchPosts(size, page);
    }

    render() {
        const postItems = this
        .props
        .posts
        .map(post => (<Post key={post.id} post={post}/>))

        if (this.props.posts.length === 0) {
                return (
                    <div className="no-following">
                        Nikt z osob ktore obserwujesz, nie dodal jeszcze <span className="bold">zadnego posta</span> lub <span className="bold">nikogo nie obserwujesz.</span> 
                    </div>
                )
            } else {
                return (
                    <div>
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={this.loadMore}
                            hasMore={this.state.hasMore}
                            loader={< div className = "loader" key = {
                            0
                        } > Loading ...</div>}>
                            {postItems}
                        </InfiniteScroll>
                        <SmallFooter/>
                    </div>

                )
            }
        }
    }
    Posts.propTypes = {
        fetchPosts: PropTypes.func.isRequired,
        clearPosts: PropTypes.func.isRequired,
        posts: PropTypes.array.isRequired,
        newPost: PropTypes.object,
        hasMore: PropTypes.bool
    }

    const mapStateToProps = state => ({posts: state.posts.items, newPost: state.posts.item, hasMore: state.posts.hasMore})
    export default connect(mapStateToProps, {fetchPosts, clearPosts})(Posts)