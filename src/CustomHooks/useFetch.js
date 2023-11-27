import { useState,useEffect } from "react";
const useFetch = (url) => {   
    const abortContent = new AbortController();
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error,setError] = useState(null);
    useEffect(() => {
        setTimeout(() => fetch(url).then(response => {
            if (!response.ok) {
                throw Error("couldnt fetch data");
            }
            return response.json();
        }).then((data) => {
            setData(data)
            setIsPending(false);
            setError(null);
        }).catch(err => {
            setError(err.message)
            setIsPending(false)
        })
            ,10)
    return () => abortContent.abort();
    }, []);
    return {data,isPending,error};

}

export default useFetch;