import styled from "styled-components";

export const MenuBarStyled = styled.div`
    display: flex;
    align-items: center;
    background-color: #131415;
    color: #ccc;
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    
    width: 20%;
    min-width: 300px;
    height: 60px;
    border-radius: 10px;

    & ul{
        width: 100%;
        height: 100%;
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 50px;
        font-size: 25px;

        & li:hover{
            transform: scale(1.1);
            transition: all 0.3s ease;
            cursor: pointer;
        }
    }
    & ul li a {
        color: white; 
        text-decoration: none;
        display: flex;
        align-items: center;
        &:visited {
            color: #ccc;
        }
        &:hover {
            color: #aaa;
        }
    }
`