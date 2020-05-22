import React, { useEffect, useState } from 'react';

const Journal = ({ posts }) => {
    const [entries, setEntries] = useState([])

    useEffect(() => {
        if(posts) {setEntries(posts)};
    }, [posts])

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
        </div>
    )
};

export default Journal