
export function validatePassword(password: string): string {

    if(password.length < 6)return "Password must be at least 6 characters."

    if(password.indexOf(' ') !== -1)return "Password may not contain a space."

    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{6,}$/

    if(!regex.test(password)) return "Password must be at least 6 characters long, contain uppercase, lowercase, a number, and a special character."

    return ""
}