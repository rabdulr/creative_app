import React, { useState, useEffect } from 'react';
import Login from './Login.js';
import Landing from './Landing.js';
import { login } from '../methods';
import axios from 'axios';

const App = () => {
    const [auth, setAuth] = useState({})

    useEffect(() => {
        const token = window.localStorage.getItem('token');
        if(!auth.id){
            if(token){
                exchangeTokenForAuth();
                return;
            }
        }
    }, [auth]);

    const exchangeTokenForAuth = async() => {
        const response = await axios.get('/api/auth', login.headers())
            .then(user => setAuth(user.data))
            .catch(ex => console.log('Exchange Token: ', ex))
    };

    const sendLogin = async(credentials) => {
        const token = (await axios.post('/api/auth', credentials)).data.token;
        window.localStorage.setItem('token', token);
        exchangeTokenForAuth();
    };

    const logOut = () => {
        window.localStorage.removeItem('token');
        setAuth({})
    }


    return(
        <div>
            <h1>Creative_App Prototype</h1>
            <span>
                {
                    auth.id && <button onClick={ logOut }>Sign Out</button>
                }
            </span>
            {
                !auth.id && <Login login = { sendLogin }/>
            }
            { 
                auth.id && <Landing />
            }
        </div>
    )
}

export default App;