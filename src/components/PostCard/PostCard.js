import PostBox from "../../Styles/PostBox";
import ProfilePicture from "../../Styles/ProfilePicture";
import { BsHeart } from "react-icons/bs";
import { HiTrash, HiPencil } from "react-icons/hi";
import Microlink from "@microlink/react";
import styled from "styled-components";
import DeleteModal from "../Modals/DeleteModal";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { deletePost } from "../../Common/Service";

export default function PostCard({ post }) {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState();
  const [disabled, setDisabled] = useState(true);

  const inputRef = useRef(null);

  const userId = parseInt(localStorage.getItem("linkr-userId"));

  function handleDelete() {
    deletePost(selectedPost)
      .then(() => setModalOpen(false))
      .catch((error) => console.log(error.message));
  }

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
          <ProfilePicture img={post.img} />
          <BsHeart className="heart" />
          <span>{post.likes}</span>
        </div>
        <div className="right">
          <div className="title">
            <h2>{post.name}</h2>
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
            <p>{post.description}</p>
          </ReactTagify>
          <form>
            <input
              ref={inputRef}
              placeholder={post.description}
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
