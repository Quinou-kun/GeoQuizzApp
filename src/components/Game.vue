<template>
    <!-- eslint-disable -->
    <div id="game-container">
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
                            <h3 v-if="this.stop && !this.paused">This is the {{city.photos[imgNumber].desc}}</h3>
                            <b-img :src="img" alt="Photo" id="photo"></b-img>
                            <div v-if="this.stop  && !this.paused">
                                <h1>+ {{pts}} pts</h1>
                                <b-button @click="resetMap()" variant="danger" size="lg" class="mr-3">Next !</b-button>
                                <b-button size="lg" @click="pause()">PAUSE</b-button>

                            </div>
                            <div v-else>
                                <b-button v-if="!this.clicked" disabled variant="danger" size="lg" class="mr-3">Until validate, put a marker !</b-button>
                                <b-button v-else @click="stopTimer(false)" variant="danger" size="lg" class="mr-3">Here !</b-button>
                                <b-button v-if="!this.stop" @click="stopTimer(true)" size="lg" class="mr-3">I give up !</b-button>
                                <b-button size="lg" @click="pause()">PAUSE</b-button>
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
                        header="<h3>You completed this series !</h3>"
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
                        header="<h3>What do you want to do now ?</h3>"
                        text-variant="white"
                        class="home-content text-center">
                    <b-form>
                        <b-button v-b-modal.saveScore variant="success">Save my score</b-button>
                        <b-button variant="danger" to="/new">Play again !</b-button>
                        <b-button to="/">Go home</b-button>
                    </b-form>
                </b-card>
            </div>
        </div>

        <b-modal id="saveScore" title="Save your score" ref="scoreModal"
                 header-bg-variant="dark"
                 header-text-variant="light"
                 body-bg-variant="dark"
                 body-text-variant="light"
                 footer-bg-variant="dark"
                 footer-text-variant="light">
            <div class="d-block">
                <p hidden id="errorMessage"></p>
                <b-input-group prepend="Name">
                    <b-form-input id="playerName"></b-form-input>
                </b-input-group>
            </div>
            <div slot="modal-footer">
                <b-btn variant="success" @click="saveScore">Save</b-btn>
                <b-btn variant="danger" @click="hideModal">Cancel</b-btn>
            </div>
        </b-modal>
    </div>
</template>

<script>
/* eslint-disable */
    import Vue2Leaflet from 'vue2-leaflet';
    import Vue from 'vue';
    import axios from 'axios'

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
          token: "",
          gameId: "",
          clickedMarkerIcon: L.icon({
            iconUrl: 'https://image.flaticon.com/icons/svg/33/33622.svg'
          }),
          clickIcon : new L.icon({
            iconUrl: require('../assets/marker/clicked_marker-icon.png'),
            iconAnchor: [13,40]
          }),
          fieldsScore: [ 'QUESTION', 'DISTANCE', 'POINTS', 'TIMER MULTIPLIER', 'TOTAL'],
          itemsScore: [],
          giveup: false,
          paused : false,
          gameWithPause: false
        }
      },
      mounted () {
        let game = this.$store.getters['game/getGame']
        if (game !== null) {
          this.pts = game.pts
          this.token = game.token
          this.city = game.city
          this.score = game.score
          this.difficulty = game.difficulty
          this.imgNumber = game.imgNumber
          this.index = this.imgNumber
          this.timer = game.timer
          this.gameId = game.id
          this.distance = game.distance
          this.itemsScore = game.itemsScore

          if(game.clickedMarker !== null){
            this.clicked = true
            this.clickedMarker= new L.marker(game.clickedMarker, {icon : this.clickIcon})
            this.clickedMarker.addTo(this.$refs.map.mapObject)
          }
          this.marker= new L.marker(game.marker)
          if (game.pts === 0){
            this.gameWithPause = false
          }else{
            this.gameWithPause = true
          }
        }else {
          this.difficulty = this.$store.getters['game/getDifficulty']
          this.city = this.$store.getters['game/getCity']
          axios.post("http://localhost:8080/geoquizzapi/api/games?idSerie=" + this.city.id +
            "&mode=" + this.difficulty
          ).then(response => {
            this.token = response.data.token
            this.gameId = response.data.id
          }).catch(error => {
            console.log(error)
          })
        }
        this.maxIndex = this.city.photos.length
        let position = this.city.mapOptions.split(';')
        this.center = L.latLng(position[0], position[1])
        this.zoom = Number(position[2])
        this.nextImage(this.imgNumber)
        this.$store.dispatch('game/resetGame')
      },
      methods :{
        pause () {
          if(!this.paused){
            this.stopTimer(false)
          } else {
            this.stop = false
            this.count()
          }
          this.paused = !this.paused

          let obj = {itemsScore: this.itemsScore, clickedMarker: null, marker: this.marker.getLatLng(), distance: this.distance, id: this.gameId, pts: this.pts, token: this.token, difficulty: this.difficulty, score: this.score, city: this.city, imgNumber: this.imgNumber, timer: 0}
          if(this.stop){
            obj.timer = this.timer
          }
          if(this.clickedMarker !== null){
            obj.clickedMarker = this.clickedMarker.getLatLng()
          }
          this.$store.dispatch('game/saveGame', obj).then((response => {
            this.$router.push({name: 'Continue'})
          }))
        },
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
            if(this.timer !==0){
              this.timer--
            }
            if (this.timer <= 0 || this.stop) {
              if(!this.stop){
                this.stop = !this.stop
              }
              clearInterval(interval)
              if(!this.paused){
                this.displaySolution()

              }
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

        },
        calculateScore () {
          let ptsBefore = 0
          let distanceValue = ''
          let multiplierValue = '-'
          if(!this.gameWithPause){
            if(this.distance === null){
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
            }
            ptsBefore = this.pts
            this.pts*=this.multiplier

            this.score += this.pts
          }
          if(this.distance === null){
            if(this.giveup){
              distanceValue = 'You gave up !'
            }else {
              distanceValue = 'No marker put !'
            }
          }else{
            multiplierValue = 'x' + this.multiplier
            distanceValue = this.distance +' meters'
          }
          let scoreboard = { 'QUESTION':this.index + 1, 'DISTANCE':distanceValue, 'POINTS':ptsBefore, 'TIMER MULTIPLIER':multiplierValue, 'TOTAL':ptsBefore*this.multiplier}
          this.itemsScore.push(scoreboard)
          this.gameWithPause = false

        },
        resetTimer () {
          this.timer = 30
        },
        resetMap () {
          this.giveup = false
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
          this.$refs.map.mapObject.setZoom(this.zoom)
          this.$refs.map.mapObject.panTo(this.center)

          this.imgNumber++
          this.nextImage(this.imgNumber)
          this.distance = null;
          this.count()

        },
        stopTimer (giveup) {
          if(this.clicked) {
            if(giveup){
              this.$refs.map.mapObject.removeLayer(this.clickedMarker)
              this.clickedMarker = null
            }
          }
          this.giveup = giveup
          this.stop = !this.stop
        },
        saveScore () {
          let playerName = document.getElementById("playerName").value;
          let score = this.score

          let nameRegex = /^([\w-]){1,20}$/
          if(! playerName.match(nameRegex))
          {
            alert("Invalid player name !\n" +
              "Your player name must be 20 character long at most, and only contain letters, numbers, - or _.")
          }
          else
          {
            axios.put("http://localhost:8080/geoquizzapi/api/games/" + this.gameId +
              "?token=" + this.token +
              "&score=" + score +
              "&playerName=" + playerName
            ).then(response => {
              this.hideModal();
              this.$router.push('/')
            })
          }
        },
        hideModal () {
          this.$refs.scoreModal.hide()
        }
      }
    }
</script>

<style>
    /* eslint-disable */
    @import "../../node_modules/leaflet/dist/leaflet.css";

    .leaflet-grab{
        cursor : move;
    }
    .leaflet-container{
        cursor: url('../assets/marker/clicked_marker-icon.png')13 40, pointer;
    }
    .leaflet-popup-content-wrapper, .leaflet-popup-tip{
        opacity : 0.7;
    }
    .leaflet-popup-content{
        font-weight: bolder;
        font-size : 1.5em;
    }
    #game-container{
        background-color : rgba(0,0,0,0.8);
        overflow-y: auto;
        height: calc(100vh - 140px);
    }
    #geo-map{
        height: calc(100vh - 140px);
        width: 51vw;
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

    #photo{
        height: auto;
        padding-bottom : 2.5%;
        width : auto;
        max-height : 45vh;
    }
    .game-content{
        width : 48vw;
        height: calc(100vh - 140px);
    }

    .game-finished{
        height : calc(100vh - 140px);
    }

    .game-finished-container{
        margin: auto;
        width : 50%;
    }
</style>