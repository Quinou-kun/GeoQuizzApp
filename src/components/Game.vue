<template>
<<<<<<< HEAD
<!-- eslint-disable -->
    <div>
        <h1>Game page</h1>
        <v-map ref="map" id="map" :zoom=13 :center="[47.413220, -1.219482]" :zoomControl=false :options="option" @l-click="placeMarker">
    		<v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
        </v-map>
=======
    <div>
        <h1>Game page</h1>
>>>>>>> fd3a70b1241758a46271b9e8dc973c974acea504
    </div>
</template>

<script>
<<<<<<< HEAD
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
      clickedMarker : null

    }
  },
  methods :{
  	placeMarker (event) {
  		if (!this.clicked){
//  			L.marker(event.latlng).addTo(this.$refs.map.mapObject)     		<v-marker ref="marker"></v-marker>

			this.marker = L.marker(L.latLng(47.413220, -1.219482))
			this.marker.addTo(this.$refs.map.mapObject)

  			this.clicked = true

  			this.clickedMarker = L.marker(event.latlng)
  			this.clickedMarker.addTo(this.$refs.map.mapObject)


  			let distance = this.clickedMarker.getLatLng().distanceTo(this.marker.getLatLng())
  			alert(distance)
  		}else{
  			this.clickedMarker.setLatLng(event.latlng)
  		}
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
</style>
=======
export default {
  name: 'Game',
  data () {
    return {
      msg: 'This is the game page'
    }
  }
}
</script>
>>>>>>> fd3a70b1241758a46271b9e8dc973c974acea504
