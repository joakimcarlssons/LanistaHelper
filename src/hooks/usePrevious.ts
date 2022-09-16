import { useRef, useEffect } from "react";

export default function usePevious(value : any) : any {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}