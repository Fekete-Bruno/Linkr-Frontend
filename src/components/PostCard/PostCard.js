import PostBox from "../../Styles/PostBox";
import ProfilePicture from "../../Styles/ProfilePicture";
import { HeartDisliked, HeartLiked, ContainerHiCircle } from "../../Styles/Icons";
import { HiTrash, HiPencil } from "react-icons/hi";
import Microlink from "@microlink/react";
import styled from "styled-components";
import DeleteModal from "../Modals/DeleteModal";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deletePost, postLikes } from "../../Common/Service";
import EditDescriptionInput from "../Inputs/EditDescriptionInput";
import Description from '../Description/Description'
import ReactTooltip from "react-tooltip";


export default function PostCard({ post, newPost, setNewPost }) {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState();
  const [disabled, setDisabled] = useState(true);
  const userId = parseInt(localStorage.getItem("linkr-userId"));
  const [liked, setLiked] = useState(post.likeArray.find((obj)=>obj.userId===userId));
  const [likeMessage,setLikeMessage] = useState('');

  useEffect(()=>{
    const noUser = post.likeArray.filter((obj)=>obj.userId!==userId);
    if(liked){
      if(noUser.length===0 || noUser[0].name===null){
        setLikeMessage('You');
      } else if(noUser.length===1){
        setLikeMessage('You, '+noUser[0].name);
      } else if(noUser.length>1){
        setLikeMessage('You ,'+noUser[0].name+', '+noUser[1].name+' and other '+Number(post.likes-3)+' users');
      }
    } else {
      if(noUser.lenght===0){
        setLikeMessage('');
      }else if(noUser.length===1){
        setLikeMessage(noUser[0].name);
      } else if(noUser.length===2){
        setLikeMessage(noUser[0].name+', '+noUser[1].name);
      } else if(noUser.length>2){
        setLikeMessage(noUser[0].name+', '+noUser[1].name+' and other '+Number(post.likes-2)+' users');
      }
    }
  },[liked,newPost]);

  function handleDelete() {
    deletePost(selectedPost)
      .then(() => setModalOpen(false))
      .catch((error) => console.log(error.message));
  }

  function handleLike() {

    postLikes({ userId, postId: post.postId })
      .then(() => {
        setLiked(!liked);
        setNewPost(!newPost);
       })
      .catch(() => alert('Error when sending like, try again later'));
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
              <ContainerHiCircle onClick={() => navigate(`/user/${post.userId}`)} /> :
              <ProfilePicture img={post.img} onClick={() => navigate(`/user/${post.userId}`)} />
          }

          {
            liked ?

              <HeartLiked onClick={handleLike} /> :

              <HeartDisliked onClick={handleLike} />
          }

          <span 
          data-tip={likeMessage}>
            {post.likes}
          <ReactTooltip place="left"/>
          </span>

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

              <Description description={post.description} />

              ) : (
                <EditDescriptionInput
                  description={post.description
                    .map(descriptionPart =>
                      descriptionPart.isHashtag ? 
                        `#${descriptionPart.string}`
                        :
                        descriptionPart.string
                    )
                    .join("")
                  }
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