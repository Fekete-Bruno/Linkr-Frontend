import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ThreeCircles } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

import { getHashtags } from '../../Common/Service';

export default function Trending() {
    const [hashtags, setHashtags] = useState(null);
    useEffect(() => {
        const promise = getHashtags();
        promise
            .then(response => {
                setHashtags(response.data);
            })
            .catch(error => {
                alert("Try again later")
            });
    }, []);

    return (
        <Wrapper>
            <Title>trending</Title>
            {hashtags ?
                hashtags.map((hashtag, index) =>
                    <Hashtag key={index}>
                        <Link to={`/hashtag/${hashtag.hashtag}`}>
                            # {hashtag.hashtag}
                        </Link>
                    </Hashtag>
                )
                :
                <Loader>
                    <ThreeCircles color="white" />
                </Loader>
            }
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 300px;
    height: 405px;
    border-radius: 16px;
    background-color: #171717;

    div:nth-child(2) {
        padding-top: 20px;
    }
`;

const Title = styled.div`
    height: 60px;
    border-bottom: 1px solid #484848;
    padding: 15px 0px 0px 15px;
    align-items: center;

    font-family: Oswald;
    font-weight: 700;
    font-size: 27px;
    color: #FFFFFF;
`;

const Loader = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Hashtag = styled.div`
    padding-left: 15px;

    font-family: Lato;
    font-weight: 700;
    font-size: 19px;
    line-height: 30px;
    letter-spacing: 0.05em;
    color: #FFFFFF;

    a {
        text-decoration: none;
        color: inherit;
        font-weight: inherit;
    }
`;