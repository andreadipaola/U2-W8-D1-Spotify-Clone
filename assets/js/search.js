/**
 * Add class on scroll
 * ----------------------------------------------------------------------------
 */
window.addEventListener('scroll', function (e) {
  let heightHeader = document.querySelector('header').offsetHeight;

  if (window.scrollY > (heightHeader - 50)) {

    document.body.classList.add('scroll-down');
  } else {
    document.body.classList.remove('scroll-down');
  }
});


/**
 * API
 * ----------------------------------------------------------------------------
 */
const apiAlbum = 'https://striveschool-api.herokuapp.com/api/deezer/album/';
const apiSearch = 'https://striveschool-api.herokuapp.com/api/deezer/search?q=';
const api = 'https://striveschool-api.herokuapp.com/api/deezer/';


/**
 * SEARCH
 * ----------------------------------------------------------------------------
 */


/**
 * Fn che rimuove i valori duplicati da un array di oggetti
 * ----------------------------------------------------------------------------
 */
const deleteAlbumReplies = (objBody) => {

  // dichiaro un array di oggetti già contenente un oggetto utile per il primo confronto
  const arrObj = [{idAlbum: 0, urlAlbum: 0, titleAlbum: 0, idArtist: 0, nameArtist: 0, pictureArtist: 0, titleSong: 0}];

  for (const iterator of objBody) {

    // 
    const {
      album: {
        id: idAlbum,
        cover_medium: urlAlbum,
        title: titleAlbum,
      },
      artist: {
        id: idArtist,
        name: nameArtist,
        picture_big: pictureArtist,
      },
      title: titleSong,
    } = iterator;

    let tempObj = {
      idAlbum: idAlbum,
      urlAlbum: urlAlbum,
      titleAlbum: titleAlbum,
      idArtist: idArtist,
      nameArtist: nameArtist,
      pictureArtist: pictureArtist,
      titleSong: titleSong
    };

    let idCheck = false;
    
    // compara gli idAlbum e se trova una corrispondenza esce dal ciclo for
    for (const arr of arrObj) {
      if((arr.idAlbum === tempObj.idAlbum)){
        idCheck = true;
        break;
      }
    }

    // se non ha trovato corrispondenze nel ciclo forOf sopra pusha tempObj all'interno di arrObj
    if(!idCheck) {arrObj.push(tempObj)};
  }

  return arrObj.slice(1, arrObj.length);;
}


/**
 * Fn template per search section
 * ----------------------------------------------------------------------------
 */
const templateSearchResults = (card) => {
  let template = `
    <div class="card p-3">
      <a href="album.html?id=${card.idAlbum}"><img src="${card.urlAlbum}" class="card-img-top img-fluid mb-3" alt=""></a>
      <div class="card-body p-0">
        <a href="album.html?id=${card.idAlbum}"><h3 class="card-title">${card.titleAlbum}</h3></a>
        <a href="artist.html?id=${card.idArtist}"><p class="card-text m-0">${card.nameArtist}</p></a>
      </div>
    </div>
  `;
  return template;
}


/**
 * Fn per creare le singole card conseguenti alla ricerca
 * ----------------------------------------------------------------------------
 */
const createAlbumSearch = async (elementi, singer) => {

  if (elementi) {
    
    // seleziono la section con id specifico del cantante di cui andrò ad inserire gli album
    const albums = document.querySelector(`#searchResult div`);
    const sectionTitle = document.querySelector(`#searchResult h2`);
    
    sectionTitle.textContent = singer.toLowerCase();
    
    albums.innerHTML = '';
    
    elementi.forEach((card, index) => {
      const column = document.createElement('div');

      column.classList.add('col');

      if(index > 3 && index <= 5) { 
        column.classList.add('d-none', 'd-xl-block')
      } else if(index > 5) { 
        column.classList.add('d-none', 'd-xxl-block');
      }

      column.innerHTML = templateSearchResults(card);

      albums.appendChild(column);
    });
  };
}


/**
 * Fn che recupera ID dell'artista
 * ----------------------------------------------------------------------------
 */
const fetchDataSearch = async (name) => {
  const nameClear = name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');

  try {        
    const resp = await fetch(`${api}search?q=${nameClear}`);

    // gestione degli errori
    if (resp.status === 400) throw new Error("Errore nella richiesta (Status: 400)")
    if (resp.status === 404) throw new Error("Non abbiamo trovato la risorsa (Status: 404)")
    if (!resp.ok) throw new Error("Errore nella fetch")

    const body = await resp.json();
    const objBody = await body.data;
    const albumUnique = deleteAlbumReplies(objBody);
    // const arrayReduce = albumUnique.slice(1, albumUnique.length);
    
    createAlbumSearch(albumUnique, name);

    fetchDataTracklist(name, objBody[0].artist.tracklist);

  } catch (error) {
    console.log(error);
  }
}


/**
 * Fn template per popular song
 * ----------------------------------------------------------------------------
 */
const templatePopularSong = (card) => {
  const min = Math.floor(card.duration / 60);
  const sec = card.duration - min * 60;
  const finalDuration = min + ':' + str_pad_left(sec, '0', 2);

  let template = `
    <a href="#">
      <img class="img-fluid" src="${card.album.cover_small}" alt="">
    </a>
    <div class="flex-grow-1 ms-3">
      <p>${card.title}</p>
      <p class="mb-0">${card.artist.name}</p>
    </div>
    <div class="ms-3">
      <p class="mb-0">${finalDuration}</p>
    </div>
  `;
  return template;
}

// Fn 
const str_pad_left = (string, pad, length) => {
  return (new Array(length + 1).join(pad) + string).slice(-length);
}


/**
 * Fn per creare le singole card conseguenti alla ricerca
 * ----------------------------------------------------------------------------
 */
const createPopularSong = async (elementi, singer) => {

  if (elementi) {
    
    // seleziono la section con id specifico del cantante di cui andrò ad inserire gli album
    const albumsLeft = document.querySelector(`#popularSong .col-left`);
    const albumsRight = document.querySelector(`#popularSong .col-right`);
    const albumsTitle = document.querySelector(`#popularSong > h2`);

    albumsTitle.textContent = 'Brani Popolari';

    albumsLeft.innerHTML = `
      <div class="card p-4">
        <img src="${elementi[0].contributors[0].picture_big}" alt="">
        <h3>${elementi[0].artist.name}</h3>
        <p>Artista</p>
      </div>
    `;

    albumsRight.innerHTML = '';

    elementi.forEach((card, index) => {
      const column = document.createElement('div');

      column.classList.add('d-flex', 'align-items-center', 'p-2');

      column.innerHTML = templatePopularSong(card);

      albumsRight.appendChild(column);
    });
  };
}


/**
 * Fn che esegue fetch tracklist
 * ----------------------------------------------------------------------------
 */
const fetchDataTracklist = async (name, api) => {

  try {        
    const resp = await fetch(`${api}`);

    // gestione degli errori
    if (resp.status === 400) throw new Error("Errore nella richiesta (Status: 400)")
    if (resp.status === 404) throw new Error("Non abbiamo trovato la risorsa (Status: 404)")
    if (!resp.ok) throw new Error("Errore nella fetch")

    const body = await resp.json();
    const objBody = await body.data;
    
    createPopularSong(objBody, name);

  } catch (error) {
    console.log(error);
  }
}


/**
 * Fn per eseguire la ricerca di album/cantante/playlist
 * ----------------------------------------------------------------------------
 */
const formSearch = document.querySelector('#formSearch');

formSearch.onsubmit = (event) => {
  event.preventDefault();

  let staticResults = document.querySelector('#staticResults');
  staticResults.innerHTML = '';

  let inputValue = formSearch.querySelector('input').value;

  fetchDataSearch(inputValue);
  formSearch.reset();
}


/**
 * window.onload()
 * ----------------------------------------------------------------------------
 */
window.onload = () => {



}