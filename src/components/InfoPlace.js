import React from 'react';


function InfoPlace (props) {
    return (
        <div className='info-section'>
            <header style={{display:'flex'}}>
            <h1>{props.selectedPlace.placeName}</h1>
            <h1 style={{fontStyle:'italic', fontWeight:'normal', fontSize:'x-large', alignSelf:'center'}}>{props.selectedPlace.placeNameOriginalLanguage}</h1>
            </header>
            <div className='info-section-content'>
                <div className='info-section-content-text'>
                    <table>
                    <tbody>
                        <tr>
                            <td style={{paddingRight:'-5px'}}><h5>Address:</h5></td>
                            <td><p>{props.selectedPlace.address}</p></td>
                        </tr>
                        <tr>
                            <td style={{paddingRight:'1px'}}><h5>Constructed in:</h5></td>
                            <td><p>{`${props.selectedPlace.yearStarted}`}{props.selectedPlace.yearCompleted? ` - ${props.selectedPlace.yearCompleted}`: ""}</p></td>
                        </tr>
                        <tr>
                            <td style={{paddingRight:'1px'}}><h5>Architectual Syle: </h5></td>
                            <td><p>{props.selectedPlace.architectualStyle}</p></td>
                        </tr>
                        <tr>
                            <td style={{paddingRight:'1px'}}><h5>Architect: </h5></td>
                            <td><p>{props.selectedPlace.architect}</p></td>
                        </tr>
                    </tbody>
                    </table>
                    <p style={{paddingTop:'5px'}}>{props.selectedPlace.description}</p>
                </div>
                <img src={props.selectedPlace.img}></img>
            </div>
        </div>
    )
}

export default InfoPlace