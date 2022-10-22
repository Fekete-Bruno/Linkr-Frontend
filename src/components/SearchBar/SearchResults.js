import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ThreeCircles } from  'react-loader-spinner';

export default function SearchResults ({users, hidden, setHidden}) {

    const navigate = useNavigate();

    function redirectToProfilePage (id) {
        navigate(`/user/${id}`);
        setHidden(true)
    }

    return (
        <Wraped hidden={hidden}>
            <div>
                {users.length === 0 ? (
                    <LoaderBox>
                        <ThreeCircles
                            height = "60"
                            width = "60"
                            color = '#FFFFFF'
                        />
                    </LoaderBox>
                ):(
                    <>
                        {users.map((user, key) => (
                            <UserBox key = {key}>
                                <UserPicture 
                                    img = {user.img}
                                    onClick = {() => {
                                        redirectToProfilePage(user.id)
                                    }}
                                />
                                <UserName 
                                    onClick = {() => {
                                        redirectToProfilePage(user.id)
                                }}>
                                {user.name}
                                </UserName>
                            </UserBox>
                        ))}
                    </>
                )}
            </div>
        </Wraped>
    )
};

const Wraped = styled.div`
    width: 33vw;
    height: auto;
    background: #E7E7E7;
    border-radius: 8px;

    position: absolute;
    top: 15px;

    visibility: ${props => props.hidden ? 'hidden' : 'visible'};

    > div {
        width: 100%;
        padding-top: 45px;
        display: flex;
        flex-direction: column;
    }

    @media (max-width: 600px) {
        width: 95vw;
    }
`
const UserBox = styled.div`
    padding: 10px 10px;
    justify-content: space-around;
`
const UserPicture = styled.div`
    width: 39px;
    height: 39px;
    border-radius: 50%;
    background-color: red;
    background-size: cover;
    background-position: center;
    background-image: ${props => `url(${props.img})`};
    cursor: pointer;
`
const UserName = styled.div`
    margin-left: 10px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #515151;
    cursor: pointer;`

const LoaderBox = styled.div`
    width: 550px;
    display: flex;
    align-items: center;
    justify-content: center;
`