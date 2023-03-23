const URL =  "https://striveschool-api.herokuapp.com/api/deezer/album/";
// const id = new URLSearchParams(window.location.search).get("id");
// console.log(id);
const id ="130472112";
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
    //   const seconds = time - minutes * 60;
   
      const finalTime = hours + ' ore ' + minutes + " minuti";
      console.log(time);
      console.log(finalTime);
   
  
      document.getElementById("album-cover").src = cover_medium;
      document.getElementById("foto-gruppo").src = artist.picture_small;

      document.getElementById("album-title").innerText = title;
      document.getElementById("autore").innerText = artist.name;
      document.getElementById("n-brani").innerText = nb_tracks + " brani";
      document.getElementById("durata").innerText = finalTime;




      const tracksContainer = document.getElementById("tracks-container");
      const newTracks = tracks.data;
      console.log(newTracks);
      newTracks.forEach((track, index) => {

        const trackTitle = track.title;
        console.log(trackTitle);
        const trackRank = track.rank;
        console.log(trackRank);
        const trackDuration = track.duration;
        console.log(trackDuration);
        const trackArtist = track.artist.name;
        console.log(trackArtist);

        const min = Math.floor(trackDuration / 60);
        const sec = trackDuration - min * 60;
        const finalDuration = min + ':' + str_pad_left(sec, '0', 2);

      const canzone = document.createElement('div');
      canzone.classList.add("mb-3");
      canzone.innerHTML= `<div class="canzone row align-items-center flex-nowrap mx-0">
      <div class="col-1">
          <div class="n">${index + 1}</div>
      </div>
      <div class="col">
          <div class="row flex-column">
              <div class="col song-title text-nowrap">${trackTitle}</div>
              <div class="col autore">${trackArtist}</div>
          </div>
      </div>
      <div class="col text-end d-none d-md-block">${trackRank}</div>
      <div class="col text-end d-md-none"><i class="bi bi-three-dots-vertical"></i></div>
      <div class="col text-end d-none d-md-block">${finalDuration}</div>
  </div>`
  tracksContainer.appendChild(canzone);
});

  
    //   fetchTrackList(tracklist)
    }
    catch (err) {
      console.log(err);
    }
  };

  window.onload = fetchAlbum;

  function str_pad_left(string, pad, length) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
  }