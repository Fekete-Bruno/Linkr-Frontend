import PostBox from "../../Styles/PostBox";
import ProfilePicture from "../../Styles/ProfilePicture";
import { HeartDisliked, HeartLiked, ContainerHiCircle } from "../../Styles/Icons";
import { HiTrash, HiPencil } from "react-icons/hi";
import Microlink from "@microlink/react";
import styled from "styled-components";
import DeleteModal from "../Modals/DeleteModal";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { deletePost, postLikes } from "../../Common/Service";
import EditDescriptionInput from "../Inputs/EditDescriptionInput";


export default function PostCard({ post }) {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState();
  const [disabled, setDisabled] = useState(true);
  const [liked,setLiked] = useState(false);

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
            <ContainerHiCircle onClick={() => navigate(`/user/${post.userId}`)}/> :
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
          <div>
            <div className="title">
              <h2 onClick={() => navigate(`/user/${post.userId}`)}>{post.name}</h2>
              {post.userId === userId ? (
                <div className="icons">
                  <HiPencil
                    onClick={() => {
                      setDisabled(!disabled);
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

            {
              disabled ? (
                <ReactTagify
                  tagStyle={tagStyle}
                  tagClicked={(tag) => {
                    navigate(`/hashtag/${tag.slice(1)}`);
                  }}
                >
                  <p>{post.description}</p>
                </ReactTagify>
              ): (
                <EditDescriptionInput
                  description = {post.description} 
                />
              )
            }
          </div>
          <Links url={post.url} target="_blank" />
        </div>
      </PostBox>
    </>
  );
}

const Links = styled(Microlink)`
  width: 100%;
  height: 65%;
  border-radius: 10px;
  color: #fff;
  background-color: #171717;

  :hover {
    background-color: #171717;
    filter: brightness(120%);
  }
`;
