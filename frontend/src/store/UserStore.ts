import { action, makeObservable, observable } from "mobx"
import User from '../models/UserModel'

interface Response {
    id: number,
    login: string,
    password: string
}

class UserStore {

    private URL_LOGIN_TEMPLATE = 'http://localhost:8000/users'

    @observable public user: User | null = null
    @observable private userName: string = ''
    @observable private password: string = ''

    constructor() {
        makeObservable(this)


    }

    @action private setUser(user: User) {
        this.user = user
    }

    @action private setUserName(userName: string) {
        this.userName = userName
    }

    @action private setPassword(password: string) {
        this.password = password
    }

    @action private check() {

    }

    @action login(userLogin: string, userPassword: string) {
        this.setUserName(userLogin)
        this.setPassword(userPassword)

        let querry: string = `?login=${this.userName}&password=${this.password}`
        let path = this.URL_LOGIN_TEMPLATE + querry
        fetch(path)
            .then(response => {
                if (response.statusText === 'OK') return response.json()
                else console.log(response.statusText)
            })
            .then((data) => {
                if (data) {
                    if (data[0]) {
                        // console.log('пользователь найден')
                        this.user = new User(data[0].name, data[0].role)
                    } else {
                        // console.log('пользователь не найден')
                    }
                } else {
                    console.log('error')
                }

            })
        // fetch(this.URL_LOGIN_TEMPLATE + inputLogin)
        //     .then(response => {
        //         if (response.status < 400) return response.json()
        //         throw new Error(response.status.toString())
        //     })
        //     .then(data => {

        //     })
        //     .catch(error => {
        //         window.alert(error)
        //     })
    }

    @action logout() {

    }

    @action register() {

    }

}

export { UserStore }
export default new UserStore()