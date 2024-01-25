import { useState, useCallback } from "react";

export function useShowModal() {
    const [ show, setShow ] = useState(false);

    const handleClose = useCallback(() => {setShow(false)});
    const handleShow = useCallback(() => {setShow(true)});
    return [ show, handleClose ,handleShow ];
};