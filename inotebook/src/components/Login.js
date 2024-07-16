import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import usercontext from '../context/notes/NoteContext'

const Login = (props) => {
    const context = useContext(usercontext)
    const { mode } = context
    const [cred, setCred] = useState({ email: " ", password: "" })
    const [show, setshow] = useState(false);
    let navigate = useNavigate();
    const handlesubmit = async (e) => {
        e.preventDefault();

        // const url = `http://localhost:5000/api/auth/login`
        const url = `api/auth/login`
        const response = await fetch(url, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',


            },
            body: JSON.stringify({ email: cred.email, password: cred.password })
        })
        const json = await response.json()
        if (json.success) {
            props.showAlert("logged in successfully", "success")


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
            <div className='container my-5'>
                <form className='res_form' autoComplete='off' style={{ border: `${mode === 'light' ? '6px solid #e9b8e9' : '2px solid white'}`, borderRadius: '4px', backgroundColor: `${mode === 'light' ? 'white' : 'black'}` }} onSubmit={handlesubmit}>

                    <div className="mb-3 my-3 mx-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className={` form-control ${mode === 'light' ? 'bgcolor' : 'bgcolordark'}`} id="email" name='email' aria-describedby="emailHelp" value={cred.email} onChange={onchange} style={{ width: '97%' }} />

                    </div>
                    <div className="mb-3 my-3 mx-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className='d-flex'>
                            <input type={show == false ? 'password' : 'text'} className={` form-control ${mode === 'light' ? 'bgcolor' : 'bgcolordark'}`} id="password" name='password' value={cred.password} onChange={onchange} />
                            <i className="fa-solid fa-eye icon2 eyeicon" style={{ color: "#030303", cursor: 'pointer' }} onClick={(e) => {
                                if (show === true) setshow(false)
                                else setshow(true)
                            }}></i>

                        </div>
                    </div>
                    <div className="text-center">
                        <button type="submit" className={`btn btn-primary my-3 ${mode === 'light' ? '' : 'hoverbtn'} `} style={{ backgroundColor: 'black', width: '50%' }}>Login</button>

                    </div>

                </form>
            </div >
        </>
    )
}

export default Login
