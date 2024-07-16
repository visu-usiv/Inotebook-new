import { React, useEffect, useState, useContext } from 'react'
import { Link, useLocation } from "react-router-dom";
import { Sun1, Moon } from 'iconsax-react'
import usercontext from '../context/notes/NoteContext';

const Navbar = (props) => {
    const context = useContext(usercontext)
    const { mode, setmode } = context
    const [user, setUser] = useState([]);
    let location = useLocation();
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("UserDeatils"));
        if (items) {
            setUser(items);
        }
    }, [location]);
    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("UserDeatils")
        props.showAlert("successfully logged out", "dark")
    }

    const modehandler = () => {
        if (mode === 'light') {
            setmode("dark")
        }
        else {
            setmode('light');
        }
    }
    return (




        <>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: `${mode === 'light' ? 'rgb(233 184 233)' : 'black'}` }}>
                <div className="container-fluid">

                    <a className="navbar-brand" style={{ color: `${mode === 'light' ? 'black' : 'white'}` }} ><i className="fa-solid fa-pencil" style={{ transform: 'rotate(135deg)', color: `${mode === 'light' ? 'black' : 'white'}` }}></i>NoteBook</a>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/" style={{ color: `${mode === 'light' ? '#343434' : '#b5adad'}` }}>Home</Link>
                            </li>


                        </ul>

                    </div>

                    {!localStorage.getItem("token") ? <div className="gap-2 d-flex justify-content-end">
                        <Link className="btn btn-dark me-md-2" to="/login" role="button">Login</Link>
                        <Link className="btn btn-dark me-md-2" to="/signup" role="button">Sign up</Link>

                    </div> : <div className="gap-4 d-flex justify-content-end">
                        <div> <Link to='/user_profile'> <img src={user.avatar} alt="avatar"
                            className="imground " style={{ border: `${mode === 'light' ? '1px solid black' : '2px solid whitesmoke'}` }} /></Link> </div>
                        <div>  <Link className="btn btn-dark my-2" to="/login" onClick={handleLogout} role="button">Logout</Link></div>


                    </div>}
                    {mode === 'light' ?
                        <Moon size="20" color="#000000" variant="Outline" onClick={modehandler} cursor={"pointer"} style={{ marginLeft: '10px', marginRight: '5px' }} />

                        :
                        <Sun1 size="20" variant="Outline" cursor={"pointer"} style={{ color: 'white', marginLeft: '10px', marginRight: '5px' }} onClick={modehandler} />
                    }

                </div>
            </nav>
        </>
    )
}

export default Navbar
