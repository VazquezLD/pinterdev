import styled from 'styled-components';
import SearchBar from './SearchBar';

const NavbarStyled = styled.div`
    width: 40%;
    height: 60px;
    border-radius: 10px;
    display: flex;
    color: white;
    background-color: transparent;
    position: fixed;
    z-index: 100;
`

const Navbar = () => {
    return(
        <NavbarStyled>
            <SearchBar/>
        </NavbarStyled>
    )
}

export default Navbar;