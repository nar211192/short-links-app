import React, { useContext, useState, useCallback, useEffect } from 'react'
import { LinkList } from '../components/LinkList'
import { Loader } from '../components/Loader'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const LinksPage = () => {

    const [links, setLinks] = useState(null)
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()

    const getLinks = useCallback( async () => {
        try {
            const fetched = await request(`/api/link`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched)
        } catch (e) {

        }
    }, [token, request])
    

    useEffect( () => {
     getLinks()   
    }, [getLinks])

    if(loading) {
        return <Loader />
    }

    return (
        <div>
            {!loading && links && <LinkList links={links} />}
        </div>
    )
}