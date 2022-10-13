import { action, makeObservable, observable } from "mobx"
import User from '../models/UserModel'
import CommonStore from "./CommonStore"
import history from '../history'

class UserStore {

    private URL_LOGIN_TEMPLATE = CommonStore.authBasename

    @observable public user: User | null = null

    constructor() {
        makeObservable(this)
        history.listen((location) => {
            if (location.location.pathname.includes('/auth:out')) {
                this.logout()
            }
        })
    }

    // public get contacts() {
    //     return this.user?.contacts
    // }

    @action private setUser(user: User | null) {
        this.user = user
    }

    @action login(userLogin: string, userPassword: string) {
        let querry: string = `?login=${userLogin}&password=${userPassword}`
        let path = this.URL_LOGIN_TEMPLATE + querry
        fetch(path)
            .then(response => {
                if (response.statusText === 'OK') return response.json()
                else console.log(response.statusText)
            })
            .then((data) => {
                if (data) {
                    if (data[0]) {
                        this.setUser(new User(data[0].id, data[0].name, data[0].role))
                        CommonStore.showMessage('Вход выполнен', 'success')
                    } else {
                        CommonStore.showMessage('Не верный логин или пароль', 'error')
                    }
                } else {
                    CommonStore.showMessage('Ошибка', 'error')
                }
            })
    }

    @action logout() {
        this.setUser(null)
    }

    @action register(userName: string, userLogin: string, userPassword: string) {

        let querry: string = `?login=${userLogin}`
        let path = this.URL_LOGIN_TEMPLATE + querry
        fetch(path)
            .then(response => {
                if (response.statusText === 'OK') return response.json()
                else console.log(response.statusText)
            })
            .then((data) => {
                if (data) {
                    if (!data[0]) {
                        fetch(this.URL_LOGIN_TEMPLATE, {
                            method: 'POST',
                            mode: 'no-cors',
                            credentials: 'include',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                            },
                            body: new URLSearchParams({
                                "name": userName ?? 'unknown',
                                "role": "user",
                                'login': userLogin as string,
                                'password': userPassword as string
                            })
                        })
                            .then(() => {
                                this.login(userLogin, userPassword)
                            })
                    } else {
                        CommonStore.showMessage('Пользователь с таким логином уже существует', 'error')
                        // console.log('пользователь с таким логином уже существует')
                    }
                } else {
                    console.log('error')
                }
            })
    }
}

export { UserStore }
export default new UserStore()