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
 * HOMEPAGE
 * ----------------------------------------------------------------------------
 */

// NodeList contenente gli elementi h2 relativi agli autori della homepage
const singersNodeList = document.querySelectorAll('.nameSinger h2');

// Array contenente i valori degli elementi h2 relativi agli autori della homepage (l'espressione trasforma na NodeList ad Array recuperando solo il valore contenuto nella proprietà textContent)
const singersArray = Array.prototype.map.call(singersNodeList, function(singer) { return singer.textContent; });

// Array contenente i valori del precedente privi di spazi e caratteri non ammessi negli id
const nameSingers = Array.prototype.map.call(singersArray, function(singer) { return singer.toLowerCase().replace(/[^a-zA-Z0-9]/g, ''); });


/**
 * Fn per creare le singole card
 * ----------------------------------------------------------------------------
 */
const createAlbum = async (elementi, singer) => {

  if (elementi) {

    // seleziono la section con id specifico del cantante di cui andrò ad inserire gli album
    const albums = document.querySelector(`#${singer} div`);

    albums.innerHTML = '';

    for (const card of elementi) {
      const column = document.createElement('div');
      column.className = 'col';
      
      console.log(card);

      column.innerHTML = `
        <div class="card p-3">
          <a href="album.html?id=${card.idAlbum}"><img src="${card.urlAlbum}" class="card-img-top img-fluid mb-3" alt=""></a>
          <div class="card-body p-0">
            <a href="album.html?id=${card.idAlbum}"><h3 class="card-title">${card.titleAlbum}</h3></a>
            <a href="artist.html?id=${card.idArtist}"><p class="card-text m-0">${card.nameArtist}</p></a>
          </div>
        </div>
      `;

      albums.appendChild(column);
    }
  }
}


/**
 * Fn che rimuove i valori duplicati da un array di oggetti
 * ----------------------------------------------------------------------------
 */
const deleteAlbumReplies = (objBody) => {

  // dichiaro un array di oggetti già contenente un oggetto utile per il primo confronto
  const arrObj = [{idAlbum: 0, urlAlbum: 0, titleAlbum: 0, idArtist: 0, nameArtist: 0}];

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
      }
    } = iterator;

    let tempObj = {
      idAlbum: idAlbum,
      urlAlbum: urlAlbum,
      titleAlbum: titleAlbum,
      idArtist: idArtist,
      nameArtist: nameArtist
    };

    let idCheck = false;
    
    // compara gli idAlbum e se trova una corrispondenza esce dal ciclo for
    for (const arr of arrObj) {
      if((arr.idAlbum === tempObj.idAlbum)){
        idCheck = true;
        break;
      }
    }

    // se non ha trovato corrispondenze nel ciclo for sopra pusha tempObj all'interno di arrObj
    if(!idCheck) {arrObj.push(tempObj)};
  }

  return arrObj;
}


/**
 * Fn che recupera ID dell'artista
 * ----------------------------------------------------------------------------
 */
const fetchData = async (name) => {

  try {        
    const resp = await fetch(`${api}search?q=${name}`);

    // gestione degli errori
    if (resp.status === 400) throw new Error("Errore nella richiesta (Status: 400)")
    if (resp.status === 404) throw new Error("Non abbiamo trovato la risorsa (Status: 404)")
    if (!resp.ok) throw new Error("Errore nella fetch")

    const body = await resp.json();
    const objBody = await body.data;
    const albumUnique = deleteAlbumReplies(objBody);
    const arrayReduce = albumUnique.slice(1, 7);

    createAlbum(arrayReduce, name);

  } catch (error) {
    console.log(error);
  }
}


/**
 * window.onload()
 * ----------------------------------------------------------------------------
 */
window.onload = () => {

  for (const singer of nameSingers) {
    fetchData(singer);
  }
}