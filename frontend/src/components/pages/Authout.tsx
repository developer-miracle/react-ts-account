import React, { useEffect } from 'react'
import history from '../../history'

export default function Authout() {
    useEffect(() => {
        history.push("/")
    }, [])
    return (<></>)
}