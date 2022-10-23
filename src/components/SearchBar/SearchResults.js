import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ThreeCircles } from  'react-loader-spinner';
import { ContainerHiCircle } from "../../Styles/Icons";
import ProfilePicture from "../../Styles/ProfilePicture";

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
                                {
                                    user.img === null ? 
                                    <ContainerHiCircle 
                                        onClick={() => 
                                            redirectToProfilePage(user.id)
                                        }/> :
                                    <ProfilePicture
                                        img = {user.img}
                                        onClick = {() => {
                                            redirectToProfilePage(user.id)
                                        }}
                                />
                                }    
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
        width: 100%;
    }
`
const UserBox = styled.div`
    width: 98%;
    padding: 10px 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
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