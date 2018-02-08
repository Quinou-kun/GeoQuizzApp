<template>
    <div id="home-container">
        <b-container>
            <b-card no-body id="scoreboard">
                <b-tabs pills card>
                    <b-tab :key="game" v-for="game in games" :title="game.ville">
                        <b-tabs pills card>

                            <b-tab title="Easy">
                                <b-table head-variant="light" dark bordered responsive :items="game.scores.easy" :fields="fields"></b-table>
                            </b-tab>

                            <b-tab title="Normal">
                                <b-table head-variant="light" dark bordered responsive :items="game.scores.normal" :fields="fields"></b-table>
                            </b-tab>

                            <b-tab title="Hard">
                                <b-table head-variant="light" dark bordered responsive :items="game.scores.hard" :fields="fields"></b-table>                                
                            </b-tab>

                        </b-tabs>
                    </b-tab>
                </b-tabs>
            </b-card>
        </b-container>
    </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'

export default {
    name: 'Scoreboard',
    data () {
    return {
        msg: 'This is the register page',
        games: [],
        fields: [ 'player', 'score' ],
    }
  },
  created () {
        axios.get("http://localhost:8080/geoquizzapi/api/series").then(response => {
            response.data.series.forEach(serie => {
                let game = {}
                game.ville = serie.ville

                game.scores = {}

                // Scores in easy mode
                game.scores.easy = []
                axios.get("http://localhost:8080/geoquizzapi/api/games", {params: {idSerie: serie.id, mode: "0"}}).then(response => {
                    response.data.games.forEach(g => {
                        let score = {}
                        score.player = g.player
                        score.score = g.score
                        
                        game.scores.easy.push(score)
                    })
                }).catch(error => {
                    console.log(error)
                })


                // Scores in normal mode
                game.scores.normal = []
                axios.get("http://localhost:8080/geoquizzapi/api/games", {params: {idSerie: serie.id, mode: "1"}}).then(response => {
                    response.data.games.forEach(g => {
                        let score = {}
                        score.player = g.player
                        score.score = g.score
                        
                        game.scores.normal.push(score)
                    })
                }).catch(error => {
                    console.log(error)
                })

                // Scores in hard mode
                game.scores.hard = []
                axios.get("http://localhost:8080/geoquizzapi/api/games", {params: {idSerie: serie.id, mode: "2"}}).then(response => {
                    response.data.games.forEach(g => {
                        let score = {}
                        score.player = g.player
                        score.score = g.score
                        
                        game.scores.hard.push(score)
                    })
                }).catch(error => {
                    console.log(error)
                })

                this.games.push(game)
                
            })
        }).catch(error => {
            console.log(error)
        })
    },
    methods: {
  
    }
}
</script>

<style scoped>
    
    #home-container{
        background-color : rgba(0,0,0,0.8);
        height : calc(100vh - 140px);
    }

    #scoreboard{
        background-color : rgba(0,0,0,0.3);
        border-radius : 10px;
        font-size : 1.2em;
    }
</style>

