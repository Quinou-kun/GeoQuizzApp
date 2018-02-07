<template>
<!-- eslint-disable -->
    <div id="game">
      <div v-if="this.index !== this.maxIndex">
        <div>
            <p v-if="difficulty === '0'">EASY MODE</p>
            <p v-if="difficulty === '1'">NORMAL MODE</p>
            <p v-if="difficulty === '2'">HARDCORE MODE</p>
        </div>
        <div id="img">
            <b-img :src="img" fluid alt="Responsive image"></b-img>
        </div>

        <div id="countdown" class="text-center">
            <h2>Question {{index + 1}}/{{maxIndex}}</h2>
            <b-progress :value="timer" :max="30" class="mb-3"></b-progress>
            <h1 v-if="!this.stop">{{timer}}</h1>
            <b-button v-if="!this.stop" :disabled="!this.clicked" @click="stopTimer()">Here !</b-button>
            <div v-if="this.stop">
                <h1>+ {{pts}} pts</h1>
                <h1>Score : {{score}}</h1>
                <b-button @click="resetMap()">Next !</b-button>
            </div>
        </div>

        <div id="geo-map">
        <v-map ref="map" id="map" :zoom=zoom :center=center :zoomControl=false :options="option" @l-click="placeMarker">
        <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
        </v-map>
        </div>
      </div>

      <div v-else>
        <h1>You completed this series !</h1>
        <h1>Your final score : {{score}}</h1>
        <b-button @click="saveScore()">Save</b-button>
        <b-button to="/new">Restart</b-button>
        <b-button to="/">Home</b-button>
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
      center: null,
      url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: null,
      option: {zoomControl : false, touchZoom : false, doubleClickZoom : false, scrollWheelZoom : false, boxZoom : false, keyboard : false},
      clicked : false,
      clickedMarker : null,
      popup : null,
      line : null,
      timer: 30,
      img: 'http://lorempixel.com/500/500',
      stop: false,
      distance: null,
      score: 0,
      index: 0,
      maxIndex: null,
      pts:0,
      difficulty: 0,
      city: {},
      imgNumber: 0,
      clickedMarkerIcon: L.icon({
        iconUrl: 'https://image.flaticon.com/icons/svg/33/33622.svg'
      })
    }
  },
  mounted () {

    this.$refs.map.mapObject.dragging.disable();

    this.difficulty = this.$store.getters['game/getDifficulty']
    this.city = this.$store.getters['game/getCity']
    this.maxIndex = this.city.photos.length

    let position = this.city.mapOptions.split(';')

    this.center = L.latLng(position[0], position[1])
    this.zoom = Number(position[2])

    this.nextImage(this.imgNumber)

  },
  methods :{
    nextImage (imgNumber){
      let markerPosition = this.city.photos[imgNumber].position.split(';')
      this.marker = L.marker(L.latLng(markerPosition[0], markerPosition[1]))
      this.img = 'http://localhost:8080/geoquizzapi/api/photos/' + this.city.photos[imgNumber].id
    },
  	placeMarker (event) {
      if(!this.stop){
        if (!this.clicked){
          this.clicked = true
          this.clickedMarker = L.marker(event.latlng)
          this.clickedMarker.addTo(this.$refs.map.mapObject)
        }else{
          this.clickedMarker.setLatLng(event.latlng)
        }
      }

    },
    setTimer (sec) {
      this.timer = sec
    },
    count () {
      let interval = setInterval(() => {
        this.setTimer(this.timer)
        this.timer--
        if (this.timer <= 0 || this.stop) {
          if(!this.stop){
            this.stop = !this.stop
          }
          clearInterval(interval)
          this.displaySolution()
        }
      }, 1000)
    },
    displaySolution(){
      this.$refs.map.mapObject.dragging.disable()

      this.marker.addTo(this.$refs.map.mapObject)

      if(this.clickedMarker !== null){
        this.line = new L.Polyline([this.clickedMarker.getLatLng(), this.marker.getLatLng()])
        this.$refs.map.mapObject.addLayer(this.line)
        this.distance = Math.round(10* this.clickedMarker.getLatLng().distanceTo(this.marker.getLatLng()))/10

        let options = {
          autoClose: false,
          closeButton: false,
          closeOnClick: false
        }
        if(this.distance !== null){
          this.popup = L.popup(options)
            .setLatLng([(this.marker.getLatLng().lat + this.clickedMarker.getLatLng().lat)/2, (this.marker.getLatLng().lng + this.clickedMarker.getLatLng().lng)/2])
            .setContent(this.distance + ' meters').openOn(this.$refs.map.mapObject)
        }

      }

      }

      this.calculateScore()
      this.resetTimer()
    },
    calculateScore () {
      switch(this.difficulty){
        case '0':
          if(this.distance < 300){
            this.pts += 5
          } else if(this.distance < 500) {
            this.pts += 3
          } else if(this.distance < 700){
            this.pts += 1
          }
          break
        case '1':
          if(this.distance < 150){
            this.pts += 5
          } else if(this.distance < 300) {
            this.pts += 3
          } else if(this.distance < 500){
            this.pts += 1
          }
          break
        case '2':
          if(this.distance < 50){
            this.pts += 5
          } else if(this.distance < 150) {
            this.pts += 3
          } else if(this.distance < 300){
            this.pts += 1
          }
          break
        default:
          break
      }

      if(this.timer >= 20){
        this.pts*=4
      } else if(this.timer >= 10){
        this.pts*=2
      }
      this.score += this.pts
    },
    resetTimer () {
      this.timer = 30
    },
    resetMap () {
      this.index += 1
      this.$refs.map.mapObject.removeLayer(this.marker)
      if(this.clickedMarker !== null){
        this.$refs.map.mapObject.removeLayer(this.clickedMarker)
        this.$refs.map.mapObject.removeLayer(this.popup)
        this.$refs.map.mapObject.removeLayer(this.line)
      }
      this.pts = 0
      this.stop = false
      this.clicked = false
      this.clickedMarker = null
      this.$refs.map.mapObject.dragging.enable()

      this.imgNumber++
      this.nextImage(this.imgNumber)

      this.count()

    },
    stopTimer () {
      if(this.clicked){
        this.stop = !this.stop  
      } 
    },
    saveScore () {
      alert(this.score)
    }

  }
}
</script>

<style>
/* eslint-disable */
@import "../../node_modules/leaflet/dist/leaflet.css";

    #geo-map{
        width: 50vw;
        height: 80vh;
    }
    #geo-map, #img, #countdown{
        vertical-align : middle;
        display : inline-block;
    }
    #countdown{
        text-align : center;
        padding : 0 2vw;
    }

    #game{
        background-color : white;
    }
</style>