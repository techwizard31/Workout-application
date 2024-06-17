import { useState } from "react";
import { useAuthContext } from './useAuthContext';

export const useSignup = ()=>{
    const [error,setError]=useState(null)
    const [isloading,setIsloading]=useState(null)
    const {dispatch}=useAuthContext()

    const signup = async (email,password)=>{
        setIsloading(true)
        setError(null)

        const response = await fetch(`${process.env.LINK}/api/user/signup`,{
            method:"POST",
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({email,password})
        })
        const json = await response.json()

        if(!response.ok){
            setIsloading(false)
            setError(json.error)
        }
        if(response.ok){
            localStorage.setItem('user',JSON.stringify(json))
            dispatch({type:'LOGIN',payload: json})
            setIsloading(false)
        }
    }
    return { signup, isloading, error }
}