
export default class UserModel {
    public id: number
    public name: string
    public roleName: string
    // TODO: добавить хранение логина?
    constructor(id: number, name: string, roleName: string) {
        this.id = id
        this.name = name
        this.roleName = roleName
    }
}