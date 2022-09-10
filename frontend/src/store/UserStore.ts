import { action, makeObservable, observable } from "mobx"
import User from '../models/UserModel'

interface Response {
    id: number,
    login: string,
    password: string
}

class UserStore {

    private URL_LOGIN_TEMPLATE = 'http://localhost:8000/users?login='

    @observable user: User | null = null
    @observable userName: string = ''
    @observable password: string = ''

    constructor() {
        makeObservable(this)


    }

    @action setUser(user: User) {
        this.user = user
    }

    @action setUserName(userName: string) {
        this.userName = userName
    }

    @action setPassword(password: string) {
        this.password = password
    }

    @action check() {

    }

    @action login(inputLogin: string, inputPassword: string) {
        fetch(this.URL_LOGIN_TEMPLATE + inputLogin)
            .then(response => {
                if (response.status < 400) return response.json()
                throw new Error(response.status.toString())
            })
            .then(data => {
                let o: Response = data[0]
                if (o !== undefined) callback(o)
            })
            .catch(error => {
                window.alert(error)
            })
    }

    @action logout() {

    }

    @action register() {

    }

}