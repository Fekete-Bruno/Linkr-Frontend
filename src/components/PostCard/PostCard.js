import PostBox from "../../Styles/PostBox";
import ProfilePicture from "../../Styles/ProfilePicture";
import { HeartDisliked, HeartLiked, ContainerHiCircle } from "../../Styles/Icons";
import { HiTrash, HiPencil } from "react-icons/hi";
import Microlink from "@microlink/react";
import styled from "styled-components";
import DeleteModal from "../Modals/DeleteModal";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { deletePost, postLikes } from "../../Common/Service";


export default function PostCard({ post, newPost, setNewPost}) {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState();
  const [disabled, setDisabled] = useState(true);
  const [liked,setLiked] = useState();

  const inputRef = useRef(null);

  const userId = parseInt(localStorage.getItem("linkr-userId"));

  function handleDelete() {
    deletePost(selectedPost)
      .then(() => setModalOpen(false))
      .catch((error) => console.log(error.message));
  }

  function handleLike(){

    postLikes({userId,postId: post.postId})
    .then(()=>{console.log('LIKE')})
    .catch(()=>alert('Error when sending like, try again later'));

    setLiked(!liked);
    setNewPost(!newPost);
  };

  const tagStyle = {
    fontWeight: 700,
    fontSize: "20px",
    cursor: "pointer",
  };

  return (
    <>
      {modalOpen ? (
        <DeleteModal
          closeModal={() => setModalOpen(false)}
          confirmDelete={() => handleDelete()}
        />
      ) : (
        <></>
      )}
      <PostBox>
        <div className="left">
          {
            post.img === null ? 
            <ContainerHiCircle /> :
            <ProfilePicture img={post.img} onClick={() => navigate(`/user/${post.userId}`)}/>
          }
          {
            liked?

            <HeartLiked  onClick={handleLike}/>:

            <HeartDisliked onClick={handleLike}/>
          }
          <span>{post.likes}</span>
        </div>
        <div className="right">
          <div className="title">
            <h2 onClick={() => navigate(`/user/${post.userId}`)}>{post.name}</h2>
            {post.userId === userId ? (
              <div className="icons">
                <HiPencil
                  onClick={() => {
                    setDisabled(!disabled);
                    inputRef.current.focus();
                  }}
                />
                <HiTrash
                  onClick={() => {
                    setModalOpen(true);
                    setSelectedPost(post.postId);
                  }}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
          <ReactTagify
            tagStyle={tagStyle}
            tagClicked={(tag) => {
              navigate(`/hashtag/${tag.slice(1)}`);
            }}
          >
            <p>{post.description[0].string}</p>
          </ReactTagify>
          <form>
            <input
              ref={inputRef}
              placeholder={post.description[0].string}
              disabled={disabled}
            />
          </form>
          <Links url={post.url} target="_blank" />
        </div>
      </PostBox>
    </>
  );
}

const Links = styled(Microlink)`
  max-width: 85%;
`;
