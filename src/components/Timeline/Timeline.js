import { useEffect, useState } from "react";
import styled from "styled-components";
import { getPosts } from "../../Common/Service";
import PostForm from "../PostForm/PostForm";
import PostContainer from "../PostsContainer/PostsContainer";

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
            <TimelineTitle>timeline</TimelineTitle>

            <Content>

                <div>
                    <PostForm newPost={newPost} setNewPost={setNewPost} />
                    <PostContainer posts={posts} />
                </div>


                <div>Trending column COMING SOON...</div>


            </Content>
        </Page>

    );
}

const Page = styled.div`
    margin:15vh 15vw;
    display: flex;
    flex-direction: column;
    color: white;
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