import styled from "styled-components";

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
        word-wrap: break-word;
    }

    p {
        opacity: .7;
        line-height: 2em;
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
`;

export default PostBox;