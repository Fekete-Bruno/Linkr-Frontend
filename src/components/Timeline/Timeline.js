import { useState, useEffect } from 'react';
import { getPosts, getFollows } from "../../Common/Service";
import Feed from "../../Common/Feed";

export default function Timeline() {
    const [newPost, setNewPost] = useState(false);
    const [follows, setFollows] = useState([]);

    const get = getPosts;

    useEffect(() => {
        const promise = getFollows();
        promise.then((res => {
            setFollows(res.data);
        })).catch(()=>{
            alert("An error occured while trying to fetch the posts, please refresh the page");
        });
    }, [newPost]);

    return (
        <Feed
            type = "timeline"
            name = ""
            get = {get}
            newPost = {newPost}
            setNewPost = {setNewPost}
            follows = {follows}
        />
    );
}
