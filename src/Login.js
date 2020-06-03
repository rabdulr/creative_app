import React, {useState, useEffect} from 'react';

const Login = ({ login, createUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [newUser, setNewUser] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPass, setConfirmNewPass] = useState('');

    const createCred = () => {
        const credentials = { email, password };
        login(credentials);
        setEmail('');
        setPassword('');
    }

    // Need function to verify that email is
    // 1. Whether or not it exists in the DB => from there, have them reset password or something
    // 2. Verify that the passwords created match -- done


    
    const createNewUser = async() => {
        setError('');
        if( newPassword !== confirmNewPass) {
            setError('Passwords do not match');
            return;
        }
        const credentials = { firstName, lastName, email: newEmail, password: newPassword};
        createUser(credentials);
    }


    return(
        <div>
            <div className='error'>{ error }</div>
            { !newUser && 
                <div id='user-login'>
                    <h1>Login</h1>
                    <label>Email: 
                        <input type='text' placeholder='email' onChange={ ev => setEmail(ev.target.value)} value={ email }></input>
                    </label>
                    <label>Password: 
                        <input type='password' placeholder='password' onChange={ ev => setPassword(ev.target.value) } value={ password }></input>
                    </label>
                    <button disabled={ !password || !email } onClick={() => createCred()}>Login</button>
                    <button onClick={ () => setNewUser(true) }>Create User</button>
                </div>
            }
            {
                // May want to clear user info when clicking on back button
                newUser && 
                <div id='create-user'>
                    <h1>Create User</h1>
                    <button onClick={ () => setNewUser(false) }>Back</button>
                    <label>First Name: 
                        <input type='text' placeholder='First Name' onChange={ ev => setFirstName(ev.target.value)} value={ firstName }></input>
                    </label>
                    <label>Last Name: 
                        <input type='text' placeholder='Last Name' onChange={ ev => setLastName(ev.target.value)} value={ lastName }></input>
                    </label>
                    <label>Email: 
                        <input type='text' placeholder='Email' onChange={ ev => setNewEmail(ev.target.value)} value={ newEmail }></input>
                    </label>
                    <label>Password: 
                        <input type='password' placeholder='password' onChange={ ev => setNewPassword(ev.target.value) } value={ newPassword }></input>
                    </label>
                    <label>Confirm Password: 
                        <input type='password' placeholder='password' onChange={ ev => setConfirmNewPass(ev.target.value) } value={ confirmNewPass }></input>
                    </label>
                    <button disabled={ !firstName || !lastName || !newEmail || !newPassword || !confirmNewPass } onClick={ () => createNewUser() }>Submit</button>
                </div>
            }
        </div>
    )
};

export default Login;