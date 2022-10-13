import { observable, action, makeObservable } from 'mobx'

class CommonStore {
    //  URL REST API основной адрес

    frontendIp: string = ''
    backandIp: string = ''

    baseFrontPort: string = '3000'
    baseBackPort: string = '8000'

    // 'http://192.168.1.100:8000'
    basename: string = 'http://localhost:8000'
    // 'http://192.168.1.100:8000/users'
    authBasename: string = 'http://localhost:8000/users'
    // 'http://192.168.1.100:8000/contacts'
    contactBasename: string = 'http://localhost:8000/contacts'

    public type: string = 'success'
    public message: string = 'Что-то успешно (проверка)'
    @observable public flagShowMessage: boolean = false

    constructor() {
        makeObservable(this)
    }

    @action public showMessage(text: string, type: string) {
        this.message = text
        this.type = type
        this.flagShowMessage = true
    }

    @action public resetSnackBar() {
        this.flagShowMessage = false
    }

}

export { CommonStore }
export default new CommonStore()