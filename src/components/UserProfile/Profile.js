import styled from "styled-components";
import { getUser } from "../../Common/Service";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Posts from "./Posts";
import { ThreeCircles } from "react-loader-spinner";
import { ContainerHiCircle } from "../../Styles/Icons";

export default function UserProfile() {
  const params = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [newPost,setNewPost] = useState(false);

  useEffect(() => {
    const promise = getUser(params.id);
    promise.then((res) => {
      if (res.data.posts !== undefined ){
        setUser(res.data.user);
        setPosts(res.data.posts);
      } else {
        setUser(res.data);
      }
    });

    promise.catch(() => {
      navigate("/404");
    });
  }, [params.id]);

  return (
    <>
      {user.length === 0 ? (
        <LeftSection>
          <ThreeCircles color="white" />
        </LeftSection>
      ) : (
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
