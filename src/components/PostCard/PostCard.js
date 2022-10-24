import PostBox from "../../Styles/PostBox";
import ProfilePicture from "../../Styles/ProfilePicture";
import {
  HeartDisliked,
  HeartLiked,
  ContainerHiCircle,
} from "../../Styles/Icons";
import { HiTrash, HiPencil } from "react-icons/hi";
import Microlink from "@microlink/react";
import styled from "styled-components";
import DeleteModal from "../Modals/DeleteModal";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deletePost, postLikes } from "../../Common/Service";
import EditDescriptionInput from "../Inputs/EditDescriptionInput";
import Description from "../Description/Description";
import ReactTooltip from "react-tooltip";

export default function PostCard({
  postId,
  name,
  img,
  postUserId,
  url,
  description,
  likeArray,
  likes,
  newPost,
  setNewPost,
}) {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState();
  const [editDisabled, setEditDisabled] = useState(true);
  const [delDisabled, setDelDisabled] = useState(false);
  const userId = parseInt(localStorage.getItem("linkr-userId"));
  const [liked, setLiked] = useState(
    likeArray.find((obj) => obj.userId === userId)
  );
  const [likeMessage, setLikeMessage] = useState("");
  useEffect(() => {
    const noUser = likeArray.filter((obj) => obj.userId !== userId);
    if (liked) {
      if (noUser.length === 0 || noUser[0].name === null) {
        setLikeMessage("You");
      } else if (noUser.length === 1) {
        setLikeMessage("You, " + noUser[0].name);
      } else if (noUser.length > 1) {
        setLikeMessage(
          "You ," +
            noUser[0].name +
            " and other " +
            Number(likes - 2) +
            " users"
        );
      }
    } else {
      if (noUser.lenght === 0) {
        setLikeMessage("");
      } else if (noUser.length === 1) {
        setLikeMessage(noUser[0].name);
      } else if (noUser.length === 2) {
        setLikeMessage(noUser[0].name + ", " + noUser[1].name);
      } else if (noUser.length > 2) {
        setLikeMessage(
          noUser[0].name +
            ", " +
            noUser[1].name +
            " and other " +
            Number(likes - 2) +
            " users"
        );
      }
    }
  }, [liked, newPost]);

  function handleDelete() {
    setDelDisabled(true);
    deletePost(selectedPost)
      .then(() => {
        setModalOpen(false);
        setDelDisabled(false);
        setSelectedPost();
        window.location.reload(false);
      })
      .catch((error) => alert(`Couldn't delete post. Error: ${error.message}`));
  }

  function handleLike() {
    postLikes({ userId, postId })
      .then(() => {
        setLiked(!liked);
        setNewPost(!newPost);
      })
      .catch(() => alert("Error when sending like, try again later"));
  }

  return (
    <>
      {modalOpen ? (
        <DeleteModal
          closeModal={() => setModalOpen(false)}
          confirmDelete={() => handleDelete()}
          delDisabled={delDisabled}
        />
      ) : (
        <></>
      )}
      <PostBox>
        <div className="left">
          {img === null ? (
            <ContainerHiCircle
              onClick={() => navigate(`/user/${postUserId}`)}
            />
          ) : (
            <ProfilePicture
              img={img}
              onClick={() => navigate(`/user/${postUserId}`)}
            />
          )}

          {liked ? (
            <HeartLiked onClick={handleLike} />
          ) : (
            <HeartDisliked onClick={handleLike} />
          )}

          <span data-tip={likeMessage}>
            {likes}
            <ReactTooltip place="left" />
          </span>
        </div>
        <div className="right">
          <div>
            <div className="title">
              <h2 onClick={() => navigate(`/user/${postUserId}`)}>{name}</h2>
              {postUserId === userId ? (
                <div className="icons">
                  <HiPencil
                    onClick={() => {
                      setEditDisabled(!editDisabled);
                      setSelectedPost(postId);
                    }}
                  />
                  <HiTrash
                    onClick={() => {
                      setModalOpen(true);
                      setSelectedPost(postId);
                    }}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>

            {editDisabled ? (
              <Description description={description} />
            ) : (
              <EditDescriptionInput
                description={description
                  .map((descriptionPart) =>
                    descriptionPart.isHashtag
                      ? `#${descriptionPart.string}`
                      : descriptionPart.string
                  )
                  .join("")}
                selectedPost={selectedPost}
                editDisabled={editDisabled}
                setEditDisabled={setEditDisabled}
                setSelectedPost={setSelectedPost}
                newPost={setNewPost}
                setNewPost={setNewPost}
              />
            )}
          </div>
          <Links url={url} target="_blank" />
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
