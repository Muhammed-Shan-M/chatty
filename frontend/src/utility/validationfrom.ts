import { toast , Bounce } from "react-toastify";
import type { FormData } from "../types/formData";

export function validateForm(formdata: FormData) {
    if (Object.values(formdata).some((val) => val === "")) {
        makeTost("All form fields must be filled out.")
        return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(formdata.email)){
        makeTost('Please enter a valid email address (example: user@example.com)')
        return false
    }

    const passwordErr = validatePassword(formdata.password)
    if(passwordErr !== ''){
        makeTost(passwordErr)
        return false
    }

    return true
}



function makeTost(msg: string) {

    toast.error(msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
    });

} 



export function validatePassword(password:string) {

    if(password.length < 6)return "Password must be at least 6 characters."

    if(password.indexOf(' ') !== -1)return "Password may not contain a space."

    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{6,}$/

    if(!regex.test(password)) return "Password must be at least 6 characters long, contain uppercase, lowercase, a number, and a special character."

    return ""
}