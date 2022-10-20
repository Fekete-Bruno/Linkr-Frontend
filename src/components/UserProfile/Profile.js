import styled from 'styled-components';
import { ReactTagify } from 'react-tagify';
import { BsHeart } from 'react-icons/bs';
import { getUser } from "../../Common/Service";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

export default function UserProfile () {

    const params = useParams();

    const [data, setData] = useState({});

    useEffect(() => {
        const promise = getUser(params.id);
        promise.then((res => {
            setData(res.data);
        }));
    }, [setData]);

    return (
        <>
            <LeftSection>
                <UserInfos>
                    <ProfilePicture img = {data.img}/>
                    <Title>
                        {data.name}'s posts
                    </Title>
                </UserInfos>
                <PostBox>
                    <div className="left">
                        <ProfilePicture />
                        <BsHeart className="heart"/>
                        <span>13 likes</span>
                    </div>
                    <div className="right">
                        <h2>Nezuko</h2>
                        <p>description djfioklrk #no_meio_mesmo #duas#juntas jegiojkçrgfnkcklc,x #aleatório #feliz</p>
                        <a>link</a>
                    </div>
                </PostBox>
            </LeftSection>
        </>
    )
};

const LeftSection = styled.div`
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const UserInfos = styled.div`
    width: 661px;
    padding: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`

const ProfilePicture = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: red;
    background-size: cover;
    background-position: center;
    background-image: url("https://nerdhits.com.br/wp-content/uploads/2022/09/nezuko-692x376.jpg");
`

const Title = styled.h1`
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #FFFFFF;

    margin-left: 20px;
`
const PostBox = styled.div`
    width: 611px;
    height: 276px;
    padding: 20px;
    margin-bottom: 16px;
    display: flex;
    background: #171717;
    border-radius: 16px;

    font-family: 'Lato';
    font-style: normal;
    color: #FFFFFF;

    h2, p {
        font-size: 20px;
        line-height: 23px;
    }

    p {
        opacity: .7;
    }

    span {
        font-size: 15px;
    }

    div {
        display: flex;
        flex-direction: column;
    }

    .heart {
        font-size: 25px;
        color: #fff;
        margin-top: 20px;
        margin-bottom: 5px;
        cursor: pointer;
    }

    .left {
        align-items: center;
    }

    .right {
        padding-left: 20px;
    }
`