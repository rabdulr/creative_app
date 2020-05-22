import React, { useEffect, useState } from 'react';

const CheckIn = ({ checks }) => {
    const [checkIns, setCheckIns] = useState([])

    useEffect(() => {
        if(checks) {setCheckIns(checks)};
    }, [checks]);

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
        </div>
    )
};

export default CheckIn;