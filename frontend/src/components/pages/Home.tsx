import React from "react"
import { observer } from 'mobx-react'

interface State {
    id: number | undefined,
    event: string,
    name: string | undefined;
    phone: string | undefined;
}

const Home = () => {
    return (
        <h2>Home</h2>
    )
}

export default observer(Home)

