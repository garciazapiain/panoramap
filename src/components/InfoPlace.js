import React from 'react';

function InfoPlace (props) {
    return (
        <div className='info-section'>
            <h1>{props.selectedPlace.placeName}</h1>
        </div>
    )

}

export default InfoPlace