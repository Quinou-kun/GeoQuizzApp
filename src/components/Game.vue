<template>
<!-- eslint-disable -->
    <div>
        <div id="game"  v-if="this.index !== this.maxIndex">
          <div>
            <div id="img">
                <b-card no-body bg-variant="dark"
                        text-variant="white"
                        class="game-content text-center">
                    <b-card-header id="countdown" class="text-center">
                        <h2>Question {{index + 1}}/{{maxIndex}}</h2>
                        <h5 v-if="difficulty === '0'">({{city.ville}}, EASY MODE)</h5>
                        <h5 v-if="difficulty === '1'">({{city.ville}}, NORMAL MODE)</h5>
                        <h5 v-if="difficulty === '2'">({{city.ville}}, HARDCORE MODE)</h5>
                    </b-card-header>
                    <b-card-body>
                        <b-progress :value="timer" :max="30" class="mb-3" variant="danger"></b-progress>
                        <h1>{{timer}}</h1>
                        <h3 v-if="this.stop">This is the {{city.photos[imgNumber].desc}}</h3>
                        <b-img :src="img" alt="Photo" id="photo"></b-img>
                        <div v-if="this.stop">
                            <h1>+ {{pts}} pts</h1>
                            <b-button @click="resetMap()" variant="danger">Next !</b-button>
                        </div>
                        <div v-else>
                            <b-button v-if="!this.clicked" disabled variant="danger">Until validate, put a marker !</b-button>
                            <b-button v-else @click="stopTimer()" variant="danger">Here !</b-button>
                        </div>
                    </b-card-body>
                </b-card>
            </div>

            <div id="geo-map">
                <v-map ref="map" id="map" :zoom=zoom :center=center :options="option" @l-click="placeMarker">
                <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
                </v-map>
                </div>
          </div>
        </div>

      <div v-else class="game-finished">
          <div class="game-finished-container">
              <b-card bg-variant="dark"
                      header="<h3>You completed this sery !</h3>"
                      text-variant="white"
                      class="home-content text-center">

                  <b-table title="table" striped hover :items="itemsScore" :fields="fieldsScore"></b-table>
              </b-card>
              <b-card bg-variant="dark"
                      header="<h3>Final Score</h3>"
                      text-variant="white"
                      class="home-content text-center">
                <h3>{{score}} pts</h3>
              </b-card>
              <b-card bg-variant="dark"
                      header="<h3>Want to save your score ?</h3>"
                      text-variant="white"
                      class="home-content text-center">
                  <b-form>
                      <label for="pseudo-input"><h4>Your name :</h4></label>
                      <b-input class="text-center" type="text" id="pseudo-input" required></b-input>
                      <b-button type="submit" id="pseudo-input" required variant="danger">Save my score</b-button>
                  </b-form>
              </b-card>
              <b-card no-body
                      bg-variant="dark"
                      text-variant="white"
                      class="home-content text-center">
                  <b-card-header>
                    <h3>Want to start a new game ? <b-button variant="danger" to="/new">Click here</b-button></h3>
                  </b-card-header>
              </b-card>
          </div>
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
      option: {touchZoom : false, doubleClickZoom : false, boxZoom : false, keyboard : false},
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
      multiplier: 1,
      city: {},
      imgNumber: 0,
      clickIcon : new L.icon({
            iconUrl: require('../assets/marker/clicked_marker-icon.png'),
            iconAnchor: [13,40]
      }),
      fieldsScore: [ 'QUESTION', 'DISTANCE', 'POINTS', 'TIMER MULTIPLIER', 'TOTAL'],
      itemsScore: [],
    }
  },
  mounted () {

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
      if(imgNumber < this.city.photos.length){
        let markerPosition = this.city.photos[imgNumber].position.split(';')
        this.marker = L.marker(L.latLng(markerPosition[0], markerPosition[1]))
        this.img = 'http://localhost:8080/geoquizzapi/api/photos/' + this.city.photos[imgNumber].id
      }
    },
  	placeMarker (event) {
      if(!this.stop){
        if (!this.clicked){
          this.clicked = true
          this.clickedMarker = L.marker(event.latlng, {icon : this.clickIcon})
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
        this.line.setStyle({
         color: 'black'
        })
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
      if(this.timer >= 20){
        this.multiplier = 4
      } else if(this.timer >= 10){
        this.multiplier = 2
      }
      this.calculateScore()
      let scoreboard = { 'QUESTION':this.index + 1, 'DISTANCE':this.distance +' meters', 'POINTS':this.pts, 'TIMER MULTIPLIER':'x' + this.multiplier, 'TOTAL':this.pts*this.multiplier}
      this.itemsScore.push(scoreboard)

    },
    calculateScore () {
      if(this.distance == null){
        this.pts = 0
      } else {
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
        this.pts*=this.multiplier
    }
      this.score += this.pts
    },
    resetTimer () {
      this.timer = 30
    },
    resetMap () {
      this.resetTimer()
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
        width: 51vw;
        height: calc(100vh - 140px);
        float : right;
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
        background-color : black;
    }

    #photo{
        height: auto;
        padding-bottom : 2.5%;
        width : 70%;
        max-height : 70%;
    }
    .game-content{
        width : 48vw;
        height: calc(100vh - 140px);
    }

    .game-finished{
        height : calc(100vh - 140px);
        background : rgba(0,0,0,0.7);
    }

    .game-finished-container{
        margin: auto;
        width : 50%;
    }
</style>