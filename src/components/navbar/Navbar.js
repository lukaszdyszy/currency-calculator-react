import React, {useState} from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    const ifDark = () => {
        if(props.currentTheme=='dark'){
            return 'active';
        } else {
            return 'inactive';
        }
    }
    const ifLight = () => {
        if(props.currentTheme=='light'){
            return 'active';
        } else {
            return 'inactive';
        }
    }

    const [menuToggle, menuToggler] = useState('hidden');
    const toggle = () => {
        if(menuToggle === 'hidden'){
            menuToggler('shown');
        } else {
            menuToggler('hidden');
        }
    }

    const themeSwitch = () => {
        if(props.currentTheme=='dark'){
            props.setTheme('light');
        } else {
            props.setTheme('dark');
        }
    }

    const switchRender = () => {
        if(props.currentTheme=='dark'){
            return(
                <i className="far fa-sun"></i>
            )
        } else {
            return(
                <i className="far fa-moon"></i>
            )
        }
    }

    return (
        <div className="navbar">
            <div className="left">
                <div className="theme-switch" onClick={themeSwitch}>
                    {
                        switchRender()
                    }
                </div>
            </div>
            <div className="right">
                <i className="fas fa-bars fa-2x" onClick={toggle}></i>
                <div className={`main-menu ${menuToggle}`}>
                    <i className="fas fa-times" onClick={toggle}></i>
                    <nav>
                        <ul className="menu">
                            <li><Link to="/">Kalkulator</Link></li>
                            <li><Link to="/charts">Wykresy</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
            
        </div>
    )
}

export default Navbar;