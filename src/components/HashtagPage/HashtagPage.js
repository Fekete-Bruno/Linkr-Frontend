import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Feed from '../../Common/Feed';
import { getPostsByHashtag } from '../../Common/Service';

export default function HashtagPage() {
    const { hashtag } = useParams();
    const [newPost, setNewPost] = useState(false);

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
            follows={null}
        />
    );
}
