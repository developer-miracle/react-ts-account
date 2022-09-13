import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import RouterStore from '../store/RouterStore'
import { observer } from 'mobx-react'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

const Header = () => {
    const routes = RouterStore.routes
    return (
        <>
            <nav>
                {routes.map(route => {
                    return <Link key={route.path} to={route.path} style={{ textDecoration: 'none' }}><Button>{route.name}</Button></Link>
                })}
            </nav>

            {/* <Tabs aria-label="lab API tabs example">
                <Tab label="Item One" value="1" />
                <Tab label="Item Two" value="2" />
                <Tab label="Item Three" value="3" />
            </Tabs> */}
        </>
    )
}

export default observer(Header) 