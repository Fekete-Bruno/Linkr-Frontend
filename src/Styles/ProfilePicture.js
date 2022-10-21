import styled from "styled-components";

const ProfilePicture = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: red;
    background-size: cover;
    background-position: center;
    background-image: ${props => `url(${props.img})`};
`;

export default ProfilePicture;