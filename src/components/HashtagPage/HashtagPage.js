import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Feed from '../../Common/Feed';
import { getFollows, getPostsByHashtag } from '../../Common/Service';

export default function HashtagPage() {
    const { hashtag } = useParams();
    const [newPost, setNewPost] = useState(false);
    const [follows, setFollows] = useState([]);

    useEffect(() => {
        const promise = getFollows();
        promise.then((res => {
            setFollows(res.data);
        })).catch(()=>{
            alert("An error occured while trying to fetch the posts, please refresh the page");
        });
    }, []);

    const get = getPostsByHashtag;

    useEffect(() => {
        setNewPost(!newPost);
    }, [hashtag])

    return (
        <Feed
            type="hashtag"
            name={hashtag}
            get={get}
            newPost = {newPost}
            setNewPost = {setNewPost}
            follows = {follows}
        />
    );
}
