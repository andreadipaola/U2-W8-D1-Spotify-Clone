const URL =  "https://striveschool-api.herokuapp.com/api/deezer/album/";
const id = new URLSearchParams(window.location.search).get("id");
// console.log(id);
//const id ="130472112";
// const id ="130472112";

const fetchAlbum = async () => {
  try {
    const res = await fetch(URL + id);
    const album = await res.json();

    const { title, cover_medium, nb_tracks, duration, artist, tracks } = album;
    let time = duration;
    const hours = Math.floor(time / 3600);
    time = time - hours * 3600;
    const minutes = Math.floor(time / 60);
  
    const finalTime = hours + ' ore ' + minutes + " minuti";
  
    document.getElementById("album-cover").src = cover_medium;
    document.getElementById("foto-gruppo").src = artist.picture_small;
    document.getElementById("link-artist").href = `./artist.html?id=${artist.id}`;
    document.getElementById("album-title").innerText = title;
    document.getElementById("autore").innerText = artist.name;
    document.getElementById("n-brani").innerText = nb_tracks + " brani";
    document.getElementById("durata").innerText = finalTime;

    const tracksContainer = document.getElementById("tracks-container");
    const newTracks = tracks.data;
    console.log(newTracks);

    newTracks.forEach((track, index) => {
      const trackTitle = track.title;
      const trackRank = track.rank;
      const trackDuration = track.duration;
      const trackArtist = track.artist.name;

      const min = Math.floor(trackDuration / 60);
      const sec = trackDuration - min * 60;
      const finalDuration = min + ':' + str_pad_left(sec, '0', 2);

      const canzone = document.createElement('div');
      canzone.classList.add("mb-3");
      canzone.innerHTML= `
        <div class="canzone d-flex align-items-center flex-nowrap mx-0">
          <div class="px-4">
              <div class="n">${index + 1}</div>
          </div>
          <div class=" text-nowrap flex-grow-1">
              <p class="mb-1">${trackTitle}</p>
              <a href="./artist.html?id=${artist.id}"><p class="mb-0">${trackArtist}</p></a>
          </div>
          <div class=" px-4 text-end d-none d-md-block">${trackRank}</div>
          <div class=" px-4 text-end d-md-none"><i class="bi bi-three-dots-vertical"></i></div>
          <div class=" px-4 text-end d-none d-md-block">${finalDuration}</div>
        </div>`
      tracksContainer.appendChild(canzone);
    });


    }
    catch (err) {
      console.log(err);
    }
  };

  window.onload = fetchAlbum;

  function str_pad_left(string, pad, length) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
  }