import { makeObservable, observable, action } from "mobx"
import { json } from "node:stream/consumers"
import Contact from '../models/ContactModel'

class ContactStore {

    private URL: string = 'http://192.168.1.100:8000/contacts'

    @observable public contacts: Contact[] | null = null

    constructor() {
        makeObservable(this)
    }

    @action public setContacts(contacts: Contact[]) {
        this.contacts = contacts
    }

    @action public getContacts() {
        fetch(this.URL)
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
        fetch(this.URL, {
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
        let path = this.URL + '/' + id
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
        let path = this.URL + '/' + id
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