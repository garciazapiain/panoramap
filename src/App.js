import './App.css';
import React, { useEffect, useRef } from 'react'
import data from './data'
import pano from './images/panoramic.jpeg'
import InfoPlace from './components/InfoPlace.js'
import LocationPlace from './components/LocationPlace';
import HomeScreen from './components/HomeScreen';

function App() {
  const [coords, setCoords] = React.useState("")
  const [dataPlaces] = React.useState(data)
  const [selectedPlace, setSelectedPlace] = React.useState(dataPlaces[0])
  const [dimensions, setDimensions] = React.useState([])
  const [homeScreen, setHomeScreen] = React.useState(true)
  const ref = useRef(null)


  // Get initial dimensions of panoramic image, will be needed to dynaically calculate the coordinates of each place
  useEffect(() => {
    let dimensionArr = [ref.current.offsetWidth,ref.current.offsetHeight] 
    setDimensions(dimensionArr)
  },[])

  const mapPlaces = dataPlaces.map(place => {
    let pct = place.percentageCoords
    let left = pct[0]*dimensions[0]
    let top = pct[1]*dimensions[1]
    let width = (pct[2]-pct[0])*dimensions[0]
    let height = (pct[3]-pct[1])*dimensions[1]
    return (
      <a className="area" key={place.id} style={{left: left, top: top, width:width, height:height}} onClick={()=>clickPlace(place.id)}></a>
    )
  })
  
  // Used to get coords information to set on data.js
  function fireCoordInfo (e){
    let coordsArr = [e.pageX, e.pageY]
    setCoords(coordsArr)
    console.log(e)
  }

  // function that reacts to place clicked, setting state for selected place
  function clickPlace (id) {
    setHomeScreen(false)
    dataPlaces.map(place => {
      return place.id === id ? setSelectedPlace(place) : null
     })
    }  

  // Function that deactivates homescreen on info-map section
  function homeScreenDeactivate () {
    setHomeScreen(false)
  }

  return (
    <div className='app'>
      <header>
      </header>
      <main>
        <div ref={ref} className="panoramic-map-container" style={{backgroundImage:`url("${pano}")`}} onClick={fireCoordInfo}>
          {mapPlaces}
        </div>
        {/* <p><strong>Coords are: </strong>{coords[0]}, {coords[1]} </p>
        <p><strong>Dimensions are: </strong>{dimensions[0]}, {dimensions[1]} </p>
        <p><strong>Percentage coordinate are: </strong>{coords[0]/dimensions[0]}, {coords[1]/dimensions[1]} </p> */}
        {homeScreen?
          <HomeScreen
            homeScreenDeactivate={homeScreenDeactivate}
          />
          :
          <div className='info-and-location'>
            <InfoPlace 
              selectedPlace={selectedPlace}
            />
            <LocationPlace
              selectedPlace={selectedPlace}
            />
          </div>
        }
      </main>
    </div>
  );
}

export default App;

