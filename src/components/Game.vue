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
        <v-map ref="map" id="map" :zoom=15 :center="[48.6915784, 6.1767092]" :zoomControl=false :options="option" @l-click="placeMarker">
    		<v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
        </v-map>
        </div>

        <div>
            <b-button v-if="!this.stop" @click="stopTimer()">This is here !</b-button>
        </div>

        <div v-if="this.stop">
            <h1>+ {{pts}} pts</h1>
            <h1>Score : {{score}}</h1>
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
      center: L.latLng(48.6915784, 6.1767092),
      url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: null,
      option: {zoomControl : false, touchZoom : false, doubleClickZoom : false, scrollWheelZoom : false, boxZoom : false, keyboard : false},
      clicked : false,
      clickedMarker : null,
      timer: 30,
      img: 'http://lorempixel.com/500/500',
      stop: false,
      distance: null,
      score: 0,
      pts:0
    }
  },
  methods :{
  	placeMarker (event) {
  		if (!this.clicked){


            this.marker = L.marker(L.latLng(48.6915784, 6.1767092))

  			this.clicked = true

  			this.clickedMarker = L.marker(event.latlng)
  			this.clickedMarker.addTo(this.$refs.map.mapObject)
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
          this.displaySolution()
        }
      }, 1000)
    },
    displaySolution(){
      this.marker.addTo(this.$refs.map.mapObject)
      this.distance = Math.round(10* this.clickedMarker.getLatLng().distanceTo(this.marker.getLatLng()))/10
      if(this.distance < 150){
        this.pts += 5
      } else if(this.distance < 300) {
        this.pts += 3
      } else{
        this.pts += 1
      }
      if(this.timer >= 20){
        this.pts*=4
      } else if(this.timer >= 10){
        this.pts*=2
      }
      this.score += this.pts
      this.resetTimer()
    },
    resetTimer () {
      this.timer = 30
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
        width: 70vw;
        height: 80vh;
    }
    #geo-map, #img{
        vertical-align : top;
        display : inline-block;
    }
</style>