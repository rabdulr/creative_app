import React, { useEffect, useState } from 'react';
import { moods } from '../methods';

const CheckIn = ({ checks, addMood }) => {
    const [checkIns, setCheckIns] = useState([]);
    const [mood, setMood] = useState('');
    const [note, setNote] = useState('')

    useEffect(() => {
        if(checks) {setCheckIns(checks)};
    }, [checks]);

    const createMood = () => {
        const newMood = { mood, note };
        addMood(newMood);
        setMood('');
        setNote('')
    }

    return(
        <div id='checkIn-page'>
            <hr />
            <h2>Moods ({ checkIns.length })</h2>
            <ul>
                {
                    checkIns.map(entry => {
                        return(
                            <li key={ entry.id }>
                                <h3>Mood: { entry.mood }</h3>
                                <h3>Date: { entry.datePosted }</h3>
                                <p>{ entry.note }</p>
                            </li>
                        )
                    })
                }
            </ul>
            <div id='create-mood'>
                <label>Mood: 
                    <select onChange={ ev => setMood(ev.target.value) } value={ mood }>
                        <option value=''>-- Select Mood --</option>
                            {
                                moods.map(mood => {
                                    return(
                                        <option value={ mood } key={ mood }>{ mood }</option>
                                    )
                                })
                            }
                    </select>
                </label>
                <label>Note: <textarea placeholder='Insert entry?' onChange={ ev => setNote(ev.target.value) } value={ note }></textarea></label>
                <button disabled={ !mood || !note } onClick={ () => createMood() }>Create Post</button>
            </div>
        </div>
    )
};

export default CheckIn;