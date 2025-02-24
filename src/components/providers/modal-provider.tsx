"use client"

import React from "react"
import { useEffect , useState } from "react"
import ConfirmDeleteModal from "../modals/confirm-delete";


export const ModalProvider = () => {

    const [isMounted ,setIsMounted] = useState(false);

    useEffect(()=> {
        setIsMounted(true)
    } , []);

    if(!isMounted){
        return null;
    }

    return (
        <>
            <ConfirmDeleteModal />
        </>
    );
}