import PostBox from "../../Styles/PostBox";
import ProfilePicture from "../../Styles/ProfilePicture";
import { BsHeart } from "react-icons/bs";
import Microlink from '@microlink/react';
import styled from "styled-components";

export default function PostCard({post}){
    
    

    return(
        <PostBox>
                    <div className="left">
                        <ProfilePicture img = {post.img}/>
                        <BsHeart className="heart"/>
                        <span>{post.likes}</span>
                    </div>
                    <div className="right">
                        <h2>{post.BsHeartname}</h2>
                        <p>{post.description}</p>
                        <Links url={post.url} target="_blank"/>
                    </div>
        </PostBox>
    )
}

const Links = styled(Microlink)`
    max-width: 85%;
`;
