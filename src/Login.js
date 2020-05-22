import React, {useState, useEffect} from 'react';

const Login = ({ login }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const createCred = () => {
        const credentials = { email, password };
        login(credentials);
        setEmail('');
        setPassword('');
        alert('Logged in!');
    }


    return(
        <div>
            <h1>Login</h1>
            <div className='error'>{ error }</div>
                <label>Email: 
                    <input type='text' placeholder='email' onChange={ ev => setEmail(ev.target.value)} value={ email }></input>
                </label>
                <label>Password: 
                    <input type='password' placeholder='password' onChange={ ev => setPassword(ev.target.value) } value={ password }></input>
                </label>
                <button disabled={ !password || !email } onClick={() => createCred()}>Login</button>
                <button onClick={() => alert('Not set yet')}>Create User</button>
        </div>
    )
};

export default Login;