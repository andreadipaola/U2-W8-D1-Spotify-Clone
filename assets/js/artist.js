const URL = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
// const id = new URLSearchParams(window.location.search).get("id");
const id = 412;
// const id = 566;
// const id = 566;



const fetchArtist = async () => {
  try {
    const res = await fetch(URL + id);
    const artist = await res.json();

    const { name, picture_xl, nb_album, nb_fan, tracklist } = artist;
    document.getElementById("img-cover").src = picture_xl;
    document.getElementById("artist-name").innerText = name;
    document.getElementById("followers").innerText = nb_fan;

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

    // console.log(track);
    // console.log(track.title);
    // console.log(track.rank);
    // console.log(track.duration);

    const { title, rank, duration } = track;

    const popularSong = document.createElement("div");
    popularSong.innerHTML = `<div class="d-flex align-items-center justify-content-between mb-3">
        <div class="me-3">
          <span class="me-3 number">${index + 1}</span>
          <img class="me-3" src="assets/img/search/image-53.jpeg" alt="">
          <span>${title}</span>
        </div>
        <div class="me-3">
          <span class="popular-song-listners">${rank}</span>
        </div>
        <div class="duration me-5">
          <span>${duration}</span>
        </div>
      </div>`
    popularSectionContainer.appendChild(popularSong);
  });

}





window.onload = fetchArtist;