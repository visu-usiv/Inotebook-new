import React, { useState, useEffect, useContext, useRef } from 'react'
import { Link } from "react-router-dom";
import usercontext from '../../context/notes/NoteContext';
function Profile(props) {

    const context = useContext(usercontext)
    const { mode, setmode } = context
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("UserDeatils")));

    // window.location.reload()

    document.body.style.backgroundColor = mode === 'light' ? '#eee' : '#060506cf'

    return (

        <>

            <section >
                <div className="container py-4">
                    <div className="row">
                        <div className=" rounded-3 my-4 p-2 mb-4" style={{ backgroundColor: `${mode === 'light' ? 'white' : 'black'}` }}>
                            <p className='breadcrumb-item' style={{ color: `${mode === 'light' ? 'black' : 'white'}` }} >User Profile</p>
                        </div>

                    </div>

                    <div className="  profiledit">

                        <div className={`${mode === 'light' ? `card` : `card_dark`} mb-4 left_side`}>
                            <div className="py-3 text-center d-flex flex-column "  >
                                <div className='my-4'>
                                    <img src={user.avatar} alt="avatar"
                                        className=" img-fluid " style={{ border: `${mode === 'light' ? '' : '2px solid white'}` }} />

                                    <h5 className="my-4 " style={{ color: `${mode === 'light' ? 'black' : 'white'}` }}>{user.name}</h5>


                                </div>
                            </div>


                        </div>

                        <div className={`mb-4 right_side ${mode === 'light' ? 'card' : 'card_dark'}`} style={{ height: '19rem ' }}>
                            <div className="py-2 px-3" >
                                <Link to="/editprofile">   <div className='displayedit' data-hover="Edit Profile">     <i className="fa-regular fa-pen-to-square fa-xl " style={{ color: `${mode === 'light' ? 'black' : 'white'}` }} ></i></div></Link>
                                <div className='my-5 d-flex flex-column'>
                                    <div className="d-flex flex-row gapprofile">
                                        <div className={`${mode === 'light' ? 'textlight' : 'textdark'}`}>
                                            Full Name
                                        </div>
                                        <div className={`${mode === 'light' ? 'textlight' : 'textdark'}`}>

                                            {user.name}

                                        </div>
                                    </div>
                                    <hr style={{ color: `${mode === 'light' ? 'black' : 'white'}` }} />
                                    <div className="d-flex flex-row gapprofile">
                                        <div className={`${mode === 'light' ? 'textlight' : 'textdark'}`}>
                                            Email
                                        </div>
                                        <div style={{ marginLeft: '2rem' }} className={`${mode === 'light' ? 'textlight' : 'textdark'}`}>

                                            {user.email}

                                        </div>
                                    </div>
                                    <hr style={{ color: `${mode === 'light' ? 'black' : 'white'}` }} />

                                    <div className="d-flex flex-row gapprofile">
                                        <div className={`${mode === 'light' ? 'textlight' : 'textdark'}`}>
                                            Reset Password
                                        </div>
                                        <div >
                                            <Link className="reset" style={{ textDecoration: 'underline', marginLeft: '-2.5rem' }} to="/resetpassword">Reset Password</Link>
                                        </div>
                                    </div>
                                    <hr style={{ color: `${mode === 'light' ? 'black' : 'white'}` }} />
                                </div>



                            </div>
                        </div>



                    </div>
                </div>
            </section>

        </>
    )
}

export default Profile
