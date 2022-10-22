import { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import styled from "styled-components";
import PostCard from "../PostCard/PostCard";

export default function PostContainer({ posts }) {
  return (
    <>
      <Wrapper>
        {posts.length === 0 ? (
          <ThreeCircles color="white" />
        ) : (
          posts.map((post) => {
            return <PostCard post={post} />;
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
