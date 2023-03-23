const URL = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
const id = new URLSearchParams(window.location.search).get("id");
// const id = 412;
// const id = 566;
// const id = 6168800;



const fetchArtist = async () => {
  try {
    const res = await fetch(URL + id);
    const artist = await res.json();

    const { name, picture_small, picture_xl, nb_album, nb_fan, tracklist } = artist;
    document.getElementById("img-cover").src = picture_xl;
    document.getElementById("artist-name").innerText = name;
    document.getElementById("followers").innerText = nb_fan;
    document.getElementById("liked-songs-artist").innerText = "di " + name;
    document.getElementById("liked-songs-img").src = picture_small;


    fetchTrackList(tracklist)
  }
  catch (err) {
    console.log(err);
  }
};

const fetchTrackList = async (param) => {
  console.log(param);
  const resp = await fetch(param);
  const artistTrackListData = await resp.json();
  const artistTrackList = artistTrackListData.data;
  console.log(artistTrackList);

  const popularSectionContainer = document.getElementById("popular-section-container");

  artistTrackList.forEach((track, index) => {

    const { title, rank, duration, album } = track;
    console.log(album)

    const min = Math.floor(duration / 60);
    const sec = duration - min * 60;
    const finalDuration = min + ':' + str_pad_left(sec, '0', 2);

    const popularSong = document.createElement("div");
    popularSong.innerHTML =
      `<div class="d-flex align-items-center justify-content-between mb-3">
          <div class="flex-grow-1 me-3">
            <span class="me-3 number">${index + 1}</span>
            <a href="album.html?id=${album.id}">
              <img class="me-3" src="${album.cover_small}" alt="">
            </a>
            <span>${title}</span>
          </div>
          <div class="me-5">
            <span class="popular-song-listners">${rank}</span>
          </div>

          <div class="duration me-5">
            <span>${finalDuration}</span>
          </div>
        </div>`
    popularSectionContainer.appendChild(popularSong);
  });

}

function str_pad_left(string, pad, length) {
  return (new Array(length + 1).join(pad) + string).slice(-length);
}




window.onload = fetchArtist;


function play() {
  var audio = document.getElementById("audio");
  audio.play();
}