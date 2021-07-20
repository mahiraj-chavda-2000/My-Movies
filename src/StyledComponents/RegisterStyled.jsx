import styled, { css } from "styled-components";
import { mediaQueries } from "../utils/mediaQueries";

export const MainWraper = styled.div`
  display: flex;

  ${mediaQueries("md")`
    margin-top :8%
  `}

  ${mediaQueries("xxxl")`
    margin-top: 10%;
    flex-direction: row;
  `}
`;

export const HeaderStyle = styled.h1`
  font-weight: bold;
  color: #968c8c;
  ${mediaQueries("xxxl")`
   font-size :30px ;
  `}
  ${mediaQueries("xsss")`
    font-size :20px 
  `}
`;

export const Styledform = styled.form`
  width: 100%;
  ${mediaQueries("xxxl")`
    max-width :200%;
  `}
`;

export const InputStyle = styled.input`
  font-size: 18px;
  padding: 10px;
  margin: 10px;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  ::placeholder {
    color: palevioletred;
  }
  ${mediaQueries("xsss")`
   font-size: 12px;
    padding: 6px;
  margin: 6px;
  `}
`;
export const Button = styled.button`
  background: green;
  color: #fff;
  cursor: pointer;
  margin-bottom: 0;
  text-transform: uppercase;

  border-radius: 5px;
  height: 35px;
  border-color: transparent;
  box-shadow: 0px;
  outline: none;
  transition: 0.15s;
  text-align: center;
  &:active {
    background-color: #f1ac15;
  }
  ${(props) =>
    props.primary &&
    css`
      background: #00aec9;
      color: #fff;
      cursor: pointer;
      margin-bottom: 0;
      text-transform: uppercase;

      border-radius: 5px;
      height: 35px;
      border-color: transparent;
      box-shadow: 0px;
      outline: none;
      transition: 0.15s;
      text-align: center;
      &:active {
        background-color: #f1ac15;
      }
    `}
  ${(props) =>
    props.secondary &&
    css`
      background: red;
      color: #fff;
      cursor: pointer;
      margin-bottom: 0;
      text-transform: uppercase;

      border-radius: 5px;
      height: 35px;
      border-color: transparent;
      box-shadow: 0px;
      outline: none;
      transition: 0.15s;
      text-align: center;
      &:active {
        background-color: #f1ac15;
      }
    `}
      ${mediaQueries("xsss")`
    height: 25px;
  `}
`;

export const ParaStyled = styled.p`
  color: red;
  font-size: 13px;
  ${mediaQueries("xxxl")`
  
    font-size: 20px;
  `}
`;
