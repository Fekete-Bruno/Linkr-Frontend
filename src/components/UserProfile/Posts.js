import styled from "styled-components";
import PostCard from "../PostCard/PostCard";

export default function Posts({ posts, newPost, setNewPost }) {
  return (
    <>
      {posts.length === 0 ? (
        <Message>This user has no links to share yet 😞</Message>
      ) : (
        <>
          {posts.map((post) => (
            <PostCard
              key={post.postId}
              likeArray={post.likeArray}
              likes={post.likes}
              postId={post.postId}
              img={post.ownerImg}
              postUserId={post.userId}
              name={post.ownerName}
              description={post.description}
              newPost={newPost}
              url={post.url}
              setNewPost={setNewPost}
              reposts={post.reposts}
            />
          ))}
        </>
      )}
    </>
  );
}

const Message = styled.div`
  width: 661px;
  padding: 40px;
  font-family: "Lato";
  font-style: normal;
  font-size: 30px;
  font-weight: 500;
  color: #ffffff;
  opacity: 0.9;

  @media (max-width: 600px) {
    width: 98vw;
    padding: 2vw;
  }
`;
