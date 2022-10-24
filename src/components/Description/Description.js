import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Description({ description }) {

    

    return (
        <p>
            {description.length>0?description.map((descriptionPart, index) =>
                <StringPart key={index}>
                    {descriptionPart.isHashtag ?
                        <Link to={`/hashtag/${descriptionPart.string}`}>
                            {`#${descriptionPart.string}`}
                        </Link>
                        :
                        descriptionPart.string
                    }
                </StringPart>
            ):
            <></>}
        </p>
    );
}

const StringPart = styled.span`
  a {
    text-decoration: none;
    color: inherit;
    font-weight: 700;
  }
`;