import "./Navbar.css";

// React router dom
import { NavLink } from "react-router-dom";

//Hooks
import { useLogOut } from '../hooks/useLogOut';

//React Icons
import { FaUser } from 'react-icons/fa';

//Context
import { useAuthValue } from "../context/AuthContext";

type Props = {}

const Navbar = (props: Props) => {
    const { logout } = useLogOut();
    const { user } = useAuthValue();

    return (
        <nav className="navbar">
            <NavLink to="/" className="brand">
                Task <span>Manager</span>
            </NavLink>
            <ul className="links_list">

                {!user && (
                    <>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/about">About</NavLink></li>
                        <li><NavLink to="/register">Register</NavLink></li>
                        <li><NavLink to="/login">Login</NavLink></li>
                    </>
                )}
                {user && (
                    <>
                        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                        <li><NavLink to="/events">Events</NavLink></li>
                        <li><NavLink to="/profile">Profile</NavLink></li>
                        <span className="user-name"><FaUser />{user.displayName.split(' ')[0][0].toUpperCase() + user.displayName.split(' ')[0].substring(1)}</span>
                        <li><button className="logout" onClick={logout}>Logout</button></li>
                    </>

                )}
            </ul>
        </nav>
    )
}

export default Navbar