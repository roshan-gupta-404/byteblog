import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useNavigate } from 'react-router-dom'

export default function AuthLayout({ children, authenticationRequired = true }) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector((state) => state.status)

    useEffect(() => {
        if (authenticationRequired && authStatus !== authenticationRequired) {
            navigate('/login')
        }
        else if (!authenticationRequired && authStatus !== authenticationRequired) {
            navigate('/')
        }
        setLoader(false)
    }, [authStatus, navigate, authenticationRequired])
    return loader ? <h1>Loading...</h1> : <>{children}</>
}