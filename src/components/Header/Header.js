import React from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { HiUserCircle } from "react-icons/hi";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import ProfilePicture from "../../Styles/ProfilePicture";
import SearchBar from "../SearchBar/Search";

export default function Header() {
  const img = localStorage.getItem("img");
  const userId = localStorage.getItem("linkr-userId");
  const [open, setOpen] = useState(false);
  const [arrow, setArrow] = useState(<SlArrowDown />);
  const navigate = useNavigate();
  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setArrow(<SlArrowDown />);
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handler);
  }, []);

  function SignOut() {
    let token = localStorage.getItem("token");
    token = JSON.parse(token);
    token = token.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const signout = axios.delete(process.env.REACT_APP_API_BASE_URL + '/signout', config);

    signout.then(() => {
      localStorage.clear();
      navigate('/');
    });

    signout.catch((error) => {
      console.log(error);
      localStorage.clear();
      navigate('/');
    });
  }

  function SignOutAll() {
    let token = localStorage.getItem("token");
    token = JSON.parse(token);
    token = token.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const signoutall = axios.delete(process.env.REACT_APP_API_BASE_URL + '/signoutall', config);

    signoutall.then(() => {
      localStorage.clear();
      navigate('/');
    });

    signoutall.catch((error) => {
      console.log(error);
      localStorage.clear();
      navigate('/');
    });
  }

  function toggleArrow() {
    if (open) {
      setArrow(<SlArrowDown />);
    } if (!open) {
      setArrow(<SlArrowUp />);
    }
  }

  return (
    <Wraped>
      <div>
        <h1 onClick={() => navigate('/timeline')}>linkr</h1>

        <div className="searchBar">
          <SearchBar />
        </div>

        <Dropdown ref={menuRef}>
          <DropdownTrigger onClick={() => { setOpen(!open); toggleArrow(); }}>
            {img === 'null' ? 
              <>{arrow}<ContainerHiUserCircle /></> : 
              <>{arrow}<ProfilePicture img ={img}/></>
            }
          </DropdownTrigger>

          <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
            <nav>
              <ul>
                <li onClick={() => { navigate(`/user/${userId}`) }}>Me</li>
                <li onClick={() => { navigate(`/timeline`) }}>Timeline</li>
                <li onClick={() => { SignOut(); setOpen(!open); toggleArrow(); }}>SignOut</li>
                <li onClick={() => { SignOutAll(); setOpen(!open); toggleArrow(); }}>SignOut All</li>
              </ul>
            </nav>
          </div>
        </Dropdown>
      </div>
    </Wraped>
  );
}

const Wraped = styled.header`
  width: 100vw;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #151515;
  color: #ffffff;
  position: fixed;
  top: 0;
  z-index: 1;

  h1 {
    font-family: "Passion One";
    font-weight: 700;
    font-size: 49px;
    line-height: 54px;
    letter-spacing: 0.05em;
    cursor: pointer;
  }

  >div{
    width: 95vw;
    justify-content: space-between;
  }

  div {
    display: flex;
    align-items: center;
    text-align: center;
  }
  
  .searchBar {
    @media (max-width: 600px) {        
      display: none;
    }
  }
  
  @media (max-width: 600px) {        
      z-index: 2;
  }

`;

const ContainerHiUserCircle = styled(HiUserCircle)`
  width: 50px;
  height: 50px;
`;

const Dropdown = styled.div`
  ul{
    list-style: none;
  }

  Link {
    text-decoration: none;
    color: red;
  }

  a:visited {
    color: none;
  }

  a {
    text-decoration: none;
  }

  .dropdown-menu.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    transition: var(500ms) ease;
  }

  .dropdown-menu.inactive {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    transition: var(500ms) ease;
  }

  .dropdown-menu {
    position: absolute;
    top: 70px;
    right: -70px;
    background-color: #151515;
    border-radius: 0px 0px 20px 20px;
    padding: 10px 20px;
    width: 200px;

  :before {
    content: '';
    position: absolute;
    top: -5px;
    right: 20px;
    height: 20px;
    width: 20px;
    transform: rotate(45deg);
  }

  li {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    letter-spacing: 0.05em;
    color: #FFFFFF;
    padding: 8px 0px 8px 0px;
  }

  ul li:hover {
    color: #E5E5E5;
    cursor: pointer;
  }

  @media (max-width: 600px) {        
      width: 50vw;
      position: absolute;
    }
  }
`;

const DropdownTrigger = styled.div`
  width: 75px;
  justify-content: space-between;
`;
