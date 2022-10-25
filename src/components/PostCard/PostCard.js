import PostBox from "../../Styles/PostBox";
import ProfilePicture from "../../Styles/ProfilePicture";
import {
  HeartDisliked,
  HeartLiked,
  ContainerHiCircle,
} from "../../Styles/Icons";
import { HiTrash, HiPencil, HiUserCircle } from "react-icons/hi";
import { AiOutlineComment } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { BiRepost } from "react-icons/bi";
import Microlink from "@microlink/react";
import styled from "styled-components";
import DeleteModal from "../Modals/DeleteModal";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deletePost, postLikes } from "../../Common/Service";
import EditDescriptionInput from "../Inputs/EditDescriptionInput";
import Description from "../Description/Description";
import ReactTooltip from "react-tooltip";
import axios from "axios";

function CommentJSX({ index, followedId, name, img, comment, postId }) {
  const [following, setFollowing] = useState('');

  let userId = localStorage.getItem("linkr-userId");
  userId = Number(userId);

  const body = {
    followerId: userId,
    followedId: followedId
  }

  let token = localStorage.getItem("token");
  token = JSON.parse(token);
  token = token.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const checkIfFollows = axios.post(process.env.REACT_APP_API_BASE_URL + '/checkiffollows', body, config);

  checkIfFollows.then((answer) => {
    if (answer.data === true) {
      setFollowing('• following');
    } else if (userId === followedId) {
      setFollowing('• post’s author');
    }
  });

  checkIfFollows.catch((error) => {
    console.log(error);
  });

  return (
    <>
      <div className="containerAvatarComment">
        <div className="avatar">{img === null ? <ContainerHiUserCircle /> : <img src={img} alt="avatar" />}</div>

        <div className="containerNameComment">
          <div className="name">
            <h1>{name}</h1>
            <h2>{following}</h2>
          </div>

          <div className="comment">
            <h1>{comment}</h1>
          </div>
        </div>
      </div>

      <div className="grayLine"></div>
    </>
  );
};

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
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [commentsNumber, setCommentsNumber] = useState(0);
  const [commentBox, setCommentBox] = useState(false);
  const [refresh, setRefresh] = useState(false);

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

  //handleComments();
  useEffect(() => {
    handleComments();
  }, [refresh]);

  function handleComments() {
    let token = localStorage.getItem("token");
    token = JSON.parse(token);
    token = token.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const getComments = axios.get(process.env.REACT_APP_API_BASE_URL + '/comments/' + postId, config);

    getComments.then((answer) => {
      setComments(answer.data);
      setCommentsNumber((answer.data).length);
    });

    getComments.catch((error) => {
      console.log(error);
    });
  }

  function sendComment(e) {
    e.preventDefault();

    let userId = localStorage.getItem("linkr-userId");
    userId = Number(userId);
    const body = {
      userId: userId,
      postId: postId,
      comment: comment
    }

    let token = localStorage.getItem("token");
    token = JSON.parse(token);
    token = token.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const postComment = axios.post(process.env.REACT_APP_API_BASE_URL + '/comment', body, config);

    postComment.then(() => {
      setComment('');
      setRefresh(!refresh);
    });

    postComment.catch((error) => {
      console.log(error);
    });
  };

  return (
    <Wraped>
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

          <Comments onClick={() => { setCommentBox(!commentBox) }}>
            <AiOutlineComment />
          </Comments>
          <Text><h1>{commentsNumber} {/* comments */}</h1></Text>


          <Reposts onClick={() => { console.log('aaaaaaa') }}>
            <BiRepost />
          </Reposts>
          <Text><h1>X {/* reposts */}</h1></Text>

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

      <CommentsDropDown>
        <div className={`dropdown-menu ${commentBox ? 'active' : 'inactive'}`}>
          <CommentBox>
            {comments.map((comment, key) => <CommentJSX key={key} index={key + 1} followedId={comment.userId} name={comment.name} img={comment.img} comment={comment.comment} postId={postId} />)}

            <FormComment onSubmit={sendComment}>
              {img === localStorage.getItem("img") ? <ContainerHiUserCircle /> : <img src={localStorage.getItem("img")} alt='' />}
              <input type="text" id="comment" placeholder="Write a comment..." value={comment} onChange={(e) => { setComment(e.target.value) }}></input>
              <button type="submit" className="button"><ContainerFiSend /></button>
            </FormComment>
          </CommentBox>
        </div>
      </CommentsDropDown>
    </Wraped>
  );
}

const Wraped = styled.div`
  position: relative;
`;

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

const Comments = styled(AiOutlineComment)`
  transform: scale(2);
  margin-top: 20px;
`;

const Text = styled.span`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  text-align: center;
  color: #FFFFFF;
  margin-top: 12px;
`;

const CommentsDropDown = styled.div`
  //position: absolute;
  //top: 0;
  //z-index: -1;

  .dropdown-menu.active {
    opacity: 1;
    visibility: visible;
    //transform: translateY(0);
    //transition: var(500ms) ease;
  }

  .dropdown-menu.inactive {
    opacity: 0;
    visibility: hidden;
    display: none;
    //transform: translateY(-20px);
    //transition: var(500ms) ease;
    margin-top: 0px;
  }
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 611px;
  background: #1E1E1E;
  border-radius: 16px;
  margin: -50px 0px 24px 0px;
  padding: 50px 0px 24px 24px;

    .containerAvatarComment {
      display: flex;
      margin-top: 12px;
    }

    img {
      width: 39px;
      height: 39px;
      border-radius: 26.5px;
    }


    .containerNameComment{
      margin-left: 18px;
    }

    .name {
      display: flex;
    }

    .name h1 {
      font-family: 'Lato';
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
      color: #F3F3F3;
      margin-right: 4px;
    }

    .name h2 {
      font-family: 'Lato';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #565656;
    }

    .comment h1{
      font-family: 'Lato';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #ACACAC;
      margin-top: 4px;
    }

    .grayLine {
      width: 571px;
      height: 1px;
      border: 1px solid #353535;
      transform: rotate(-0.1deg);
      margin-top: 18px;
    }
`;

const FormComment = styled.form`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 18px;
  //z-index: 1;

    input[type="text"] {
      width: 510px;
      height: 39px;
      background: #252525;
      border-radius: 8px;
      border: none;
      margin-left: 12px;

      font-family: 'Lato';
      font-style: italic;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      letter-spacing: 0.05em;
      color: #575757;
      padding-left: 12px;
    }

    .button {
      //visibility: hidden;
      border: 0; 
      background: transparent;
    }

`;

const ContainerHiUserCircle = styled(HiUserCircle)`
  width: 39px;
  height: 39px;
`;

const ContainerFiSend = styled(FiSend)`
  width: 24px;
  height: 24px;
  color: #F3F3F3;
  margin-left: -50px;
`;

const Reposts = styled(BiRepost)`
  transform: scale(2);
  margin-top: 20px;
`;