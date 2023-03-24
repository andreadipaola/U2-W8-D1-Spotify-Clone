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

// Array contenente i valori degli elementi h2 relativi agli autori della homepage (l'espressione trasforma da NodeList ad Array recuperando solo il valore contenuto nella proprietà textContent)
const singersArray = Array.prototype.map.call(singersNodeList, function(singer) { return singer.textContent; });


// Array contenente i valori del precedente privi di spazi e caratteri non ammessi negli id
const nameSingers = Array.prototype.map.call(singersArray, function(singer) { return singer.toLowerCase().replace(/[^a-zA-Z0-9]/g, ''); });


/**
 * Fn che restituisce il saluto corretto in base all'ora
 * ----------------------------------------------------------------------------
 */
const sayHello = () => {
  const now = new Date();
  const hourNow = now.getHours();
  const goodcardsTitle = document.querySelector('.goodCards h2');

  if(hourNow >= 6 && hourNow < 12){
    goodcardsTitle.innerText = 'Buongiorno';
  } else if(hourNow >= 12 && hourNow < 18){
    goodcardsTitle.textContent = 'Buon pomeriggio';
  } else if(hourNow >= 18 && hourNow < 00){
    goodcardsTitle.textContent = 'Buonasera';
  } else {
    goodcardsTitle.textContent = 'Buonanotte';
  }
}


/**
 * Fn che rimuove i valori duplicati da un array di oggetti
 * ----------------------------------------------------------------------------
 */
const deleteAlbumReplies = (objBody) => {

  // console.log(objBody);
  // dichiaro un array di oggetti già contenente un oggetto utile per il primo confronto
  const arrObj = [{idAlbum: 0, urlAlbum: 0, titleAlbum: 0, idArtist: 0, nameArtist: 0, preview: 0}];

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
      },
      preview: preview,
    } = iterator;

    let tempObj = {
      idAlbum: idAlbum,
      urlAlbum: urlAlbum,
      titleAlbum: titleAlbum,
      idArtist: idArtist,
      nameArtist: nameArtist,
      preview: preview
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

  return arrObj.slice(1,arrObj.length);
}


/**
 * Fn template per coding-music section
 * ----------------------------------------------------------------------------
 */
// const templateCodingMusic = (card) => {
//   let template = `
//     <div class="col">
//       <div class="goodCard">
//         <a href="album.html?id=${card.idAlbum}"><img src="${card.urlAlbum}" class="img-fluid" alt=""></a>
//         <div class="goodCard-body">
//           <a href="album.html?id=${card.idAlbum}">
//             <h3 class="card-title">${card.titleAlbum}</h3>
//           </a>
//           <div class="goodCard-play shadow-lg">
//             <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24"
//               data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw">
//               <path
//                 d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z">
//               </path>
//             </svg>
//           </div>
//         </div>
//       </div>
//     </div>
//   `;
//   return template;
// }

// CREAZIONE GOOD CARD ALTERNATIVA PEREDISPOSTA PER L'USO DEL PLAYER


const playSvg = `
    <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24"
      data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw">
      <path
        d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z">
      </path>
    </svg>`;

  const pauseSvg = `
    <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL">
      <path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z">
      </path>
    </svg>`;

const templateCodingMusicAlt = (card) => {

  const goodCardAudio = document.createElement("audio");
  goodCardAudio.src = card.preview;
  const colElement = document.createElement("div");
  colElement.className = "col";

  const goodCard = document.createElement("div");
  goodCard.className = "goodCard";

  const goodCardImgLink = document.createElement("a");
  goodCardImgLink.href = "album.html?id=" + card.idAlbum;

  const goodCardImg = document.createElement("img");
  goodCardImg.src = card.urlAlbum;
  goodCardImg.className = "img-fluid";

  const goodCardBody = document.createElement("div");
  goodCardBody.className = "goodCard-body";

  const goodCardAlbumLink = document.createElement("a");
  goodCardAlbumLink.href = "album.html?id=" + card.idAlbum;

  const goodCardAlbum = document.createElement("h3");
  goodCardAlbum.className = "card-title";
  goodCardAlbum.innerText = card.titleAlbum;

  const goodCardPlay = document.createElement("div");
  goodCardPlay.className = "goodCard-play shadow-lg play-btn";
  goodCardPlay.innerHTML = playSvg;

  goodCardPlay.onclick = () => {
    if(goodCardAudio.paused) {
      goodCardAudio.play(); 
      goodCardPlay.innerHTML = pauseSvg;
      // goodCardPlay.classList.add("opacityOn");


    } else {
      goodCardAudio.pause();
      goodCardPlay.innerHTML = playSvg;
      // goodCardPlay.classList.add("opacityOn");
    } 
  };

  goodCardImgLink.append(goodCardImg);
  goodCardAlbumLink.append(goodCardAlbum);
  goodCardBody.append(goodCardAlbumLink, goodCardPlay);
  goodCard.append(goodCardImgLink, goodCardBody, goodCardAudio);
  colElement.append(goodCard);

  return colElement;
}



/**
 * Fn template per artist section
 * ----------------------------------------------------------------------------
 */
// const templateSinger = (card) => {
//   let template = `
//     <div class="card p-3">
//       <a href="album.html?id=${card.idAlbum}"><img src="${card.urlAlbum}" class="card-img-top img-fluid mb-3" alt=""></a>
//       <div class="card-body p-0">
//         <a href="album.html?id=${card.idAlbum}"><h3 class="card-title">${card.titleAlbum}</h3></a>
//         <a href="artist.html?id=${card.idArtist}"><p class="card-text m-0">${card.nameArtist}</p></a>
//       </div>
//     </div>
//   `;
//   return template;
// }


// CREAZIONE CARD ALTERNATIVA PEREDISPOSTA PER L'USO DEL PLAYER
const templateSingerAlt = (card) => {

const cardAudio = document.createElement("audio");
cardAudio.src = card.preview;

const cardElement = document.createElement("div");
cardElement.className = "card p-3";

const cardImgContainer = document.createElement("div");
cardImgContainer.className = "position-relative mb-3";

const cardImgLink = document.createElement("a");
cardImgLink.href = "album.html?id=" + card.idAlbum;

const cardImg = document.createElement("img");
cardImg.src = card.urlAlbum;
cardImg.className = "card-img-top img-fluid";

const cardPlay = document.createElement("div");
cardPlay.className = "position-absolute bottom-0 end-0 goodCard-play play-btn shadow-lg me-1 mb-1";
cardPlay.innerHTML = playSvg;

cardPlay.onclick = () => cardAudio.paused ? cardAudio.play() : cardAudio.pause();

cardPlay.onclick = () => {
  if(cardAudio.paused) {
    cardAudio.play(); 
    cardPlay.innerHTML = pauseSvg;
  } else {
    cardAudio.pause();
    cardPlay.innerHTML = playSvg;
    cardPlay.className("opacityOn");
  } 
};


const cardBody = document.createElement("div");
cardBody.className = "card-body p-0";

const cardAlbumLink = document.createElement("a");
cardAlbumLink.href = "album.html?id=" + card.idAlbum;

const cardAlbum = document.createElement("h3");
cardAlbum.className = "card-title";
cardAlbum.innerText = card.titleAlbum;

const cardArtistLink = document.createElement("a");
cardArtistLink.href = "artist.html?id=" + card.idArtist;

const cardArtist = document.createElement("p");
cardArtist.className = "card-text m-0";
cardArtist.innerText = card.nameArtist;

cardImgLink.append(cardImg);
cardImgContainer.append(cardImgLink, cardPlay);
cardAlbumLink.append(cardAlbum);
cardArtistLink.append(cardArtist);
cardBody.append(cardAlbumLink,cardArtistLink);
cardElement.append(cardImgContainer, cardBody, cardAudio);

return cardElement;
}

/**
 * Fn per creare le singole card
 * ----------------------------------------------------------------------------
 */
const createAlbum = async (elementi, singer) => {

  if (elementi) {
    // elementi sono gli album per ogni gruppo
    // console.log(elementi);
    // seinger sono le stringhe che riportano il nome del gruppo
    // console.log(singer);

    // seleziono la section con id specifico del cantante di cui andrò ad inserire gli album
    const albums = document.querySelector(`#${singer} div`);
    // console.log(albums)

    albums.innerHTML = '';

    elementi.forEach((card, index) => {
// card è il singolo album
      // console.log(card);
        
      const column = document.createElement('div');

      column.classList.add('col');

      if(index > 3 && index <= 5) { 
        column.classList.add('d-none', 'd-xl-block')
      } else if(index > 5) { 
        column.classList.add('d-none', 'd-xxl-block');
      }

      // column.innerHTML = (singer === 'coding-music') ? templateCodingMusic(card) : templateSinger(card);
      column.append((singer === 'coding-music') ? templateCodingMusicAlt(card) : templateSingerAlt(card)); 

      albums.appendChild(column);
    });
  };
}


/**
 * Fn che recupera ID dell'artista
 * ----------------------------------------------------------------------------
 */
const fetchData = async (name) => {

  const nameClear = name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');

  try {        
    const resp = await fetch(`${api}search?q=${nameClear}`);

    // gestione degli errori
    if (resp.status === 400) throw new Error("Errore nella richiesta (Status: 400)")
    if (resp.status === 404) throw new Error("Non abbiamo trovato la risorsa (Status: 404)")
    if (!resp.ok) throw new Error("Errore nella fetch")

    const body = await resp.json();
    const objBody = await body.data;
    // console.log(objBody);
    const albumUnique = deleteAlbumReplies(objBody);

    const arrayReduce = (name === 'coding-music') ? albumUnique.slice(0, 4) : albumUnique.slice(0, 8);
    console.log(arrayReduce);


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

  sayHello();

  fetchData('coding-music');

  for (const singer of nameSingers) {
    fetchData(singer);
  }
}


// CODICE SUPERATO -------------------------------------------------------------------------

// /**
//  * Fn che recupera ID dell'artista
//  * ----------------------------------------------------------------------------
//  */
// const fetchData = async (name) => {

//   try {        
//     const resp = await fetch(`${api}search?q=${name}`);

//     // gestione degli errori
//     if (resp.status === 400) throw new Error("Errore nella richiesta (Status: 400)")
//     if (resp.status === 404) throw new Error("Non abbiamo trovato la risorsa (Status: 404)")
//     if (!resp.ok) throw new Error("Errore nella fetch")

//     const body = await resp.json();
//     const objBody = await body.data;
//     const albumUnique = deleteAlbumReplies(objBody);
//     const arrayReduce = albumUnique.slice(1, 7);

//     createAlbum1(arrayReduce, name);

//   } catch (error) {
//     console.log(error);
//   }
// }

// /**
//  * Fn per creare le singole card
//  * ----------------------------------------------------------------------------
//  */
// const createAlbum = async (elementi, singer) => {

//   if (elementi) {

//     // seleziono la section con id specifico del cantante di cui andrò ad inserire gli album
//     const albums = document.querySelector(`#${singer} div`);

//     albums.innerHTML = '';

//     // for (const card of elementi) {
//       elementi.forEach((card, index) => {
        
//       // });
//       const column = document.createElement('div');
//       column.className = 'col';
      
//       // console.log(card);

//       column.innerHTML = `
//         <div class="card p-3">
//           <a href="album.html?id=${card.idAlbum}"><img src="${card.urlAlbum}" class="card-img-top img-fluid mb-3" alt=""></a>
//           <div class="card-body p-0">
//             <a href="album.html?id=${card.idAlbum}"><h3 class="card-title">${card.titleAlbum}</h3></a>
//             <a href="artist.html?id=${card.idArtist}"><p class="card-text m-0">${card.nameArtist}</p></a>
//           </div>
//         </div>
//       `;

//       albums.appendChild(column);
//     });
//   };
// }
