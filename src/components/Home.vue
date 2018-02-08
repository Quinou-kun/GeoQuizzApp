<template>
        <div id="home-container">
            <div id="play-container">
                <b-card bg-variant="dark"
                        header="<h2>Do you want to play ?</h2>"
                        text-variant="white"
                        class="home-content text-center">
                    <b-button to="/new" variant="danger">Play now !</b-button>
                </b-card>
            </div>
            <div id="home-description">
                <b-card bg-variant="dark"
                        header="<h2>What is GeoQuizz ?</h2>"
                        text-variant="white"
                        class="home-content text-center">
                    <p>GeoQuizz is a fun game where you have to guess where is the place shown on an image without being wrong, and faster than the others ! <br><br>
                        The closer you are to the answer, the more points you have!
                        Watch out for the time, it will allow you to multiply your score if you are fast enough ! So let's play and have fun :)</p>
                </b-card>
            </div>
        </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'This is the home page'
    }
  }
}
</script>

<style>
    #home-container{
        text-align : center;
        color : white;
        background-color : rgba(0,0,0,0.8);
        height : calc(100% - 140px)
    }
    #home-description, #play-container{
        background-color : rgba(0,0,0,0.3);
        display : inline-block;
        width : 40%;
        padding : 2.5%;
        margin : 2.5%;
        border-radius : 10px;
        font-size : 1.2em;
    }
    .home-content{
        background-color : rgba(0,0,0,0.1);
    }
</style>
