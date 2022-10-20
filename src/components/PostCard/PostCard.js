import PostBox from "../../Styles/PostBox";
import ProfilePicture from "../../Styles/ProfilePicture";
import { BsHeart } from "react-icons/bs";
import Microlink from '@microlink/react';
import styled from "styled-components";
import { ReactTagify } from 'react-tagify';
import { useNavigate } from 'react-router-dom';


export default function PostCard({ post }) {

    const navigate = useNavigate();

    const tagStyle = {
        fontWeight: 700,
        fontSize: "20px",
        cursor: 'pointer'
    };

    return (
        <PostBox>
            <div className="left">
                <ProfilePicture img={post.img} />
                <BsHeart className="heart" />
                <span>{post.likes}</span>
            </div>
            <div className="right">
                <h2>{post.BsHeartname}</h2>
                <ReactTagify
                    tagStyle={tagStyle}
                    tagClicked={tag => {
                        navigate(`/hashtag/${tag.slice(1)}`);
                    }}
                >
                    <p>{post.description}</p>
                </ReactTagify>
                <Links url={post.url} target="_blank" />
            </div>
        </PostBox>
    )
}

const Links = styled(Microlink)`
    max-width: 85%;
`;
