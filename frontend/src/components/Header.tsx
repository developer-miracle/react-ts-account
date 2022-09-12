import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import RouterStore from '../store/RouterStore'
import { observer } from 'mobx-react'

const Header = () => {
    const routes = RouterStore.routes
    return (
        <>
            <nav>
                {routes.map(route => {
                    return <Link key={route.path} to={route.path} style={{ textDecoration: 'none' }}><Button>{route.name}</Button></Link>
                })}
            </nav>
        </>
    )
}

export default observer(Header) 