<template>
    <div>
        <b-container>
            <b-card no-body id="scoreboard">
                <b-tabs card>
                    <b-tab v-for="game in this.games" :title="game.ville">
                        <b-table bordered responsive :items="game.scores" :fields="fields"></b-table>
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
    #scoreboard {
        margin-top: 10px;
    }
</style>

