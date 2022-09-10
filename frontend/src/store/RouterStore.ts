import RouteModel from '../models/RouteModel'
import Home from '../components/pages/Home'
import SignIn from '../components/pages/SignIn'
import SignUp from '../components/pages/SignUp'
import Contacts from '../components/pages/Contacts'
import { action, makeObservable, observable } from 'mobx'
class RouterStore {

    private anonymousRoutes: Array<RouteModel> = [
        { path: '/', name: 'home', visible: true, Component: Home },
        { path: '/signin', name: 'signin', visible: true, Component: SignIn },
        { path: '/signup', name: 'signup', visible: true, Component: SignUp }
    ]

    private loggedRoutes: Array<RouteModel> = [
        { path: '/', name: 'home', visible: true, Component: Home },
        { path: '/contacts', name: 'contacts', visible: true, Component: Contacts }
    ]

    private adminRoutes: Array<RouteModel> = [
        { path: '/', name: 'home', visible: true, Component: Home }
        // TODO: Прописать путь для админки
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


}

export { RouterStore }
export default new RouterStore()