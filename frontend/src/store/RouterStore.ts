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
        { path: '/contacts', name: 'contacts', visible: true, Component: Contacts }
    ]

    private adminRoutes: Array<RouteModel> = [
        { path: '/', name: 'home', visible: true, Component: Home },
        { path: '/adminpanel', name: 'admin panel', visible: true, Component: Admin }
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
                if (user.roleName.toLowerCase().includes("admin")) {
                    this.setAdminRoutes()
                } else {
                    this.setLoggedRoutes()
                    history.replace('/contacts')
                }
            } else {
                this.setAnonymousRoutes()
            }
        }
    )
}

export { RouterStore }
export default new RouterStore()