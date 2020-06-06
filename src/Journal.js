import React, { useEffect, useState } from 'react';
import { moods } from '../methods';

const Journal = ({ posts, postEntry }) => {
    const [entries, setEntries] = useState([]);
    const [editEntry, setEditEntries] = useState({});
    const [title, setTitle] = useState('');
    const [mood, setMood] = useState('');
    const [entry, setEntry] = useState('');
    const [editMood, setEditMood] = useState('')

    useEffect(() => {
        if(posts) {
            setEntries(posts.map(post => {
                console.log(post);
                post.display = false;
                return post;
            }));
        };
    }, [posts]);

    // Go through the entries and change the view of the post ID to true
    // Optimize / dry out later
    const setEditView = (id, mood, entry) => {
        setEditMood('')
        setEntries(posts.map(post => {
            if(post.id === id){
                if( post.view === true ) {
                    post.view = false;
                } else {
                    post.view = true;
                }
                return post;
            } else {
                return post;
            }
        }));
        setEditMood(mood)

    }

    const createEntry = () => {
        const post = { title, mood, entry }
        postEntry(post);
        setTitle('');
        setMood('');
        setEntry('');
    };
    
    return(
        <div id='journal-page'>
            <hr />
            <h2>Journal Entries ({ entries.length })</h2>
            <ul>
                {
                    entries.map(entry => {
                        return(
                            <li key={ entry.id }>
                                {
                                    !entry.view && 
                                    <div>
                                        <h4>{ entry.title } - { entry.datePosted }</h4>
                                        <h3>Mood: { entry.mood }</h3>
                                        <p>{ entry.entry }</p>
                                        <button id='edit-journal' onClick={() => setEditView(entry.id, entry.mood, entry.entry)}>Edit</button>
                                    </div>
                                }
                                {
                                    entry.view &&
                                    <div>
                                        <h4>{ entry.title } - { entry.datePosted }</h4>
                                        <label>Mood: 
                                            <select onChange={ ev => setEditMood(ev.target.value) } value={ editMood }>
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
                                        <button>Submit</button>
                                        <button onClick={() => setEditEntries(() => setEditView(entry.id, entry.mood, entry.entry)) }>Back</button>
                                    </div>
                                }
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