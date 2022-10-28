import styled from "styled-components";
import { ThreeCircles } from "react-loader-spinner";
import { ContainerHiCircle } from "../../Styles/Icons";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserInfos, getUserPosts } from "../../Common/Service";
import Posts from "./Posts";
import Follow from "./Follow";
import Trending from "../Trending/Trending";

export default function UserProfile() {
  const params = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem("linkr-userId");
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState(false);

  useEffect(() => {
    const promise = getUserInfos(params.id);

    promise.then((res) => {
      setUser(res.data);

      const promise = getUserPosts(params.id);
      promise.then((res) => {
        console.log(res.data);
        setPosts(res.data);
      });
    });

    promise.catch(() => {
      navigate("/404");
    });
  }, [params.id, newPost, setPosts]);

  //console.log(userId, user);
  console.log(posts);
  return (
    <>
      {user.length === 0 ? (
        <Loader>
          <ThreeCircles color="white" />
        </Loader>
      ) : (
        <Page>
          <LeftSection>
            <UserInfos>
              {user.img === null ? (
                <ContainerHiCircle />
              ) : (
                <ProfilePicture img={user.img} />
              )}

              <Title>{user.name}'s posts</Title>
            </UserInfos>

            {user.id === userId ? (
              <></>
            ) : (
              <div className="hidden">
                <Follow />
              </div>
            )}

            <Posts newPost={newPost} setNewPost={setNewPost} posts={posts} />
          </LeftSection>

          <RightSection>
            {user.id === userId ? <BlankSpace /> : <Follow />}

            <Trending />
          </RightSection>
        </Page>
      )}
    </>
  );
}

const Loader = styled.div`
  width: 100%;
  padding-top: 15vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Page = styled.div`
  max-width: 100vw;
  margin: 15vh 15vw;
  display: flex;
  justify-content: center;
  color: white;

  @media (max-width: 800px) {
    margin: 12vh 0;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .hidden {
    width: 80vw;
    align-self: flex-start;
    margin: 3vh 2vw;
  }

  @media (min-width: 800px) {
    .hidden {
      display: none;
    }
  }
`;

const UserInfos = styled.div`
  width: 661px;
  padding: 40px;
  display: flex;
  justify-content: flex-start;

  @media (max-width: 600px) {
    width: 98vw;
    padding: 5vh 2vw;
  }
`;

const ProfilePicture = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-image: ${(props) => `url(${props.img})`};
`;

const Title = styled.h1`
  font-family: "Oswald";
  font-style: normal;
  font-weight: 700;
  font-size: 43px;
  color: #ffffff;
  word-break: break-all;

  margin-left: 20px;

  @media (max-width: 800px) {
    width: 75vw;
  }
`;

const RightSection = styled.div`
  width: 301px;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  button {
    margin: 50px 0;
  }

  @media (max-width: 800px) {
    display: none;
  }
`;

const BlankSpace = styled.div`
  height: 130px;
`;
