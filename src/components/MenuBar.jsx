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
                
                <li><PiSquaresFourThin/></li>
                
                <li><Link to={"/profile"}><IoPersonOutline/></Link></li>
                
                <li><GoGear/></li>
            </ul>
        </MenuBarStyled>
    )
}

export default MenuBar;