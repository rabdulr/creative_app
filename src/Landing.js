import React from 'react';

const Landing = () => {
    return(
        <div>
            <h2>This is what people would see when they successfuly log into the site</h2>
            <ul>
                <li>Automatically ask to add a thought?</li>
                <li>Show the last thought that was created</li>
                <li>Analytics of some sort</li>
                <li>Place or navigation to add thoughts and what not</li>
            </ul>
            <h2>Navigation</h2>
            <ul>
                <li><button>New Journal</button></li>
                <li><button>New Feeling</button></li>
                <li>Journal - Maybe a calendar view or list?</li>
                <li>Feelings - Maybe a calendar view or list?</li>
                <li>Analytics of some sort</li>
            </ul>
        </div>
    )
};

export default Landing;