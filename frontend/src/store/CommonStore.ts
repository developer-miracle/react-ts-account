import { observable, action } from 'mobx'

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



    public successMessage: string = 'Что-то успешно (проверка)'
    @observable public flagShowSuccessMessage: boolean = false

    @action public showSuccessMessage(text: string) {
        this.successMessage = text
        this.flagShowSuccessMessage = true
    }

    public resetSnackBar() {
        this.flagShowSuccessMessage = false
    }

}

export { CommonStore }
export default new CommonStore()