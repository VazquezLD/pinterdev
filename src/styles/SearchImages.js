import styled from 'styled-components';

export const Group = styled.div`
  display: flex;
  line-height: 28px;
  align-items: center;
  position: relative;
  width: 100%;
`;

export const Input = styled.input`
  font-family: "Montserrat", sans-serif;
  width: 600px;
  height: 45px;
  padding-left: 2.5rem;
  
  border: 0;
  border-radius: 12px;
  background-color: #131415;
  outline: none;
  color: #bdbecb;
  transition: all 0.25s cubic-bezier(0.19, 1, 0.22, 1);
  cursor: text;
  z-index: 0;

  &:hover {
    box-shadow: 0 0 0 2.5px #2f303d, 0px 0px 25px -15px #000;
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