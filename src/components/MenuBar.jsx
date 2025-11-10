import { MenuBarStyled } from "../styles/MenuBar";
import { BsHouse } from "react-icons/bs";
import { PiSquaresFourThin } from "react-icons/pi";
import { IoPersonOutline } from "react-icons/io5";
import { GoGear } from "react-icons/go";
import { Link } from "react-router-dom";

const MenuBar = () => {
    return(
        <MenuBarStyled>
            <ul>
                <li><Link to={"/"}><BsHouse/></Link></li>
                
                <li><Link to={"/collections"}><PiSquaresFourThin/></Link></li>
                
                <li><Link to={"/"}><IoPersonOutline/></Link></li>
                
                <li><GoGear/></li>
            </ul>
        </MenuBarStyled>
    )
}

export default MenuBar;