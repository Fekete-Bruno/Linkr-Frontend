import styled from "styled-components";
import { ThreeCircles } from "react-loader-spinner";
import { ContainerHiCircle } from "../../Styles/Icons";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserInfos, getUserPosts } from "../../Common/Service";
import Posts from "./Posts";
import Follow from "./Follow";

export default function UserProfile() {
  const params = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [newPost,setNewPost] = useState(false);

  useEffect(() => {
    const promise = getUserInfos(params.id);

    promise.then((res) => {
      setUser(res.data);

      const promise = getUserPosts(params.id);
      promise.then((res) => {
        setPosts(res.data);
      })

    });

    promise.catch(() => {
      navigate("/404");
    });

  }, [params.id, newPost, setPosts]);  

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
              {
              user.img === null ?
                <ContainerHiCircle /> :
                <ProfilePicture img={user.img} />
              }
              <Title>{user.name}'s posts</Title> 
            </UserInfos>
            <Posts
              newPost={newPost}
              setNewPost={setNewPost}
              posts={posts}
            />
          </LeftSection>

          <RightSection>
            <Follow/>
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
    margin:15vh 15vw;
    display: flex;
    color: white;

    @media (max-width: 800px) {
        margin: 15vh 0;
    }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserInfos = styled.div`
  width: 661px;
  padding: 40px;
  display: flex;
  justify-content: flex-start;

  @media (max-width: 600px) {
    width: 98vw;
    padding: 40px 0;
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

  margin-left: 20px;
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
`;
