import React, { useRef, useEffect, useState, createRef } from 'react';
import Map, {
   Source,
   Marker,
   Layer,
   GeolocateControl,
   NavigationControl,
   FullscreenControl,
} from 'react-map-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';

function App() {
   const mapContainer = useRef(null);
   const [lng, setLng] = useState(77.209);
   const [lat, setLat] = useState(28.6139);
   const [zoom, setZoom] = useState(1);

   const getCountry = () => {
      axios
         .get(
            `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=8c473e6979884d52a85c6ddcb697b502`,
         )
         .then(function (response) {
            console.log(response.data.results[0].components['ISO_3166-1_alpha-2']);
         })
         .catch(function (error) {
            console.log(error);
         });
   };

   return (
      <div>
         <link
            href="https://api.tiles.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css"
            rel="stylesheet"
         />
         <h1>Global Climate News</h1>
         <h3>Select any country</h3>
         <pre id="info"></pre>
         <Map
            mapboxAccessToken="pk.eyJ1IjoiYWdvbGwwMSIsImEiOiJjbGhmNWF4ZWgwMXhjM3FwZGFkYnIzczM0In0.o6-UGqbzNBNrpA-he4s2PA"
            style={{
               container: 'map',
               width: '80vw',
               height: '70vh',
               border: 'solid 2px red',
            }}
            initialViewState={{
               latitude: lat,
               longitude: lng,
               zoom: 5,
            }}
            onMouseMove={(e) => {
               document.getElementById('info')!.innerHTML =
                  // `e.point` is the x, y coordinates of the `mousemove` event
                  // relative to the top-left corner of the map.
                  JSON.stringify(e.point) +
                  '<br />' +
                  // `e.lngLat` is the longitude, latitude geographical position of the event.
                  JSON.stringify(e.lngLat.wrap());
               setLng(Number(JSON.stringify(e.lngLat).split(',')[0].slice(7)));
               setLat(Number(JSON.stringify(e.lngLat).split(',')[1].slice(6, -1)));
            }}
            onClick={() => {
               console.log('click noticed at');
               console.log('longitude: ', lng, 'latitude: ', lat);
               getCountry();
            }}
            projection={'globe'}
            mapStyle="mapbox://styles/mapbox/streets-v12"
         >
            <NavigationControl position="top-right" />
            <Marker longitude={77.209} latitude={28.6139} />
            <FullscreenControl />
         </Map>
      </div>
   );
}

export default App;
