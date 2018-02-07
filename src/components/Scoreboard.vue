<template>
    <div id="home-container">
        <b-container>
            <b-card no-body id="scoreboard">
                <b-tabs pills card>
                    <b-tab v-for="game in this.games" :title="game.ville">
                        <b-table head-variant="light" dark bordered responsive :items="game.scores" :fields="fields"></b-table>
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

                game.scores = []

                axios.get("http://localhost:8080/geoquizzapi/api/games", {params: {idSerie: serie.id}}).then(response => {
                    response.data.games.forEach(g => {
                        let score = {}
                        score.player = g.player
                        score.score = g.score
                        
                        game.scores.push(score)
                    })
                }).catch(error => {
                    console.log(error)
                })

                this.games.push(game)
                
                //console.log(serie)
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

