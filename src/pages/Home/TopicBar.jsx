import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  background-color: #131415;
  margin-top: 5px;
  min-width: 600px;
  height: 40px;
  align-items: center;
  justify-content: space-around;
  border-radius: 10px;
`;

const CategoryButton = styled.button`
  outline: none;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 12px;
  transition: all ease-in-out 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
  }
`;

const CategoryBar = ({ onSearch }) => {
  const categories = ["Tech", "Cine", "Música", "Arte", "Deportes", "Argentina", "Naturaleza", "Otros"];

  return (
    <ButtonContainer>
      {categories.map((cat) => (
        <CategoryButton key={cat} onClick={() => onSearch(cat)}>{cat}</CategoryButton>
      ))}
    </ButtonContainer>
  );
};

export default CategoryBar;
