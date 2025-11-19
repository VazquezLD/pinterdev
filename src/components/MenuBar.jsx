import { MenuBarStyled } from "../styles/MenuBar";
import { BsHouse } from "react-icons/bs";
import { PiSquaresFourThin } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import {useAuth} from "../context/AuthContext"
import { useNavigate } from "react-router-dom";

const MenuBar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    return(
        <MenuBarStyled>
            <ul>
                <li><Link to={"/"}><BsHouse/></Link></li>
                <li><Link to={"/collections"}><PiSquaresFourThin/></Link></li>
                <li onClick={handleLogout}><Link><IoIosLogOut/></Link></li>
            </ul>
        </MenuBarStyled>
    )
}

export default MenuBar;