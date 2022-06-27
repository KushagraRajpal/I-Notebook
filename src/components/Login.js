import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { API } from '../API';

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    let history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${API}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Logged in Successfully", "success");
            history.push("/");

        } else {
            props.showAlert("Invalid Credentials", "danger");
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className="mt-2">
            <h2 style={{ textAlign: 'center' }}>Login to continue to iNotebook</h2>
            <div className="container" style={{width: '30%', marginTop: '4rem'}}>
            <form style={{ margin: '20px' }} onSubmit={handleSubmit}>
                <div className="mb-3" >
                    <label htmlFor="email" className="form-label" >Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name="password" />
                </div>
                <div className="container" style={{display: 'flex', justifyContent: 'center'}}>
                <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
            </div>
        </div>
    )
}

export default Login
