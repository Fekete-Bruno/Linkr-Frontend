import { useState } from "react";
import { HiUserCircle } from "react-icons/hi";
import { ThreeCircles } from "react-loader-spinner";
import styled from "styled-components";
import { postUrls } from "../../Common/Service";
import Button from "../Buttons/Buttons";
import Input from "../Inputs/Input";

export default function PostForm({ newPost, setNewPost }) {
    const userId = localStorage.getItem("linkr-userId");
    const initial = {
        userId,
        url: "",
        description: ""
    }
    const [form, setForm] = useState({ ...initial });
    const urlSchema = new RegExp(
        "((https?):\/\/)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])"
    );
    const [disabled, setDisabled] = useState(false);
    ;
    const img = localStorage.getItem("img");

    function handleForm(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    function sendUrl(e) {
        e.preventDefault();

        if (disabled) {
            return;
        }
        if (!urlSchema.test(form.url)) {
            alert("Please send a valid link (Example: https://www.google.com)");
            return;
        }
        setDisabled(true);

        if (form.description === "") {
            form.description = undefined;
        }

        postUrls(form).then(() => {
            setForm({ ...initial });
            setDisabled(false);
            setNewPost(!newPost);
        }).catch((error) => {
            console.error(error);
            alert("Error during publication of your post, try again later!");
            setDisabled(false);
        })

        console.log(form);

    }



    return (

        <Wrapper>
            {img === 'null' ? <HiUserCircle /> : <img src={img} alt="profile" />}
            <PostFormContainer>
                <h1>What are you sharing today?</h1>
                <form onSubmit={sendUrl}>
                    <Input
                        name="url"
                        className="post"
                        height="30px"
                        placeholder="http://..."
                        value={form.url}
                        onChange={handleForm}
                    />
                    <Input
                        name="description"
                        className="post"
                        height="66px"
                        placeholder="Tell the world more about it!"
                        onChange={handleForm}
                        value={form.description}
                    />
                    <Button className="post" type="submit" disabled={disabled}>
                        {disabled ? <ThreeCircles color="white" height={30} /> : <>Publish</>}
                    </Button>
                </form>
            </PostFormContainer>
        </Wrapper>
    );
}

const PostFormContainer = styled.div`
    &>*{
        margin: 0.5vh;
    }
    h1{
        width: 98%;
        color: grey;
    }
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    form{
        display: flex;
        align-items: flex-end;
        &>*{
        margin: 0.5vh;
        }
    }
`;

const Wrapper = styled.div`
    img{
        border-radius:50%;
        width: 6vh;
        height: 6vh;
    }
    border-radius: 12px;
    background-color: white;
    display: flex;
    padding: 1vh;
    &>*{
        margin: 1vh;
    }
`;