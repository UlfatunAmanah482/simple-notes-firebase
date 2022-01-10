import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from "react-router-dom";

import './Login.scss'
import Button from '../../../components/atoms/Button'
import { loginUserAPI } from '../../../config/redux/action'

function NewLogin(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    let history = useNavigate();

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleLoginSubmit = async () => {
        const res = await props.loginAPI({email, password})
        console.log('res login: ', res);
        if(res) {
            console.log('login success', res)

            const local = localStorage.setItem('userData', JSON.stringify(res))
            console.log('localStorage: ', local);
            localStorage.setItem('userData', JSON.stringify(res))

            setEmail('')
            setPassword('')
            history("/new-dashboard");
        }
    }


    return (
        <div className="auth-container">
            <div className="auth-card">
                <p className="auth-title">Login Page</p>
                <input className="input" id="email" type="text" placeholder="Email" value={email} onChange={handleChangeEmail} />
                <input className="input" id="password" type="password" placeholder="Password" value={password} onChange={handleChangePassword} />
                <Button onClick={handleLoginSubmit} title="Login" loading={props.isLoading} />
            </div>
        </div>
    )
}

const reduxState = (state) => ({
    isLoading: state.isLoading
})

const reduxDispatch = (dispatch) => ({
    loginAPI: (data) => dispatch(loginUserAPI(data))
})

export default connect(reduxState, reduxDispatch)(NewLogin)