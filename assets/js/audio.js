
const URL = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
// const id = new URLSearchParams(window.location.search).get("id");
const param = "eminem";

const fetchAlbum = async () => {
    try {
        const res = await fetch(URL + param);
        const album = await res.json();

        const { title, cover_medium, nb_tracks, duration, artist, tracks } = album;




    }
    catch (err) {
        console.log(err);
    }
};


const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/387");



const playButtons = document.querySelectorAll(".play-btn");

playButtons.forEach(playBtn => {
    playBtn.addEventListener("click", () => {
        audio.play();
    });
});


const rangeInputs = document.querySelectorAll('input[type="range"]')
const numberInput = document.querySelector('input[type="number"]')

function handleInputChange(e) {
    let target = e.target
    if (e.target.type !== 'range') {
        target = document.getElementById('range')
    }
    const min = target.min
    const max = target.max
    const val = target.value

    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
}

rangeInputs.forEach(input => {
    input.addEventListener('input', handleInputChange)
})

numberInput.addEventListener('input', handleInputChange)
