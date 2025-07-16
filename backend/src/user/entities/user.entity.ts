export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: number, name: string, email: string, password: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    update(name: string, email: string) {
        this.name = name;
        this.email = email;
        this.updatedAt = new Date();
    }

    toJSON() {
        return { id: this.id, name: this.name, email: this.email };
    }

    static fromJSON(json: any) {
        return new User(json.id, json.name, json.email, json.password);
    }

    static fromPartial(partial: Partial<User>) {
        return new User(0, partial.name || '', partial.email || '', partial.password || '');
    }

    static fromArray(array: any[]) {
        return array.map((item) => User.fromJSON(item));
    }

    static toArray(users: User[]) {
        return users.map((user) => user.toJSON());
    }

    static fromObject(obj: any) {
        return new User(obj.id, obj.name, obj.email, obj.password);
    }

    static toObject(user: User) {
        return user.toJSON();
    }

}