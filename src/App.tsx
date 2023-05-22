import React, { useRef, useEffect, useState, createRef } from 'react';
import Map, { Source, Marker, Layer, GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css';

<link href="https://api.tiles.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css" rel="stylesheet" />;

function App() {
   const mapContainer = useRef(null);
   const [lng, setLng] = useState(57.3758576273);
   const [lat, setLat] = useState(24.45677614934);
   const [zoom, setZoom] = useState(1);
   const [viewport, setViewport] = useState({});

   useEffect(() => {
      navigator.geolocation.getCurrentPosition((pos) => {
         setViewport({
            ...viewport,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            zoom: 3.5,
         });
      });
   }, []);

   return (
      <div id="content-div">
         <h1>Global Climate News</h1>
         <h3>Select any country!</h3>
         <Map
            mapboxAccessToken="pk.eyJ1IjoiYWdvbGwwMSIsImEiOiJjbGhmNWF4ZWgwMXhjM3FwZGFkYnIzczM0In0.o6-UGqbzNBNrpA-he4s2PA"
            style={{
               container: 'map',
               width: '76vw',
               height: '60vh',
               borderRadius: '30px',
               border: '2px solid blue',
            }}
            initialViewState={{
               latitude: lat,
               longitude: lng,
               zoom: 1,
            }}
            projection={'globe'}
            mapStyle="mapbox://styles/mapbox/satellite-v9"
         >
            <GeolocateControl
               positionOptions={{ enableHighAccuracy: true }}
               trackUserLocation={true}
            />
         </Map>
      </div>
   );
}

export default App;
