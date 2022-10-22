import styled from "styled-components";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { HiUserCircle } from "react-icons/hi";

export const HeartDisliked = styled(BsHeart)`
  font-size: 25px;
  color: #FFF;
  margin-top: 20px;
  margin-bottom: 5px;
  cursor: pointer;
`;

export const HeartLiked = styled(BsHeartFill)`
  font-size: 25px;
  color: red;
  margin-top: 20px;
  margin-bottom: 5px;
  cursor: pointer;
`;

export const ContainerHiCircle = styled(HiUserCircle)`
  width: 50px;
  height: 50px;
  cursor: pointer;
`