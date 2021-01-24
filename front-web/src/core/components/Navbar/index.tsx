import React from 'react'
import './styles.scss'

const Navbar =() =>{
 return(
    <nav className="row bg-primary main-nav" >
        <div className="col-2">
            <a href="#" className="nav-logo-text">
                <h4>Ds Catalog</h4>

            </a>

        </div>

        <div className="col-6 offset-2" >
            <ul className="main-menu">
                <li>
                    <a className="active" href="#">HOME</a>
                </li>
                 <li>
                    <a href="#">CATALOGO</a>
                </li>
                 <li>
                    <a href="#">ADMIN</a>
                </li>
            </ul>
            
        </div>
    </nav>
 )  ;
}

export default Navbar;