export type User = {
    _id: string
    handle: string
    name: string,
    email: string,
    phone: string,
    role: string,
}

export type RegisterForm = Pick<User, 'handle' | 'email' | 'name' | 'phone'> & {
    password: string
    password_confirmation: string
}

export type LoginForm = Pick<User, 'email'> & {
    password: string
}