import type { Purpose } from "@/types/Purpose"
import { useEffect, useState } from "react"


type Props = {
    onclose: () => void
    open: boolean
    handleConfirm: () => Promise<void>
    purpose: Purpose
}

export const ConfirmationModal = ({onclose,open,handleConfirm,purpose}: Props) => {

    const [title,setTitle] = useState('')
    const [Cmessage,setCmessage] = useState('')

    useEffect(() => {
        if(purpose === 'remove-user'){
            setTitle('Confirm Remove')
            setCmessage('Are you sure you want to remove this user?')
        } else if(purpose === 'put-as-admin'){
            setTitle('Make Admin')
            setCmessage('Are you sure you want to make this user an admin?')
        } else if(purpose === 'remove-as-admin'){
            setTitle('Remove Admin')
            setCmessage('Are you sure you want to remove this user as admin?')
        }
    })

    if(!open || !purpose)return null

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="py-4">{Cmessage}</p>
                <div className="modal-action">
                    <button className="btn" onClick={() => onclose()}>
                        Cancel
                    </button>
                    <button className="btn btn-error" onClick={handleConfirm}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}
