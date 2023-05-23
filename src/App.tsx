import React, { useRef, useEffect, useState, createRef } from 'react';
import Map, { Marker, NavigationControl, FullscreenControl, Popup } from 'react-map-gl';
import './App.css';
import axios from 'axios';

function App() {
   const [lng, setLng] = useState(77.209);
   const [lat, setLat] = useState(28.6139);
   const [showPopup, setShowPopup] = React.useState(true);
   const [showNews, setShowNews] = React.useState(false);
   const [newsObj, setNewsObj] = React.useState(<h1>Top News From the Country you Selected</h1>);

   function countryNewsObject() {
      return {
         title: '',
         text: '',
         author: '',
         image: '',
         publish_date: '',
         url: '',
      };
   }

   let curCountry = '';

   const getCountry = () => {
      axios
         .get(
            `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=8c473e6979884d52a85c6ddcb697b502`,
         )
         .then(function (response) {
            const country = response.data.results[0].components['ISO_3166-1_alpha-2'];
            console.log(country);
            getNewsForCountry(country);
         })
         .catch(function (error) {
            console.log(error);
         });
   };

   const getNewsForCountry = (country: any) => {
      curCountry = country;
      const newsArray: any = [];

      axios
         .get(
            `https://api.worldnewsapi.com/search-news?text=Climate&source-countries=${country}&language=en&number=3&api-key=7d43771171214c03990266b5aa4d1197`,
         )
         .then(function (response) {
            console.log(response.data.news);
            setShowNews(true);
            for (let i = 0; i < 3; i++) {
               if (!response.data.news[i]) {
                  setNewsObj(
                     <div id="too-bad">
                        <h1>Too bad! no news found for {curCountry}</h1>
                     </div>,
                  );
                  return;
               }
               const curNewsObj = countryNewsObject();
               curNewsObj.title = response.data.news[i].title;
               curNewsObj.text = response.data.news[i].text;
               curNewsObj.url = response.data.news[i].url;
               curNewsObj.image = response.data.news[i].image;
               curNewsObj.author = response.data.news[i].author;
               curNewsObj.publish_date = response.data.news[i].publish_date;
               newsArray.push(curNewsObj);
            }

            console.log(newsArray[0].author);
            console.log(newsArray[1].author);
            console.log(newsArray[2].author);

            setNewsObj(
               <div id="newsBoxDiv">
                  <h1>Top Climate/Energy News From {curCountry}</h1>
                  <div id="box">
                     <p>TITLE: {newsArray[0].title}</p>
                     <p>{newsArray[0].text.slice(0, 150)}...</p>
                     <a href={newsArray[0].url}>For the full article click here!</a>
                     <p>
                        Article Written by: {newsArray[0].author} on {newsArray[0].publish_date}
                     </p>
                     <img
                        src={newsArray[0].image}
                        style={{ position: 'relative', width: '30vw', height: '30vh' }}
                     />
                  </div>
                  <div id="box">
                     <p>TITLE: {newsArray[1].title}</p>
                     <p>{newsArray[1].text.slice(0, 150)}...</p>
                     <a href={newsArray[1].url}>For the full article click here!</a>
                     <p>
                        Article Written by: {newsArray[1].author} on {newsArray[1].publish_date}
                     </p>
                     <img
                        src={newsArray[1].image}
                        style={{ position: 'relative', width: '30vw', height: '30vh' }}
                     />
                  </div>
                  <div id="box">
                     <p>TITLE: {newsArray[2].title}</p>
                     <p>{newsArray[2].text.slice(0, 150)}...</p>
                     <a href={newsArray[2].url}>For the full article click here!</a>
                     <p>
                        Article Written by: {newsArray[2].author} on {newsArray[2].publish_date}
                     </p>
                     <img
                        src={newsArray[2].image}
                        style={{ position: 'relative', width: '30vw', height: '30vh' }}
                     />
                  </div>
               </div>,
            );
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

         <div style={{ position: 'absolute', left: '0vw' }}>{newsObj}</div>
      </div>
   );
}

export default App;
