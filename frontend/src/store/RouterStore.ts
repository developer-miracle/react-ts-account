import RouteModel from '../models/RouteModel'
import Home from '../components/pages/Home'
import SignIn from '../components/pages/SignIn'
import SignUp from '../components/pages/SignUp'
import Contacts from '../components/pages/Contacts'
import Admin from '../components/pages/admin/AdminPanel'
import UserStore from './UserStore'
import history from '../history'
import { action, makeObservable, observable, reaction } from 'mobx'

class RouterStore {

    private anonymousRoutes: Array<RouteModel> = [
        { path: '/', name: 'home', visible: true, Component: Home },
        { path: '/signin', name: 'signin', visible: true, Component: SignIn },
        { path: '/signup', name: 'signup', visible: true, Component: SignUp },
    ]

    private loggedRoutes: Array<RouteModel> = [
        { path: '/', name: 'home', visible: true, Component: Home },
        { path: '/contacts', name: 'contacts', visible: true, Component: Contacts },
        { path: '/auth:out', name: 'quit', visible: true, Component: Home }

    ]

    private adminRoutes: Array<RouteModel> = [
        { path: '/', name: 'home', visible: true, Component: Home },
        { path: '/adminpanel', name: 'admin panel', visible: true, Component: Admin },
        { path: '/auth:out', name: 'quit', visible: true, Component: Home }
    ]

    @observable routes: Array<RouteModel> = this.anonymousRoutes

    constructor() {
        makeObservable(this)
    }

    @action setAnonymousRoutes() {
        this.routes = this.anonymousRoutes
    }
    @action setLoggedRoutes() {
        this.routes = this.loggedRoutes
    }
    @action setAdminRoutes() {
        this.routes = this.adminRoutes
    }

    userReaction = reaction(
        () => UserStore.user,
        (user) => {
            if (user) {
                let signOutRoute
                if (user.roleName.toLowerCase().includes("admin")) {
                    signOutRoute = this.adminRoutes.find(route => route['path'].includes('/auth:out'))
                } else if (user.roleName.toLowerCase().includes("user")) {
                    signOutRoute = this.loggedRoutes.find(route => route['path'].includes('/auth:out'))
                }
                if (signOutRoute) {
                    signOutRoute['name'] = `${'Quit'.toUpperCase()} (${user.name})`
                }
                if (user.roleName.toLowerCase().includes("admin")) {
                    this.setAdminRoutes()
                } else if (user.roleName.toLowerCase().includes("user")) {
                    this.setLoggedRoutes()
                }
            } else {
                this.setAnonymousRoutes()
            }
        }
    )
}

export { RouterStore }
export default new RouterStore()