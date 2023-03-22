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
const api = 'https://striveschool-api.herokuapp.com/api/deezer/';


/**
 * HOMEPAGE
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
      
      // console.log(card);

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


/**
 * Fn che rimuove i valori duplicati da un array di oggetti
 * ----------------------------------------------------------------------------
 */

// converto gli oggetti dell'array in stringhe json
const serializeArr = arr => {
  return arr.map(obj => { return JSON.stringify(obj); });
};

// 
const arrayUnique = arr => {
  
  // ricevo array di oggetti in stringhe
  let objects = serializeArr(arr);
  console.log(objects)

  // array di stringhe privo dei duplicati
  let unique = [...new Set(objects)];
  console.log(unique)

  // ritorno l'array di stringhe in array di oggetti
  return unique.map(str => { return JSON.parse(str); } );
};



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
    // console.log(body);
    // console.log(objBody);
    
    let uniqueArr = objBody.slice(0, 6);

    createAlbum(uniqueArr, name);

    // let objBodyUnique = arrayUnique(objBody);
    // console.log(objBodyUnique);

    // for (const iterator of objBody) {
    //   arrObj.push(iterator.album);
    // }
    // console.log(arrObj)
    // let uniqueArr = test(arrObj);
    // console.log(arrayUnique(arrObj));
    // let uniqueArr = objBody.slice(0, 6);
    // console.log(uniqueArr)
    
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

