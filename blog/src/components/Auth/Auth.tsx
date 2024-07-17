import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = (props: any) => {
    const nav = useNavigate()
    const token = localStorage.getItem('token')

    // 判断是否有token
    useEffect(() => {
        if(!token){
            nav('/login')
        }
    },[token])
    return props.children
};

export default Auth;