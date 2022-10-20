import { useParams } from 'react-router-dom';
import styled from 'styled-components';

export default function HashtagPage() {
    const { hashtag } = useParams();
    return (
        <Temp>
            <p>You tried to access the <span>#{hashtag}</span> page.</p>
            <p>Unfortunately we don't have this feature yet.</p>
            <p>Come back later!</p>
        </Temp>
    );
}

const Temp = styled.div`
    p {
        font-weight: 400;
    }
    
    span {
        font-weight: 700;
    }
`;