const toggleBtn = document.querySelector('.navbar__toogleBtn');
const menu = document.querySelector('.navbar__menu');
const icons = document.querySelector('.navbar__icons');

// querySelector, addEventListener : API
// ('click', ()=>{}) : when you click toggleBtn, call the func(={})
toggleBtn.addEventListener('click', ()=>{
    // Toggle active class among class list of menu and icons
    menu.classList.toggle('active');
    icons.classList.toggle('active');
    // when you click toggleBtn, if active class isn't among class of menu and icons, add it. If not, subtract it
})