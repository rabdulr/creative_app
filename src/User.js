import React, {useState, useEffect} from 'react';

const User = ({ auth }) => {
    const [user, setUser] = useState({})
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPass, setConfirmNewPass] = useState('');

    useEffect(() => {
        if(auth){
            setUser(auth)
        }
    }, [auth])

    useEffect(() => {
        if(user){
            setEmail(user.email);
            setFirstName(user.firstName);
            setLastName(user.lastName);
        }
    }, [user])
    // Need option to reset password
    // However, not utilizing any type of API or user confirmation to reset password
    // if the user cannot recall current password. May need to create this in DB

    return(
        <div>
            <div className='error'>
                { error }
            </div>
            <div id='user-page'>
                <h1>User</h1>
                <label>Email: 
                    <input type='text' placeholder='email' onChange={ ev => setEmail(ev.target.value)} value={ email }></input>
                </label>
                <label>First Name: 
                    <input type='text' placeholder='first name' onChange={ ev => setFirstName(ev.target.value)} value={ firstName }></input>
                </label>
                <label>Last Name: 
                    <input type='text' placeholder='last name' onChange={ ev => setLastName(ev.target.value)} value={ lastName }></input>
                </label>
                <label>Password: 
                    <input type='password' placeholder='password' onChange={ ev => setPassword(ev.target.value) } value={ password }></input>
                </label>
                <button onClick={() => alert('Create update function')}>Update</button>
                <button onClick={ () => alert('Create delete function') }>Delete</button>
            </div>
        </div>
    )
};

export default User;