import styled from 'styled-components';

export const Group = styled.div`
  display: flex;
  line-height: 28px;
  align-items: center;
  position: relative;
  width: 100%;
  margin: 0 1rem;
`;

export const Input = styled.input`
  font-family: "Montserrat", sans-serif;
  width: 100%;
  height: 45px;
  padding-left: 2.5rem;
  box-shadow: 0 0 0 1.5px #2b2c37, 0 0 25px -17px #000;
  border: 0;
  border-radius: 12px;
  background-color: #131415;
  outline: none;
  color: #bdbecb;
  transition: all 0.25s cubic-bezier(0.19, 1, 0.22, 1);
  cursor: text;
  z-index: 0;

  &::placeholder {
    color: #bdbecb;
  }

  &:hover {
    box-shadow: 0 0 0 2.5px #2f303d, 0px 0px 25px -15px #000;
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    box-shadow: 0 0 0 2.5px #2f303d;
  }
`;

export const SearchIcon = styled.svg`
  position: absolute;
  left: 1rem;
  fill: #bdbecb;
  width: 1rem;
  height: 1rem;
  pointer-events: none;
  z-index: 1;
`;