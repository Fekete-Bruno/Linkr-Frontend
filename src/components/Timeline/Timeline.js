import { useState } from 'react';
import Feed from "../../Common/Feed";
import { getPosts } from "../../Common/Service";

export default function Timeline() {
    const [newPost, setNewPost] = useState(false);

    const get = getPosts;

    return (
        <Feed
            type = "timeline"
            name = ""
            get = {get}
            newPost = {newPost}
            setNewPost = {setNewPost}
        />
    );
}
