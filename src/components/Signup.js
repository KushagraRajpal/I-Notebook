import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { API } from '../API';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' });
    let history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch(`${API}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            history.push("/");
            props.showAlert("Account Created Successfully", "success");
        } else {
            props.showAlert("Invalid details", "danger");
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='container'>
            <h1 style={{ textAlign: 'center' }}>Welcome to iNotebook</h1>
            <h2 style={{ textAlign: 'center' }}>Please Create your Account by filling these details</h2>
            <div className="container"style={{width: '30%', marginTop: '2rem'}}>
            <form style={{ margin: '20px' }} onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Enter Your Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} required minLength={5} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} required minLength={5} />
                </div>
                <div className="container" style={{display: 'flex', justifyContent: 'center'}}>
                <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
            </div>
        </div>
    )
}

export default Signup
