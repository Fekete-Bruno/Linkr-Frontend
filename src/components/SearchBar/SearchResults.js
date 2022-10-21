import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ThreeDots } from  'react-loader-spinner';

export default function SearchResults ({users, hidden, setHidden}) {

    const navigate = useNavigate();

    return (
        <Wraped hidden={hidden}>
            <div>
                {users.length === 0 ? (
                    <LoaderBox>
                        <ThreeDots 
                            height = "100"
                            width = "100"
                            radius = "10"
                            color = '#FFFFFF'
                            ariaLabel = 'three-dots-loading'     
                            wrapperStyle
                            wrapperClass
                        />
                    </LoaderBox>
                ):(
                    <>
                        {users.map((user) => (
                            <UserBox>
                                <UserPicture 
                                    img = {user.img}
                                    onClick = {() => {
                                        navigate(`/user/${user.id}`)
                                        setHidden(true)
                                    }}
                                />
                                <UserName 
                                    onClick = {() => {
                                    navigate(`/user/${user.id}`)
                                    setHidden(true)
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
    width: 563px;
    height: auto;
    background: #E7E7E7;
    border-radius: 8px;

    position: absolute;
    top: 15px;

    visibility: ${props => props.hidden ? 'hidden' : 'visible'};

    > div {
        padding-top: 45px;
        display: flex;
        flex-direction: column;
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