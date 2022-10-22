import RouteModel from '../models/RouteModel'
import Home from '../components/pages/Home'
import SignIn from '../components/pages/SignIn'
import SignUp from '../components/pages/SignUp'
import Contacts from '../components/pages/Contacts'
import Admin from '../components/pages/admin/AdminPanel'
import NotFound from '../components/pages/NotFound'
import UserStore from './UserStore'
import history from '../history'
import { action, makeObservable, observable, reaction } from 'mobx'
import Authout from '../components/pages/Authout'

class RouterStore {

    private anonymousRoutes: Array<RouteModel> = [
        { path: '/', name: 'home', visible: true, Component: Home },
        { path: '/signin', name: 'signin', visible: true, Component: SignIn },
        { path: '/signup', name: 'signup', visible: true, Component: SignUp },
        { path: '/auth:out', name: 'quit', visible: false, Component: Authout },
        { path: '*', name: 'notfound', visible: false, Component: NotFound }
    ]

    private loggedRoutes: Array<RouteModel> = [
        { path: '/', name: 'home', visible: true, Component: Home },
        { path: '/contacts', name: 'contacts', visible: true, Component: Contacts },
        { path: '/auth:out', name: 'quit', visible: true, Component: Authout },
        { path: '*', name: 'notfound', visible: false, Component: NotFound }
    ]

    private adminRoutes: Array<RouteModel> = [
        { path: '/', name: 'home', visible: true, Component: Home },
        { path: '/contacts', name: 'contacts', visible: true, Component: Contacts },
        { path: '/adminpanel', name: 'admin panel', visible: true, Component: Admin },
        { path: '/auth:out', name: 'quit', visible: true, Component: Authout },
        { path: '*', name: 'notfound', visible: false, Component: NotFound }
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
                    history.push("/adminpanel");
                } else if (user.roleName.toLowerCase().includes("user")) {
                    this.setLoggedRoutes()
                    history.push("/contacts");
                }
            } else {
                this.setAnonymousRoutes()
            }
        }
    )
}

export { RouterStore }
export default new RouterStore()