import React, { useEffect, useState } from 'react';
import { moods } from '../methods';

const Journal = ({ posts, postEntry }) => {
    const [entries, setEntries] = useState([]);
    const [title, setTitle] = useState('');
    const [mood, setMood] = useState('');
    const [entry, setEntry] =useState('')

    useEffect(() => {
        if(posts) {setEntries(posts)};
    }, [posts])

    const createEntry = () => {
        const post = { title, mood, entry }
        postEntry(post);
        setTitle('');
        setMood('');
        setEntry('');
    }

    return(
        <div id='journal-page'>
            <hr />
            <h2>Journal Entries ({ entries.length })</h2>
            <ul>
                {
                    entries.map(entry => {
                        return(
                            <li key={ entry.id }>
                                <h4>{ entry.title } - { entry.datePosted }</h4>
                                <h3>Mood: { entry.mood }</h3>
                                <p>{ entry.entry }</p>
                            </li>
                        )
                    })
                }
            </ul>
            <div id='create-post'>
                <label>Title: <input type='text' placeholder='title' onChange={ ev => setTitle(ev.target.value) } value={ title }></input></label>
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
                <label>Entry: <textarea placeholder='Insert entry?' onChange={ ev => setEntry(ev.target.value) } value={ entry } rows='5'></textarea></label>
                <button disabled={ !mood || !entry || !title } onClick={ () => createEntry() }>Create Post</button>
            </div>
        </div>
    )
};

export default Journal