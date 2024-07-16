import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import usercontext from '../../context/notes/NoteContext';
function Resetpassword(props) {

    const context = useContext(usercontext)
    const { mode } = context

    const [oldshow, oldsetshow] = useState(false);
    const [newshow, newsetshow] = useState(false);
    const [conformshow, conformsetshow] = useState(false);
    const [oldpassword, setoldpassword] = useState();
    const [newpassword, setnewpassword] = useState();
    const [conformpassword, setconformpassword] = useState();
    let navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("UserDeatils"))
    const id = user._id
    const handlesubmit = async (e) => {
        e.preventDefault()

        const url = `http://localhost:5000/api/auth/resetpassword/${id}`

        const response = await fetch(url, {
            method: 'PUT',

            headers: {
                'Content-Type': 'application/json',
                'authtoken': localStorage.getItem("token")

            },
            body: JSON.stringify({ oldpassword: oldpassword, newpassword: newpassword, conformpassword: conformpassword, password: user.password })
        })
        const json = await response.json()
        console.log(json, json.success)
        if (json.success) {
            props.showAlert("Password Updated", "success")

            navigate("/user_profile")
        }
        else {
            props.showAlert("Invalid Credentials!", "danger")
        }
    }
    const onchange = (e) => {

        if (e.target.name == "oldpassword") {

            setoldpassword(e.target.value)
        }
        else if (e.target.name == "newpassword") {
            setnewpassword(e.target.value)
        }
        else if (e.target.name == "conformpassword") {
            setconformpassword(e.target.value)
        }
    }
    document.body.style.backgroundColor = mode === 'light' ? 'white' : '#060506cf'

    return (

        <form className='res_form my-5 w-25 h-50' autoComplete='off' style={{ border: `${mode === 'light' ? '2px solid #e9b8e9' : '2px solid white'}`, borderRadius: '4px', backgroundColor: `${mode === 'light' ? 'white' : 'black'}` }} onSubmit={handlesubmit}>

            <div className="mb-3 my-3 mx-3">
                <label htmlFor="password" className={`${mode === 'light' ? 'textlight' : 'textdark'} form-label`}>Old Password</label>
                <div className='d-flex'>
                    <input type={oldshow == false ? 'password' : 'text'} className={` form-control ${mode === 'light' ? 'bgcolor' : 'bgcolordark'}`} id="oldpassword" name='oldpassword' value={oldpassword} onChange={onchange} />
                    <i className="fa-solid fa-eye icon2 eyeicon" style={{ color: "black", cursor: 'pointer' }} onClick={(e) => {
                        if (oldshow === true) oldsetshow(false)
                        else oldsetshow(true)
                    }}></i>

                </div>

            </div>
            <div className="mb-3 my-3 mx-3">
                <label htmlFor="password" className={`${mode === 'light' ? 'textlight' : 'textdark'} form-label`}>New Password</label>
                <div className='d-flex'>
                    <input type={newshow == false ? 'password' : 'text'} className={` form-control ${mode === 'light' ? 'bgcolor' : 'bgcolordark'}`} id="newpassword" name='newpassword' value={newpassword} onChange={onchange} />
                    <i className="fa-solid fa-eye icon2 eyeicon" style={{ color: "black", cursor: 'pointer' }} onClick={(e) => {
                        if (newshow === true) newsetshow(false)
                        else newsetshow(true)
                    }}></i>

                </div>
            </div>
            <div className="mb-3 my-3 mx-3">
                <label htmlFor="password" className={`${mode === 'light' ? 'textlight' : 'textdark'} form-label`} >Confirm Password</label>
                <div className='d-flex'>
                    <input type={conformshow == false ? 'password' : 'text'} className={` form-control ${mode === 'light' ? 'bgcolor' : 'bgcolordark'}`} id="conformpassword" name='conformpassword' value={conformpassword} onChange={onchange} />
                    <i className="fa-solid fa-eye icon2 eyeicon" style={{ color: "black", cursor: 'pointer' }} onClick={(e) => {
                        if (conformshow === true) conformsetshow(false)
                        else conformsetshow(true)
                    }}></i>

                </div>
            </div>
            <div className="text-center">
                <button type="submit" className="btn btn-primary my-3" style={{ backgroundColor: 'black', width: '50%' }}>Reset Password</button>

            </div>

        </form>

    )
}

export default Resetpassword
