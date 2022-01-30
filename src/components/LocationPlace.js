import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

function MapHook (props) {  
    return (
        <Map 
          google={props.google} 
          zoom={14}
          style={{width:"50vw", height:"45vh"}}
          initialCenter={{lat: props.selectedPlace.geoCoords.lat, lng: props.selectedPlace.geoCoords.lng}}
         >
         <Marker 
                name={'Current location'} 
                position={{lat: props.selectedPlace.geoCoords.lat, lng: props.selectedPlace.geoCoords.lng}}
                />
          </Map>
      );
  
  }

export default GoogleApiWrapper({
  apiKey: ("")
})(MapHook)


