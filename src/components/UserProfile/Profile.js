import styled from "styled-components";
import { getUser } from "../../Common/Service";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Posts from "./Posts";
import DeleteModal from "../Modals/DeleteModal";
import { ThreeCircles } from "react-loader-spinner";

export default function UserProfile() {
  const params = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const promise = getUser(params.id);
    promise.then((res) => {
      setUser(res.data);
      console.log(user);

      if (res.data.userPosts) {
        setPosts(res.data.userPosts);
      }
    });

    promise.catch(() => {
      navigate("/404");
    });
  }, [params.id]);

  return (
    <>
      {modalOpen ? (
        <DeleteModal closeModal={() => setModalOpen(false)} />
      ) : (
        <></>
      )}
      {user.length === 0 ? (
        <LeftSection>
          <ThreeCircles color="white" />
        </LeftSection>
      ) : (
        <LeftSection>
          <UserInfos>
            <ProfilePicture img={user.img} />
            <Title>{user.name}'s posts</Title>
          </UserInfos>
          <Posts
            id={posts.id}
            posts={posts}
            img={user.img}
            name={user.name}
            userId = {user.id}
            delClick={() => setModalOpen(true)}
          />
        </LeftSection>
      )}
    </>
  );
}

const LeftSection = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserInfos = styled.div`
  width: 661px;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
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

const Title = styled.h1`
  font-family: "Oswald";
  font-style: normal;
  font-weight: 700;
  font-size: 43px;
  line-height: 64px;
  color: #ffffff;

  margin-left: 20px;
`;
