import React, { useContext, useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import usercontext from '../../context/notes/NoteContext';

function Edit_Profile(props) {
    const context = useContext(usercontext)
    const { updateUser, alertshow, mode } = context


    const [user, setUser] = useState(JSON.parse(localStorage.getItem("UserDeatils")));
    const id = user._id
    const [updateavatar, setupdateavatar] = useState("")
    const [updatedname, setupdatedname] = useState("")
    const [updateemail, setupdatedemail] = useState("")
    const [editoption, seteditoption] = useState(false)


    const editAvatar = (e) => {
        e.preventDefault();
        seteditoption(true)
    }
    const registerhander = async (e) => {
        e.preventDefault();
        if (e.target.name === 'updateavatar') {
            const data = new FormData();
            data.append("file", e.target.files[0]);
            data.append("upload_preset", "we1wwysc");
            data.append("cloud_name", "dcaalrmnb");
            await axios.post("https://api.cloudinary.com/v1_1/dcaalrmnb/image/upload", data).then((res) => res.data)
                .then((data) => {
                    setupdateavatar(data.url.toString());
                    console.log(data.url.toString());

                });


        }
        if (e.target.name === 'updatedname') {
            setupdatedname(e.target.value)
        }
        if (e.target.name === 'updateemail') {
            setupdatedemail(e.target.value)
        }
    }
    const handlesubmit = (e) => {
        e.preventDefault()

        updateUser(id, updatedname, updateemail, updateavatar)

        if (alertshow === "success") {
            props.showAlert("Profile Updated", "info")
            window.location.reload()
        }
        if (alertshow === "danger") {
            props.showAlert("Invalid Credentials!", "danger")

        }




    }
    document.body.style.backgroundColor = mode === 'light' ? '#eee' : '#060506cf'
    return (
        <>

            <section >
                <div className="container py-2" >
                    <div className="row">
                        <div className="rounded-3 my-4 p-2 mb-4" style={{ backgroundColor: `${mode === 'light' ? 'white' : 'black'}` }}>
                            <p className='breadcrumb-item' style={{ color: `${mode === 'light' ? 'black' : 'white'}` }} >User Profile</p>
                        </div>

                    </div>

                    <div className="  profiledit">

                        <div className={`${mode === 'light' ? `card` : `card_dark`} mb-4 left_side`}>
                            <div className="py-3 text-center d-flex flex-column " >
                                <div className='my-4'>
                                    <img src={user.avatar} alt="avatar"
                                        className=" img-fluid " style={{ border: `${mode === 'light' ? '' : '2px solid white'}` }}
                                    />

                                    <h5 className="my-4 " style={{ color: `${mode === 'light' ? 'black' : 'white'}` }}>{user.name}</h5>

                                    {editoption === false ? <button className={`btn ${mode === 'light' ? 'btn-outline-dark' : 'btn-outline-light'} profile-btn my-4`} onClick={editAvatar}>Edit avatar</button>
                                        : <input type='file' name='updateavatar' accept='image/*' onChange={registerhander} className='my-4 mx-5'></input>}
                                </div>
                            </div>


                        </div>

                        <div className={`mb-4 right_side ${mode === 'light' ? 'card' : 'card_dark'}`} style={{ height: '22rem ', background: `${mode === 'light' ? 'white' : 'black'}` }}>
                            <div className="py-2 px-3" >
                                <Link to="/editprofile">

                                    <div className='displayedit' data-hover="Edit Profile">

                                        <i className="fa-regular fa-pen-to-square fa-xl " style={{ color: `${mode === 'light' ? 'black' : 'white'}` }}></i>

                                    </div>


                                </Link>
                                <div className='my-5 d-flex flex-column'>
                                    <div className="d-flex flex-row gapprofile">
                                        <div className={`${mode === 'light' ? 'textlight' : 'textdark'}`}>
                                            Full Name
                                        </div>
                                        <div >
                                            <input type='text' value={updatedname} placeholder={user.name} name='updatedname' onChange={registerhander} autoComplete='off'></input>


                                        </div>
                                    </div>
                                    <hr style={{ color: `${mode === 'light' ? 'black' : 'white'}` }} />
                                    <div className="d-flex flex-row gapprofile">
                                        <div className={`${mode === 'light' ? 'textlight' : 'textdark'}`}>
                                            Email
                                        </div>
                                        <div style={{ marginLeft: '2rem' }}>

                                            <input type='text' value={updateemail} placeholder={user.email} name='updateemail' onChange={registerhander} autoComplete='off'></input>


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
                <div className="text-center">
                    <button type="submit" className="btn btn-primary " style={{ backgroundColor: 'black', width: '50%' }} onClick={handlesubmit}>Update Profile</button>

                </div>
            </section>

        </>
    )
}

export default Edit_Profile
