import styled from "styled-components";
import { BsHeart } from "react-icons/bs";
import { HiTrash, HiPencil } from "react-icons/hi";
import Microlink from "@microlink/react";

export default function Posts({ posts, img, name, editClick, delClick }) {
  console.log(posts);
  return (
    <>
      {posts.length === 0 ? (
        <Message>This user has no links to share yet 😞</Message>
      ) : (
        <>
          {posts.map((post) => (
            <PostBox key={post.id}>
              <div className="left">
                <ProfilePicture img={img} />
                <BsHeart className="heart" />
                <span>{post.likes}</span>
              </div>
              <div className="right">
                <div className="title">
                  <h2>{name}</h2>
                  <div className="icons">
                    <HiPencil onClick={editClick} />
                    <HiTrash onClick={delClick} />
                  </div>
                </div>
                <p>{post.description}</p>
                <Links url={post.url} target="_blank" />
              </div>
            </PostBox>
          ))}
        </>
      )}
    </>
  );
}

const PostBox = styled.div`
  width: 611px;
  height: 276px;
  padding: 20px;
  margin-bottom: 16px;
  display: flex;
  background: #171717;
  border-radius: 16px;

  font-family: "Lato";
  font-style: normal;
  color: #ffffff;

  h2,
  p {
    font-size: 20px;
    line-height: 23px;
    word-wrap: break-word;
  }

  p {
    opacity: 0.7;
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

  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .icons {
    width: 40px;
    transform: scale(1.5);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: auto 5px;
  }
`;
const ProfilePicture = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: red;
  background-size: cover;
  background-position: center;
  background-image: ${(props) => `url(${props.img})`};
`;

const Message = styled.div`
  width: 661px;
  padding: 40px;
  font-family: "Lato";
  font-style: normal;
  font-size: 30px;
  font-weight: 500;
  color: #ffffff;
  opacity: 0.9;
`;
const Links = styled(Microlink)`
  max-width: 85%;
`;
