import React, {useState, useEffect} from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    return(
        <div>
            <h1>Login</h1>
            <div className='error'>{ error }</div>
                <label>Email: 
                    <input type='text' placeholder='email' onChange={ ev => setEmail(ev.target.value)} value={ email }></input>
                </label>
                <label>Password: 
                    <input type='password' placeholder='password' onChange={ ev => setPassword(ev.target.value)} value={ password }></input>
                </label>
                <button disabled={!password && !email} onClick={() => alert('Not set yet')}>Login</button>
                <button onClick={() => alert('Not set yet')}>Create User</button>
        </div>
    )
};

export default Login;