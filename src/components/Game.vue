<template>
<!-- eslint-disable -->
    <div>
        <h1>Game page</h1>
        <div>
            <h1>{{timer}}</h1>
        </div>
        <div id="img">
            <b-img :src="img" fluid alt="Responsive image"></b-img>
        </div>
        <div id="geo-map">
        <v-map ref="map" id="map" :zoom=13 :center="[47.413220, -1.219482]" :zoomControl=false :options="option" @l-click="placeMarker">
    		<v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
        </v-map>
        </div>

        <div>
            <b-button @click="stopTimer()">This is here !</b-button>
        </div>

        <div v-if="this.stop">
            <h1>+3pts</h1>
            <h3>Distance : {{distance}} meters</h3>
            <b-button>Go to the next !</b-button>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import Vue2Leaflet from 'vue2-leaflet';
import Vue from 'vue';

Vue.component('v-map', Vue2Leaflet.Map);
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer);
Vue.component('v-marker', Vue2Leaflet.Marker);

export default {
  name: 'Game',
  components: {
    'v-map': Vue2Leaflet.Map,
    'v-tilelayer' :Vue2Leaflet.TileLayer,
    'v-marker': Vue2Leaflet.Marker
  },
  created () {
    this.count()
  },
  data () {
    return {
      msg: 'This is the game page',
      zoom:13,
      center: L.latLng(47.413220, -1.219482),
      url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: null,
      option: {zoomControl : false, touchZoom : false, doubleClickZoom : false, scrollWheelZoom : false, boxZoom : false, keyboard : false},
      clicked : false,
      clickedMarker : null,
      timer: 10,
      img: 'http://lorempixel.com/500/500',
      stop: false,
      distance: null
    }
  },
  methods :{
  	placeMarker (event) {
  		if (!this.clicked){


            this.marker = L.marker(L.latLng(47.413220, -1.219482))

  			this.clicked = true

  			this.clickedMarker = L.marker(event.latlng)
  			this.clickedMarker.addTo(this.$refs.map.mapObject)

            this.distance = Math.round(10* this.clickedMarker.getLatLng().distanceTo(this.marker.getLatLng()))/10
  		}else{
  			this.clickedMarker.setLatLng(event.latlng)
  		}
  	},
    setTimer (sec) {
      this.timer = sec
    },
    count () {
      let interval = setInterval(() => {
        this.setTimer(this.timer)
        this.timer--
        if (this.timer < 0 || this.stop) {
          clearInterval(interval)
          this.resetTimer()
          this.displaySolution()
        }
      }, 1000)
    },
    displaySolution(){
      this.marker.addTo(this.$refs.map.mapObject)
    },
    resetTimer () {
      this.timer = 10
    },
    stopTimer () {
  	  this.stop = !this.stop
    }

  }
}
</script>

<style>
/* eslint-disable */
@import "../../node_modules/leaflet/dist/leaflet.css";

    #map{
        width: 500px;
        height: 500px;
    }
    #geo-map, #img{
        vertical-align : top;
        display : inline-block;
    }
</style>