import styled from "styled-components";
import PostForm from "../PostForm/PostForm";

export default function Timeline(){
    return(
        <Page>
            <TimelineTitle>timeline</TimelineTitle>
            
            <Content>

                <div>
                <PostForm />
                <div>
                    POSTS HERE SOON...
                </div>
                </div>


                <div>Trending column COMING SOON...</div>

            
            </Content>
        </Page>

    );
}

const Page = styled.div`
    margin:15vh 15vw;
    display: flex;
    flex-direction: column;
    color: white;
`;

const Content = styled.div`
    display: flex;
    justify-content: space-between;
`;

const TimelineTitle = styled.div`
    margin: 2vh 0;
    color:white;
    font-family: 'Passion One';
    font-weight: 700;
    font-size: 5vh;
`;