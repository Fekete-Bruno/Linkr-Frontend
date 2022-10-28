import { ThreeCircles } from "react-loader-spinner";
import styled from "styled-components";
import PostCard from "../PostCard/PostCard";

export default function PostContainer({
  posts,
  newPost,
  setNewPost,
  loggedName,
}) {
  return (
    <>
      <Wrapper>
        {posts.length === 0 ? (
          <ThreeCircles color="white" />
        ) : (
          posts.map((post) => {
            return (
              <PostCard
                key={post.postId}
                likeArray={post.likeArray}
                likes={post.likes}
                postId={post.postId}
                img={post.ownerImg}
                postUserId={post.ownerId}
                reposterName={post.reposterName}
                name={post.ownerName}
                description={post.description}
                newPost={newPost}
                url={post.url}
                setNewPost={setNewPost}
                reposts={post.reposts}
                loggedName={loggedName}
              />
            );
          })
        )}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
