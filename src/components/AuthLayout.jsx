import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useNavigate } from 'react-router-dom'

export default function AuthLayout({ children, authentication = true }) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const authStatus = useSelector((state) => state.status)

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate('/login')
        }
        else if (!authentication && authStatus !== authentication) {
            navigate('/')
        }
    }, [authStatus, navigate, authentication])
    return loader ? <h1>Loading...</h1> : <>{children}</>
}