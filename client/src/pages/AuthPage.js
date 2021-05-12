import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const  { loading, request, error, clearError } =  useHttp()
    const [ form, setForm ] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message,  clearError])

    useEffect(() => {
        console.log('here mtanq', window.M)
        window.M.updateTextFields()
    }, [])
    
    const changeHandler = event => {
        setForm({...form,  [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try { 
            await request('/api/auth/register', 'POST', {...form})
        } catch (e) {}
    }
    
    const loginHandler = async () => {
        try { 
            const data = await request('/api/auth/login', 'POST', {...form})
            console.log('data', data.token, data.userId)

            auth.login(data.token, data.userId)
        } catch (e) {}
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Esim inchenq an</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Autoritation</span>
                        <div>   
                            <div className="input-field">
                                <input 
                                    placeholder="Write Email" 
                                    id="email" 
                                    type="text" 
                                    name="email" 
                                    autoComplete="off"
                                    className="yellow-input"
                                    value={performance.email}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input 
                                    placeholder="Write Password" 
                                    id="password" 
                                    type="password"
                                    autoComplete="off"
                                    name="password"
                                    value={performance.password}
                                    className="yellow-input"
                                    onChange={changeHandler} 
                                />
                                <label htmlFor="email">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button 
                            className="btn yellow darken-4" 
                            style={{marginRight: 10}}
                            disabled={loading}
                            onClick={loginHandler}
                        >
                            Login
                        </button>
                        <button 
                            className="btn grey lighten-1 black-text"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                                Registration
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}