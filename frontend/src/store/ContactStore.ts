import { makeObservable, observable, action } from "mobx"
import Contact from '../models/ContactModel'
import CommonStore from "./CommonStore"

class ContactStore {

    private contactBasename = CommonStore.contactBasename

    @observable public contacts: Contact[] | null = null

    constructor() {
        makeObservable(this)
    }

    @action public setContacts(contacts: Contact[]) {
        this.contacts = contacts
    }

    @action public getContacts() {
        fetch(this.contactBasename)
            .then(response => {
                if (response.statusText === 'OK') return response.json()
            })
            .then(data => {
                // this.setContacts(data)

                // TODO: проверка data на существование
                let res = data.map((element: { id: number; name: string; phone: string }) => {
                    return new Contact(element.id, element.name, element.phone)
                })
                this.contacts = res
            })
    }

    @action public add(name?: string, phone?: string) {
        fetch(this.contactBasename, {
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: new URLSearchParams({
                'name': name as string,
                'phone': phone as string
            })
        })
            .then(response => {
                // TODO: Проверка на успешное добавление контакта
                CommonStore.showMessage('Контакт успешно добавлен', 'success')
            })

            .finally(() => {
                this.getContacts()
            })
    }

    @action public change(id?: number, name?: string, phone?: string) {
        let path = this.contactBasename + '/' + id
        fetch(path, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'name': name as string,
                'phone': phone as string
            })
        })
            .then(response => {
                // TODO: Проверка на успешное изменение контакта
                CommonStore.showMessage('Контакт успешно изменен', 'success')
            })
            .finally(() => {
                this.getContacts()
            })
    }

    @action public delete(id: number) {
        let path = this.contactBasename + '/' + id
        fetch(path, { method: 'DELETE', credentials: 'include' })
            .then(response => {
                if (response.statusText === 'OK') {
                    CommonStore.showMessage('Контакт успешно удален', 'success')
                }
            })
            .finally(() => {
                this.getContacts()
            })
    }

}

export { ContactStore }
export default new ContactStore()