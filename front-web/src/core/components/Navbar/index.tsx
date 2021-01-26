import React from 'react'
import './styles.scss'
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="row bg-primary main-nav" >
            <div className="col-2">
                <Link to="/" className="nav-logo-text">
                    <h4>Ds Catalog</h4>

                </Link>

            </div>

            <div className="col-6 offset-2" >
                <ul className="main-menu">
                    <li>
                        <NavLink activeClassName="active" to="/" exact>HOME</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/catalog">CATALOGO</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/admin">ADMIN</NavLink>
                    </li>
                </ul>

            </div>
        </nav>
    );
}

export default Navbar;