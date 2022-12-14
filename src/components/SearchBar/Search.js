import styled from "styled-components";
import {DebounceInput} from 'react-debounce-input';
import { BsSearch } from 'react-icons/bs';
import { useState, useEffect } from "react";
import { searchUser } from "../../Common/Service";
import SearchResults from "./SearchResults";
import { useRef } from "react";

export default function SearchBar () {

    let searchRef = useRef();
    const [keyword, setKeyword] = useState("");
    const [users, setUsers] = useState([]);
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        let handler = (e) => {
          if (!searchRef?.current.contains(e.target)) {
            setUsers([]);
            setHidden(true);
          }
        }
    
        document.addEventListener("mousedown", handler);
      }, []);

    useEffect(() => {

        const promise = searchUser(keyword);
        promise.then((res => {
            setUsers(res.data);
            setHidden(false);
        }));
        promise.catch(() => setUsers([]))

    }, [keyword]);

    function sendForm (e) {
        e.preventDefault();

        const promise = searchUser(keyword);
        promise.then((res => {
            setUsers(res.data);
            setHidden(false);
        }));
        promise.catch(() => setUsers([]))   
    };

    return (
        <Wraped ref={searchRef}>
            <SearchBox>
                <form onSubmit={sendForm}>
                    <DebounceInput
                        minLength={3}
                        debounceTimeout={300}
                        type="text" 
                        placeholder="Search for people"
                        value={keyword} 
                        onChange={e => {
                            setKeyword(e.target.value)
                            setHidden(false)
                        }}
                        required
                    />
                    <button type="submit">
                        <BsSearch className="icon"/>
                    </button>                        
                </form>
            </SearchBox>
            <SearchResults
                users={users} 
                hidden={hidden}
                setHidden={setHidden}
            />
        </Wraped>
    )
};

const Wraped = styled.div`
    position: relative;
    @media (max-width: 600px) {
        margin: 0 2vw; 
    }

`

const SearchBox = styled.div`
    width: 33vw;
    height: 45px;
    background: #FFFFFF;
    border-radius: 8px;
    z-index: 1;

    display: flex;
    align-items: center;

    form {
        width: 98%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    input {
        width: 90%;
        height: 30px;
        padding-left: 10px;
        border: none;
        border-radius: 20px;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;

        ::placeholder {
            font-size: 20px;
            line-height: 25px;
            color: #C6C6C6;
        }

        :focus {
            outline: none;
        } 
    }

    button {
        border: none;
        background: none;

        .icon {
            font-size: 22px;
            cursor: pointer;
            color: #C6C6C6;
            cursor: pointer;
        }
    }

    @media (max-width: 600px) {
        width: 100%;
        position: absolute;
        top: 0;
        z-index: 1;
    }
`