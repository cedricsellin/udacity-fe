var lib=function(t){var n={};function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var i in t)e.d(r,i,function(n){return t[n]}.bind(null,i));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=2)}([function(t,n,e){},function(t,n){let e=null,r=null,i=null;function o(t){r.innerHTML=t.toString()}function d(t){console.log("clicked on Search")}document.addEventListener("DOMContentLoaded",(function(){e=document.getElementById("new_trip_search_btn"),r=document.getElementById("error_field"),i=document.getElementById("saved_trips"),e.addEventListener("click",d),async function(){let t="";try{const n=await fetch("http://localhost:8080/savedTrips").catch(t=>o(t));if(200!=n.status)return void o("Server Error "+n.status);savedTrips.trips.forEach(n=>{t+='<div id="trip_photo" class="trip_photo_holder"></div>\n        <div class="trip_details">\n            <div id="trip_location-0"> My Trip to Paris, France</div>\n            <div id="trip_date-0">Departing: 12/25/2019</div>\n            <div id="trip_buttons-0">\n                <button id="trip_save_btn" type="button" class="trip_btn"> Save Trip</button>\n                <button id="trip_remove_btn" type="button" class="trip_btn"> Remove Trip</button>\n            </div>\n            <div id="trip_info-days-0">Paris is 220 days away</div>\n            <div id="trip_info-weather-0">\n                Typical weather for Paris is: <br>\n                High: 46 Low: 30<br>\n                Mostly sunny<br>\n            </div>\n        </div>'})}catch(t){o(t.toString())}i.innerHTML+=t}()}))},function(t,n,e){"use strict";e.r(n);e.p,e(0),e(1)}]);