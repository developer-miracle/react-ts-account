import { action, makeObservable, observable } from "mobx"
import User from '../models/UserModel'

// interface Response {
//     id: number,
//     login: string,
//     password: string
// }

class UserStore {

    private URL_LOGIN_TEMPLATE = 'http://192.168.1.100:8000/users'

    @observable public user: User | null = null

    constructor() {
        makeObservable(this)


    }

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

                        this.user = new User(data[0].name, data[0].role)
                    } else {

                    }
                } else {
                    console.log('error')
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