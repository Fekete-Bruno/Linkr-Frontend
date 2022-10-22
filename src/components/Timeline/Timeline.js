import { useEffect, useState } from "react";
import styled from "styled-components";
import { getPosts } from "../../Common/Service";
import PostForm from "../PostForm/PostForm";
import PostContainer from "../PostsContainer/PostsContainer";
import SearchBar from "../SearchBar/Search";

export default function Timeline() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState(false);

    useEffect(() => {
        const promise = getPosts();
        promise.then((res => {
            setPosts(res.data);
        }));
    }, [newPost, setPosts]);
    return (
        <Page>

            <div className="searchBar">
                <SearchBar />
            </div>

            <TimelineTitle>timeline</TimelineTitle>

            <Content>

                <div>
                    <PostForm newPost={newPost} setNewPost={setNewPost} />
                    <PostContainer posts={posts} newPost={newPost} setNewPost={setNewPost}/>
                </div>


                <div>Trending column COMING SOON...</div>


            </Content>
        </Page>

    );
}

const Page = styled.div`
    max-width: 100vw;
    margin:15vh 15vw;
    display: flex;
    flex-direction: column;
    color: white;

    .searchBar {
        @media (min-width: 600px) {
            display: none;
        }
    }

    .searchBar {
        margin-bottom: 6vh;
    }
`;

const Content = styled.div`
    display: flex;
    justify-content: space-between;
`;

const TimelineTitle = styled.div`
    margin: 2vh 0;
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    
`;