import { useEffect, useState } from "react";
import { BiRefresh } from "react-icons/bi";
import useInterval from "react-useinterval";
import styled from "styled-components";
import PostForm from "../components/PostForm/PostForm";
import PostContainer from "../components/PostsContainer/PostsContainer";
import SearchBar from "../components/SearchBar/Search";
import Trending from '../components/Trending/Trending';
import InfiniteScroll from "react-infinite-scroller";
import { ThreeCircles } from "react-loader-spinner";
import { getPostPage } from "./Service";

export default function Feed({ type, name, get, newPost, setNewPost, follows }) {
    
    const [posts, setPosts] = useState([]);
    const [updatePosts,setUpdatePosts] = useState([]);
    const [page,setPage] = useState(2);
    const [hasMore,setHasMore] = useState(true);

    useEffect(()=>{
        if(type==="hashtag"){
            setHasMore(false);
        }
    },[setHasMore]);

    useEffect(getStartPosts, [newPost, setPosts]);

    function getStartPosts(){
        const promise = get(name);
        promise.then((res => {
            setPosts(res.data);
        })).catch(()=>{
            alert("An error occured while trying to fetch the posts, please refresh the page");
        });
    }

    function addPages(){
        if(hasMore){
            getPostPage(page).then(res=>{    
                setPosts(res.data);
                setPage(page+1);
                if(res.data.length===posts.length){
                    setHasMore(false);
                }
            }).catch((error)=>{
                console.error(error);
            });
        }
    }

    function getNewPosts(){
        const promise = get(name);
        promise.then((res => {
            let oldPostsIds = posts.map(post => post.postId);
            setUpdatePosts(res.data.filter((post)=>{
                return !oldPostsIds.includes(post.postId)
              }));
        })).catch((error)=>{
            console.error(error);
        });
    }

    function addNewPosts(){
        console.log('Add new posts...');
        const temp = [...updatePosts,...posts];
        setUpdatePosts([]);
        setPosts([...temp]);
    }

    const UPDATE_TIMER = 15000;
    useInterval(getNewPosts,UPDATE_TIMER);
    
    return (
        <Page>

            <div className="searchBar">
                <SearchBar />
            </div>

            <FeedTitle>
                {type === "hashtag" ? `# ${name}` : `timeline`}
            </FeedTitle>

            <Content>

                <div>
                    {type === "hashtag" ? 
                        ""
                        :
                        <PostForm newPost={newPost} setNewPost={setNewPost} />
                    }
                    {
                        updatePosts.length===0 ? "" :
                        <UpdatePostsButton onClick={addNewPosts}>{updatePosts.length} new posts, load more! <Refresh /></UpdatePostsButton>
                    }
                    {
                        posts.length === 0 ? 
                        <Message>
                            {follows.length === 0 ? 
                            "You don't follow anyone yet. Search for new friends! 😊": 
                            "No posts found from your friends 😞"}
                        </Message> :
                        <InfiniteScroll
                            loadMore={addPages}
                            loader={hasMore?<Loader><ThreeCircles color="white"/></Loader>:""}
                            hasMore={hasMore}
                        >
                            <PostContainer posts={posts} newPost={newPost} setNewPost={setNewPost} />
                        </InfiniteScroll>
                    }
                </div>


                <div className="trending">
                    <Trending />
                </div>


            </Content>
        </Page>

    );
}

const Loader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Page = styled.div`
    max-width: 100vw;
    margin:15vh 15vw;
    display: flex;
    flex-direction: column;
    color: white;

    @media (max-width: 800px) {
        margin: 15vh 0;
    }

    .searchBar {
        margin-bottom: 6vh;
        @media (min-width: 600px) {
            display: none;
        }
    }
`;

const Message = styled.div`
  width: 661px;
  padding: 40px;
  font-family: "Lato";
  font-style: normal;
  font-size: 30px;
  font-weight: 500;
  line-height: 35px;
  color: #ffffff;
  opacity: 0.9;
  
  @media (max-width: 600px) {
    width: 98vw;
    padding: 2vw;
  }
`;

const Content = styled.div`
    display: flex;
    justify-content: space-between;

    .trending {
        margin-left:25px;

        @media (max-width: 800px) {
            display: none;
        }
    }
`;

const FeedTitle = styled.div`
    margin: 2vh 0;
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;

    @media (max-width: 800px) {
        margin: 2vh 2vh;
    }
    
`;

const UpdatePostsButton = styled.div`
    background-color: rgb(46,132,243);
    margin: 2vh;
    height:6vh;
    font-size: 2vh;
    border-radius: 12px;
    font-weight: bold;
    font-family: 'Oswald';
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover{
        cursor: pointer;
        opacity: 0.9;
    }

    &:active{
        transform: translateY(3px);
    }
`;

const Refresh = styled(BiRefresh)`
    font-size:3vh;
    margin: 1vh;
`;