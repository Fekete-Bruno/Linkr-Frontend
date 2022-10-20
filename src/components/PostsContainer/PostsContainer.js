import { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import styled from "styled-components";
import { getPosts } from "../../Common/Service";
import PostCard from "../PostCard/PostCard";

export default function PostContainer(){
    const [posts,setPosts] = useState([]);
    useEffect(() => {
        const promise = getPosts();
        promise.then((res => {
            setPosts(res.data);
        }));
    }, [setPosts]);
    console.log(posts);
    
    return(
        <Wrapper>
            {posts.length===0?
            <ThreeCircles color="white" />:
            posts.map((post)=>{
                return(<PostCard post={post} />);
                })}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    div{
        margin: 2vh;
    }
`;