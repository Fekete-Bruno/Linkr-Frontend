import { useEffect, useState } from "react";
import styled from "styled-components";
import PostForm from "../components/PostForm/PostForm";
import PostContainer from "../components/PostsContainer/PostsContainer";
import SearchBar from "../components/SearchBar/Search";
import Trending from '../components/Trending/Trending';

export default function Feed({ type, name, get, newPost, setNewPost }) {
    
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const promise = get(name);
        promise.then((res => {
            setPosts(res.data);
        }));
    }, [newPost, setPosts]);
    
    return (
        <Page>

            <div className="searchBar">
                <SearchBar />
            </div>

            <FeedTitle>
                {type === "hashtag" ? `# ${name}` : `timeline`}
            </FeedTitle>

            <Content>

                <div>
                    {type === "hashtag" ? 
                        ""
                        :
                        <PostForm newPost={newPost} setNewPost={setNewPost} />
                    }
                    <PostContainer posts={posts} newPost={newPost} setNewPost={setNewPost} />
                </div>


                <div className="trending">
                    <Trending />
                </div>


            </Content>
        </Page>

    );
}

const Page = styled.div`
    max-width: 100vw;
    margin:15vh 15vw;
    display: flex;
    flex-direction: column;
    color: white;

    @media (max-width: 800px) {
        margin: 15vh 0;
    }

    .searchBar {
        margin-bottom: 6vh;
        @media (min-width: 600px) {
            display: none;
        }
    }
`;

const Content = styled.div`
    display: flex;
    justify-content: space-between;

    .trending {
        margin-left:25px;

        @media (max-width: 800px) {
            display: none;
        }
    }
`;

const FeedTitle = styled.div`
    margin: 2vh 0;
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;

    @media (max-width: 800px) {
        margin: 2vh 2vh;
    }
    
`;