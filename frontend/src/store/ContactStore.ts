import { makeObservable, observable, action } from "mobx"
import { json } from "node:stream/consumers"
import Contact from '../models/ContactModel'
import CommonStore from "./CommonStore"

class ContactStore {

    private URL_LOGIN_TEMPLATE = CommonStore.contactBasename

    @observable public contacts: Contact[] | null = null

    constructor() {
        makeObservable(this)
    }

    @action public setContacts(contacts: Contact[]) {
        this.contacts = contacts
    }

    @action public getContacts() {
        fetch(this.URL_LOGIN_TEMPLATE)
            .then(response => {
                if (response.statusText === 'OK') return response.json()
            })
            .then(data => {
                // this.setContacts(data)
                let res = data.map((element: { id: number; name: string; phone: string }) => {
                    return new Contact(element.id, element.name, element.phone)
                })
                this.contacts = res
            })
    }

    @action public add(name?: string, phone?: string) {
        fetch(this.URL_LOGIN_TEMPLATE, {
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
            .finally(() => {
                this.getContacts()
            })
    }

    @action public change(id?: number, name?: string, phone?: string) {
        let path = this.URL_LOGIN_TEMPLATE + '/' + id
        console.log(path)
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
            .finally(() => {
                this.getContacts()
            })
    }

    @action public delete(id: number) {
        let path = this.URL_LOGIN_TEMPLATE + '/' + id
        fetch(path, { method: 'DELETE', credentials: 'include' })
            .then(response => {
                if (response.statusText === 'OK') {
                    this.getContacts()
                }
            })
    }

}

export { ContactStore }
export default new ContactStore()