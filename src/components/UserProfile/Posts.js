import styled from "styled-components";
import { BsHeart } from 'react-icons/bs';
import Microlink from '@microlink/react';

export default function Posts ({posts, img, name}) {
    console.log(posts)
    return (
        <>
            {posts.length === 0 ? (
                <Message>This user has no links to share yet 😞</Message>
            ):(
                <>
                    {posts.map((post) => (
                        <PostBox>
                            <div className="left">
                                <ProfilePicture img = {img}/>
                                <BsHeart className="heart"/>
                                <span>{post.likes}</span>
                            </div>
                            <div className="right">
                                <h2>{name}</h2>
                                <p>{post.description}</p>
                                <Links url={post.url} target="_blank"/>
                            </div>
                        </PostBox>
                    ))}
                </>
            )}
            
        </>
    )
};

const PostBox = styled.div`
    width: 611px;
    height: 276px;
    padding: 20px;
    margin-bottom: 16px;
    display: flex;
    background: #171717;
    border-radius: 16px;

    font-family: 'Lato';
    font-style: normal;
    color: #FFFFFF;

    h2, p {
        font-size: 20px;
        line-height: 23px;
        word-wrap: break-word;
    }

    p {
        opacity: .7;
        line-height: 2em;
    }

    span {
        font-size: 15px;
    }

    div {
        display: flex;
        flex-direction: column;
    }

    .heart {
        font-size: 25px;
        color: #fff;
        margin-top: 20px;
        margin-bottom: 5px;
        cursor: pointer;
    }

    .left {
        align-items: center;
    }

    .right {
        padding-left: 20px;
    }
`
const ProfilePicture = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: red;
    background-size: cover;
    background-position: center;
    background-image: ${props => `url(${props.img})`};
`

const Message = styled.div`
    width: 661px;
    padding: 40px;
    font-family: 'Lato';
    font-style: normal;
    font-size: 30px;
    font-weight: 500;
    color: #FFFFFF;
    opacity: .9;
`
const Links = styled(Microlink)`
    max-width: 85%;
`;