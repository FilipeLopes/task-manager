import { NavLink } from "react-router-dom";
import "./Navbar.css";

type Props = {}

const Navbar = (props: Props) => {
    return (
        <nav className="navbar">
            <NavLink to="/" className="brand">
                Task <span>Manager</span>
            </NavLink>
            <ul className="links_list">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navbar