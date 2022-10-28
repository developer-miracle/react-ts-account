import { makeObservable, observable, action } from "mobx"
import ContactModel from "../models/ContactModel"
import UserStore from "../store/UserStore"
import CommonStore from "./CommonStore"

class ContactStore {

    @observable public contacts: ContactModel[] | null = null

    constructor() {
        makeObservable(this)
    }

    @action public setContacts(contacts: ContactModel[] | null) {
        this.contacts = contacts
    }

    public getContacts() {
        const querry = `${CommonStore.contactBasename}?userId=${UserStore.user?.id}`
        fetch(querry)
            .then(response => {
                if (response.statusText === 'OK') return response.json()
            })
            .then(data => {
                if (data.length !== 0) {
                    let res: ContactModel[] = data.map((element: { id: number; name: string; phone: string }) => {
                        return new ContactModel(element.id, element.name, element.phone)
                    })
                    this.setContacts(res)
                } else {
                    this.setContacts(null)
                }
            })
    }

    @action public add(name?: string, phone?: string, userId?: string) {
        let querry = `${CommonStore.contactBasename}`
        fetch(querry, {
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: new URLSearchParams({
                'userId': userId as string,
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
        let path = CommonStore.contactBasename + '/' + id
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
        let path = CommonStore.contactBasename + '/' + id
        fetch(path, { method: 'DELETE', credentials: 'include' })
            .then(response => {
                if (response.statusText === 'OK') {
                    CommonStore.showMessage('Контакт успешно удален', 'success')
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