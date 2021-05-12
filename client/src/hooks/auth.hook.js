import { useState, useCallback, useEffect } from 'react'

const storageName = "userData"
export const useAuth = () => {
    const [ token, setToken ] = useState(null)
    const [ userId, setUserId ] = useState(null)
    const [ ready , setReady ] = useState(false)
    
    const login = useCallback( (jvtToken, id) => {
        setToken(jvtToken)
        setUserId(id)
        localStorage.setItem(storageName, JSON.stringify({
            userId: id,
            token: jvtToken
        }))
    }, [])
    
    const logOut = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect( () => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if (data && data.token) {
            login(data.token, data.userId)
        }
        setReady(true)

    }, [login])
    



    return { login, logOut, token, userId, ready }
}