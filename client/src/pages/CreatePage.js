import React, { useState, useEffect, useContext} from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const CreatePage = () => {
    const auth = useContext(AuthContext)

    const history = useHistory()
    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const [link, setLink] = useState('')
    const { request } = useHttp()
    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: 'Bearer ' +  auth.token 
                })
            
                history.push(`/detail/${data.link._id}`)
            } catch (e) {
                console.log('[[[[[[[[[[[[[]]]]]]]]]]]]]', e)
            }
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input 
                        placeholder="Write Link" 
                        id="link" 
                        type="text"
                        value={link} 
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Write link</label>
                </div>
            </div>
        </div>
    )
}