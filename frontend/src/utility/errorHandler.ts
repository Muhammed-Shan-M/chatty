import axios from "axios";
import { toast } from "react-toastify";


export function errorHandler(error: unknown) {
    if (!axios.isAxiosError(error)) {
        if (error instanceof Error) {
            toast.error(error.message);
        } else {
            toast.error(`Unexpected error: ${String(error)}`);
        }
    }
}