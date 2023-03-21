/* ADD CLASS ON SCROLL
-------------------------------------------------------------------------------------------------- */
window.addEventListener('scroll', function(e) {
  let heightHeader = document.querySelector('header').offsetHeight;

  console.dir(window.scrollY)
  console.dir(heightHeader)
  
  if(window.scrollY > (heightHeader - 50)){

    document.body.classList.add('scroll-down');
  } else {
    document.body.classList.remove('scroll-down');
  }
});
