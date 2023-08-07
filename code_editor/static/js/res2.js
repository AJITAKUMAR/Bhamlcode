burger = document.querySelector('.burger')
navbar = document.querySelector('.navbar')
section = document.querySelector('.section')
rightNav = document.querySelector('.rightNav')


burger.addEventListener('click', ()=>{
          section.classList.toggle('v-class-resp')
          navbar.classList.toggle('h-nav-resp')

})
