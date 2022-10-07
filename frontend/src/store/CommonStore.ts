

class CommonStore {
    //  URL REST API основной адрес

    // 'http://192.168.1.100:8000'
    basename: string = 'http://localhost:8000'
    // 'http://192.168.1.100:8000/users'
    authBasename: string = 'http://localhost:8000/users'
    // 'http://192.168.1.100:8000/contacts'
    contactBasename: string = 'http://localhost:8000/contacts'

    baseFrontPort: string = '3000'
    baseBackPort: string = '8000'

}

export { CommonStore }
export default new CommonStore()