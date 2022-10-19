import React from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from "react";
import UserContext from "../../Contexts/UserContext"
import { HiUserCircle } from "react-icons/hi";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";

export default function Header() {
  const img = localStorage.getItem("img");
  const [open, setOpen] = useState(false);
  const [arrow, setArrow] = useState(<SlArrowDown />);
  const navigate = useNavigate();
  const context = useContext(UserContext);
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
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const signout = axios.delete(context.BASE_URL + '/signout', config);

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
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const signoutall = axios.delete(context.BASE_URL + '/signoutall', config);

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
        <h1>Linkr</h1>
        {/* <img src="" alt=".." /> */}
        <Dropdown ref={menuRef}>
          <DropdownTrigger onClick={() => { setOpen(!open); toggleArrow(); }}>
            {img === 'null' ? <ContainerHiUserCircle>{arrow}<HiUserCircle /></ContainerHiUserCircle> : <>{arrow}<img src={img} alt="" /></>}
          </DropdownTrigger>

          <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
            <nav>
              <ul>
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
  width: 100%;
  background-color: #151515;
  color: #ffffff;
  height: 72px;
  position: fixed;
  top: 0;
  z-index: 1;
  h1 {
    font-family: "Passion One";
    font-weight: 700;
    font-size: 49px;
    line-height: 54px;
    letter-spacing: 0.05em;
    padding: 10px 28px;
  }
  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    margin: 0 15px 0 15px;
  }
  img {
    background-color: #ffffff;
    border-radius: 50%;
    font-size: 32px;
    width: 53px;
    height: 53px;
    margin-left: 12px;
  }
`;

const ContainerHiUserCircle = styled(HiUserCircle)`
  transform: scale(3);
  margin-right: 24px;
`;

const Dropdown = styled.div`
  ul{
    list-style: none;
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
  }
`;

const DropdownTrigger = styled.div``;