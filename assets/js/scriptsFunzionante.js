/**
 * README
 * ----------------------------------------------------------------------------
 * 
 */





/**
 * ADD CLASS ON SCROLL
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
 * Array contenente gli id da ciclare nella homepage
 */
// const idAlbums = [418774237, 12047964, 75621062, 96126, 11591216, 9410086];
// const idAlbum = 9410086;

// // qui andrò ad iniettare le mie card
// const albums = document.querySelector('#albums');
// console.log(albums)

// Array che contiene i nomi degli artisti da cercare e iniettare nella homepage
// const queryNameSingers = document.querySelectorAll('.nameSinger h2');
// const nameSingers = [];
// for (const iterator of queryNameSingers) {
//   nameSingers.push(iterator.textContent.toLowerCase().replaceAll(' ', ''));
// }
// console.log(nameSingers);

let nameSinger = 'queen';


/**
 * Fn per creare le singole card
 * ----------------------------------------------------------------------------
 */
const createAlbum = async (elementi, type) => {

  if (elementi) {

    // qui andrò ad iniettare le mie card
    const albums = document.querySelector(`#${type} div`);

    console.log(`#${type}`)

    albums.innerHTML = '';

    console.log(elementi)
    
    for (const card of elementi) {
      
      console.log(card)
      const column = document.createElement('div');
      column.className = 'col';

      column.innerHTML = `
        <div class="card p-3">
          <a href="album.html?id=${card.album.id}"><img src="${card.album.cover_medium}" class="card-img-top img-fluid mb-3" alt=""></a>
          <div class="card-body p-0">
            <a href="album.html?id=${card.album.id}"><h3 class="card-title">${card.album.title}</h3></a>
            <a href="artist.html?id=${card.artist.id}"><p class="card-text m-0">${card.artist.name}</p></a>
          </div>
        </div>
      `;

      albums.appendChild(column);
    }
  }
}

// <a href=""./artist.html/id

/**
 * Fn che recupera ID dell'artista
 * ----------------------------------------------------------------------------
 */
let idSinger = 0;
const fetchData = async (name, type) => {

  try {
        
    const resp = await fetch(`${api}search?q=${name}`);
    let arrObj = [];

    // gestione degli errori
    if (resp.status === 400) throw new Error("Errore nella richiesta (Status: 400)")
    if (resp.status === 404) throw new Error("Non abbiamo trovato la risorsa (Status: 404)")
    if (!resp.ok) throw new Error("Errore nella fetch")

    const body = await resp.json();
    const objBody = await body.data;
    console.log(body)
    console.log(objBody)

    // for (const iterator of objBody) {
    //   arrObj.push(iterator.album);
    // }
    // console.log(arrObj)
    // let uniqueArr = test(arrObj);
    // console.log(arrayUnique(arrObj));
    let uniqueArr = objBody.slice(0, 6);
    console.log(uniqueArr)
    
    createAlbum(uniqueArr, type);
  } catch (error) {
    console.log(error);
  }

}

// prendo un obj con id aventi lo stesso valore, ne restituisco uno conmposto solo da id con valori diversi e poi lo riduco a soli 6 elementi
// const serializeArr = arr => {
//   return arr.map(obj => { return JSON.stringify(obj); });
// };

// const arrayUnique = arr => {
//     let objects = serializeArr(arr);
//     let unique = [...new Set(objects)];
//     let uniqueMap = unique.map(str => { return JSON.parse(str); } );
//     let arrReduce = uniqueMap.slice(0, 6);
//     console.log(arrReduce)
//     return arrReduce;
//     // return unique.map(str => { return JSON.parse(str); } );
// };

// const test = (arrObj) => {
//   // console.log('Initial array:');
//   // console.log(arrObj);
//   // console.log('Unique array:');
//   // console.log(arrayUnique(arrObj));
// };

// const titleBtn = document.querySelector('')
const goToEdit = () => {
  window.location.assign("artist.html?id=" + id);
};
// editBtn.onclick = goToEdit;

/**
 * window.onload()
 * ----------------------------------------------------------------------------
 */
window.onload = () => {

  // for (const singer of nameSingers) {

    fetchData('Queen', 'queen');
    fetchData('AC/DC', 'acdc');
    fetchData('Foo Fighters', 'foofighters');

    
  // }

  // fetchData(idAlbums);

}