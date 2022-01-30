import './App.css';
import React from 'react';
import data from './data'
import pano from './images/panoramic.jpeg'
import InfoPlace from './components/InfoPlace.js'
import LocationPlace from './components/LocationPlace';
import HomeScreen from './components/HomeScreen';

function App() {
  const [coords, setCoords] = React.useState("")
  const [dataPlaces] = React.useState(data)
  // const [geoCoords] = React.useState({lat: 50.0911, lng: 14.4016})
  const [selectedPlace, setSelectedPlace] = React.useState(dataPlaces[0])
  const [dimensions, setDimensions] = React.useState([])
  const [loading,setLoading] = React.useState(false)
  const [homeScreen, setHomeScreen] = React.useState(true)

  // Get initial dimensions of page, will be needed to dynaically calculate the coordinates of each place
  function getDimensions(e) {
    let dimensionArr = [e.target.offsetWidth,e.target.offsetHeight] 
    setDimensions(dimensionArr)
  }

  React.useEffect(() => {
    async function getInitialPlace() {
      const data = await (dataPlaces)
      data ? setSelectedPlace(data[0]) : null
      setLoading(true);
    }
      getInitialPlace()
    }, [dataPlaces])

  // Map through all places and return area tag with dynamic coordinate information
  const mapPlaces = dataPlaces.map(place => {
    let pct = place.percentageCoords
    let adjustedCoords = [pct[0]*dimensions[0],pct[1]*dimensions[1],pct[2]*dimensions[0],pct[3]*dimensions[1]]
    return (
      <area shape='rect' coords={adjustedCoords} alt='panoramic' key={place.id} onClick={()=>clickPlace(place.id)} />
    )
  })
  
  // Used to get coords information to set on data.js
  function fireCoordInfo (e){
    let coordsArr = [e.pageX, e.pageY]
    setCoords(coordsArr)
  }

  // function that reacts to place clicked, setting state for selected place
  function clickPlace (id) {
    setHomeScreen(false)
    dataPlaces.map(place => {
      return place.id === id ? setSelectedPlace(place) : null
     })
    }  

  function homeScreenDeactivate () {
    setHomeScreen(false)
  }

  return (
    <div className='app'>
      <header>
      </header>
      <main>
        <div className='panoramic-map-container'>
          <img className="panoramic-map" src={pano} alt='panoramic' useMap='#panoramic-map' onClick={fireCoordInfo} onLoad={getDimensions} />
        </div>
        <map name='panoramic-map'>
          {mapPlaces}
        </map>
        {/* <p><strong>Percentage coordinate are: </strong>{coords[0]/dimensions[0]}, {coords[1]/dimensions[1]} </p> */}
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


////https://stackoverflow.com/questions/8343531/is-it-possible-to-style-a-mouseover-on-an-image-map-using-css
// https://developers.google.com/maps/documentation/javascript/react-map
// https://developers.google.com/maps/documentation/javascript/examples/map-simple#maps_map_simple-html



// Problems, not dynamic if you move screen on demand you have to reload
// window.addEventListener('resize',getDimensions)
 // const imageInfo = document.getElementsByClassName("panoramic-map");
    // let dimensionArr = [imageInfo[0].width, imageInfo[0].height]
    // setDimensions(dimensionArr)


    // debt:
    // - double render data, message when resize to reload page