import "./Navbar.css";

// React router dom
import { NavLink } from "react-router-dom";

//Hooks
import { useLogOut } from '../hooks/useLogOut';

//React Icons
import { FaUser } from 'react-icons/fa';

type Props = {
    user: any;
}

const Navbar = (props: Props) => {
    const { logout } = useLogOut();
    return (
        <nav className="navbar">
            <NavLink to="/" className="brand">
                Task <span>Manager</span>
            </NavLink>
            <ul className="links_list">
                <li><NavLink to="/">Home</NavLink></li>
                {!props.user && (
                    <>
                        <li><NavLink to="/about">About</NavLink></li>
                        <li><NavLink to="/register">Register</NavLink></li>
                        <li><NavLink to="/login">Login</NavLink></li>
                    </>
                )}
                {props.user && (
                    <>
                        <li><button onClick={logout}>Logout</button></li>
                        <FaUser /><span className="user-name">{props.user.displayName.split(' ')[0][0].toUpperCase() + props.user.displayName.split(' ')[0].substring(1)}</span>
                    </>

                )}
            </ul>
        </nav>
    )
}

export default Navbar