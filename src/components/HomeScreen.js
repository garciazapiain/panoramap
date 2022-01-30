import React from 'react';


function HomeScreen (props) {
    return (
        <div className='home-screen'>
            <h1>View from Vrtba Gardens</h1>
            <h3 style={{paddingLeft:'15px'}}>Explore the image by clicking on different sites you see</h3>
            <h3 style={{paddingLeft:'15px'}}>Or for more information about Vrtba gardens click <button onClick={props.homeScreenDeactivate}>here</button></h3>
      </div>
    )

}

export default HomeScreen