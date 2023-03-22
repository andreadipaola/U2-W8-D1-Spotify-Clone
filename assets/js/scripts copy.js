/* ADD CLASS ON SCROLL
-------------------------------------------------------------------------------------------------- */
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


/**
 * Array contenente gli id da ciclare nella homepage
 */
// const idAlbums = [418774237, 12047964, 75621062, 96126, 11591216, 9410086];
// const idAlbum = 9410086;

// qui andrò ad iniettare le mie card
const albums = document.querySelector('#albums');
// console.log(albums)

// Array che contiene i nomi degli artisti da cercare e iniettare nella homepage
const queryNameSingers = document.querySelectorAll('.nameSinger h2');
const nameSingers = [];
for (const iterator of queryNameSingers) {
  nameSingers.push(iterator.textContent.toLowerCase().replaceAll(' ', ''));
}
console.log(nameSingers);




/**
 * Fn per creare le singole card
 * ----------------------------------------------------------------------------
 */
const createAlbum = async (elementi) => {

  if (elementi) {

    albums.innerHTML = '';

    console.log(elementi)
    
    for (const card of elementi) {
      
      console.log(card)
      const column = document.createElement('div');
      column.className = 'col';

      column.innerHTML = `
        <div class="card p-3">
          <img src="${card.album.cover_medium}" class="card-img-top img-fluid mb-3" alt="">
          <div class="card-body p-0">
            <h3 class="card-title">${card.title}</h3>
            <p class="card-text m-0">${card.artist.name}</p>
          </div>
        </div>
      `;

      albums.appendChild(column);
    }
  }
}


/**
 * Fn che recupera i dati via API
 * ----------------------------------------------------------------------------
 */
const fetchData = async (types) => {
  // const body = [];

  try {
    // for (const type of types) {
        
      const resp = await fetch(apiSearch + types);

      // gestione degli errori
      if (resp.status === 400) throw new Error("Errore nella richiesta (Status: 400)")
      if (resp.status === 404) throw new Error("Non abbiamo trovato la risorsa (Status: 404)")
      if (!resp.ok) throw new Error("Errore nella fetch")

      const body = await resp.json();
      console.log(body.data)
    // }
    createAlbum(body.data);
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

  // fetchData(idAlbums);

}