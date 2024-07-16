import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import usercontext from '../context/notes/NoteContext'
const Signup = (props) => {

    const context = useContext(usercontext)
    const { mode } = context

    const [cred, setCred] = useState({ name: "", email: " ", password: "" })
    const [avatar, setavatar] = useState("")
    const [show, setshow] = useState(false);
    let navigate = useNavigate();
    const settingprofile = async (file) => {
        console.log(file)
        if (file === undefined) {


            return;
        }


        else {
            const data = new FormData();
            data.append("file", file[0]);
            data.append("upload_preset", "we1wwysc");
            data.append("cloud_name", "dcaalrmnb");
            await axios.post("https://api.cloudinary.com/v1_1/dcaalrmnb/image/upload", data).then((res) => res.data)
                .then((data) => {
                    setavatar(data.url.toString());


                });
        }
    };
    const handlesubmit = async (e) => {
        e.preventDefault();
        // const url = `http://localhost:5000/api/auth/createuser`
        const url = `api/auth/createuser`
        const response = await fetch(url, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',


            },
            body: JSON.stringify({ name: cred.name, email: cred.email, password: cred.password, avatar: avatar })
        })
        const json = await response.json()

        if (json.success) {
            props.showAlert("Sing up successfully", "success")
            localStorage.setItem("token", json.token)
            localStorage.setItem("UserDeatils", JSON.stringify(json.user))
            navigate("/")
        }
        else {
            props.showAlert("Invalid Credentials!", "danger")
        }
    }

    const onchange = (e) => {

        setCred({ ...cred, [e.target.name]: e.target.value })
    }
    document.body.style.backgroundColor = mode === 'light' ? 'white' : '#060506cf'
    document.body.style.color = mode === 'light' ? 'black' : 'white'
    return (
        <>
            <div className='container my-5' >
                <form className='res_form' autoComplete='off' style={{ border: `${mode === 'light' ? '6px solid #e9b8e9' : '2px solid white '}`, borderRadius: '4px', backgroundColor: `${mode === 'light' ? 'white' : 'black'}` }} onSubmit={handlesubmit}>

                    <div className="mb-3 my-3 mx-4">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className={` form-control ${mode === 'light' ? 'bgcolor' : 'bgcolordark'}`} style={{ width: '97%' }} id="name" name='name' onChange={onchange} minLength={3} required />
                    </div>

                    <div className="mb-3 my-3 mx-4">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className={` form-control ${mode === 'light' ? 'bgcolor' : 'bgcolordark'}`} style={{ width: '97%' }} id="email" name='email' aria-describedby="email" onChange={onchange} required />

                    </div>

                    <div className="mb-3 my-3 mx-4">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className='d-flex'>
                            <input type="password" className={` form-control ${mode === 'light' ? 'bgcolor' : 'bgcolordark'}`} id="password" name="password" onChange={onchange} minLength={5} required />
                            <i className="fa-solid fa-eye icon2 eyeicon" style={{ color: "#030303", cursor: 'pointer' }} onClick={(e) => {
                                if (show === true) setshow(false)
                                else setshow(true)
                            }}></i></div>
                    </div>
                    <div className="mb-3 my-3 mx-4" >
                        <label htmlFor="img" className="form-label">Choose Profile:</label>
                        <input type="file" id="avatar" className={` form-control ${mode === 'light' ? 'bgcolor' : 'bgcolordark'}`} style={{ width: '97%' }} name="avatar" accept="image/*" onChange={(e) => { settingprofile(e.target.files) }} />

                    </div>
                    <div className="text-center">

                        <button type="submit" className={`btn btn-primary my-3 ${mode === 'light' ? '' : 'hoverbtn'} `} style={{ background: 'black', width: '50%' }}>Sign Up</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signup
