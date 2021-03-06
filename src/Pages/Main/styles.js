import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  > div {
    margin: 5vh 5vw 0 5vw;
  }
`;

export const HelpContainer = styled.div`
  flex-direction: column;
  margin: 0 5vw;
  div {
    margin-bottom: 5vh;
  }
  button {
    background: none;
    border: 0;
    :focus {
      outline: none;
    }
    svg {
      font-size: 30px;
      transition: font-size 10s;
    }
  }
  h2 {
    margin-top: 15px;
  }
  h4 {
    margin-top: 15px;
  }
`;

export const FormContainer = styled.div`
  margin: 5vh 5vw 0 0 !important;
  flex-direction: column;
  form {
    max-width: 50vw;
    min-width: 25vw;
    display: flex;
    flex-direction: column;
    select {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #000;
      margin: 0 0 10px;

      font-weight: bold;
      font-size:14px;
      option {
        color: rgba(0, 0, 0, 0.7);
        font-weight: bolder;
      }
    }
    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #000;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(0, 0, 0, 0.7);
        font-weight: bolder;
      }
    }
    span {
      color: rgba(0, 0, 0, 0.7);
      align-self: center;
      font-weight: 600;
      font-size: 24px;
      margin-bottom: 10px;
    }

    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
      margin: 10px 0 20px;
    }
  }
  
  a {
    color: #fff;
    margin-top: 15px;
    font-size: 16px;
    opacity: 0.8;
    text-decoration: none; 
    &:hover {
      opacity: 1;
    }
  }
`;

export const SearchContainer = styled.div`
  margin: 5vh 0 0 5vw !important;
  flex-direction: column;
  form {
    max-width: 50vw;
    min-width: 15vw;
    display: flex;
    flex-direction: row;
    button {
        width: 100%;
        height: 44px;
        background: #070299;
        font-weight: bold;
        color: #fff;
        border: 0;
        font-size: 16px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    select {
      min-width: 10vw;
      background: rgba(0, 0, 0, 0.1);
      border: 0;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      height: 44px;
      color: #000;

      font-weight: bold;
      font-size:14px;

      option {
        color: rgba(0, 0, 0, 0.7);
        font-weight: bolder;
      }
    }
  }
`;

export const Button = styled.button`

        width: 100%;
        margin: 10px 0 0;
        height: 44px;
        background: #070299;
        font-weight: bold;
        color: #fff;
        border: 0;
        border-radius: 4px;
        font-size: 16px;
        /* ${props =>
        props.color &&
        css`
            background: ${props.color};
        `} */
`;
export const SendBtn = styled.button`
      flex-direction: row;
      margin: 5px 0 0;
      height: 44px;
      width: 50%;
      background: #1246f3;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;
      ${props =>
        props.color &&
        css`
            background: ${props.color};
        `}
`;

export const BoxContainer = styled.button`
    background-color: rgba(255,255,255,0.4);
    border: 0;
    margin: 15px;
    border-radius: 4px;
    :focus {
      outline: none;
    }
    &:hover {
        background-color: rgba(255,255,255,0.6);
    }
`;
