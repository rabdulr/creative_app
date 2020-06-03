import React, { useState, useEffect } from 'react';
import Login from './Login';
import Landing from './Landing';
import Journal from './Journal';
import CheckIn from './CheckIn';
import { login } from '../methods';
import axios from 'axios';

const App = () => {
    const [auth, setAuth] = useState({})
    const [posts, setPosts] = useState([]);
    const [checkIn, setCheckIn] = useState([]);
    const [error, setError] = useState('')

    useEffect(() => {
        const token = window.localStorage.getItem('token');
        if(!auth.id){
            if(token){
                exchangeTokenForAuth();
                return;
            }
        }
    }, [auth]);

    useEffect(() => {
        if(auth.id){
            axios.get(`/api/posts/getPosts/${auth.id}`, login.headers())
                .then(posts => setPosts(posts.data))
                .catch(ex => setError(ex));

            axios.get(`/api/checkIns/getCheckIns/${auth.id}`, login.headers())
                .then(checkIns => setCheckIn(checkIns.data))
                .catch(ex => setError(ex));
        }
    }, [auth]);

    useEffect(() => {
        if(auth.id){
            axios.get(`/api/checkIns/getCheckIns/${auth.id}`, login.headers())
                .then(checkIns => setCheckIn(checkIns.data))
                .catch(ex => setError(ex));
        }
    }, [auth]);


    // Login options, unsure how to move out of app main space
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

    // Post options, unsure how to move out of main space
    const postEntry = (journalEntry) => {
        axios.post('/api/posts/postEntry', { ...journalEntry, userId: auth.id }, login.headers())
            .then(entry => {
                setPosts([...posts, entry.data])
            })
            .catch(ex => setError(ex))
    };

    // Mood/Check-in options, unsure how to move out of main space
    const addMood = (newMood) => {
        axios.post('/api/checkIns/addMood', { ...newMood, userId: auth.id }, login.headers())
            .then(mood => {
                setCheckIn([...checkIn, mood.data])
            })
            .catch(ex => setError(ex))
    }

    // Create User should verify whether the email exists in DB first
    const createUser = async(credentials) => {
        const newUser = (await axios.post('/api/users/createUser', credentials)).data;
        sendLogin(credentials);
    }


    return(
        <div>
            <h1>Creative_App Prototype</h1>
            <div id='error'>{ error }</div>
            <span>
                {
                    auth.id && 
                    <div>
                        <h3>Welcome, { auth.firstName }!</h3>
                        <button onClick={ logOut }>Sign Out</button>
                    </div>
                }
            </span>
            {
                !auth.id && <Login login = { sendLogin } createUser={ createUser }/>
            }
            { 
                auth.id && 
                    <div>
                        <Landing />
                        <Journal posts={ posts } postEntry={ postEntry }/>
                        <CheckIn checks={ checkIn } addMood={ addMood }/>
                    </div>
            }
        </div>
    )
}

export default App;