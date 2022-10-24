import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { editPost } from "../../Common/Service";
import { ThreeCircles } from "react-loader-spinner";

export default function EditDescriptionInput({
  description,
  selectedPost,
  editDisabled,
  setEditDisabled,
  setSelectedPost,
  newPost,
  setNewPost,
}) {
  const [newDescription, setNewDescription] = useState("");
  const [inputLock, setInputLock] = useState(false);
  const inputRef = useRef();

  function keyPressed(e) {
    if (e.key === 13) {
      e.preventDefault();
      alert("enter key pressed");
      handleEdit();
    }
    if (e.key === 27) {
      e.preventDefault();
      setEditDisabled(!editDisabled);
      setNewDescription();
    }
  }

  function handleEdit(e) {
    e.preventDefault();
    setInputLock(true);
    editPost(selectedPost, { description: newDescription })
      .then(() => {
        setEditDisabled(!editDisabled);
        setSelectedPost();
        setInputLock(false);
      })
      .catch((error) => alert(`Couldn't edit post. Error: ${error.message}`));
    setNewPost(!newPost);
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Wrapper>
      {inputLock ? (
        <ThreeCircles color="white" height={30} />
      ) : (
        <>
          <form onSubmit={handleEdit}>
            <input
              ref={inputRef}
              placeholder={description}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              autoComplete="off"
            />
            <button type="submit"></button>
          </form>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  button {
    display: none;
  }
`;
