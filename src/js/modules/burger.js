const burger = document.querySelector('.header__burger')
const menu = document.querySelector('.menu')
burger.addEventListener('click', () => {
	if (menu.classList.contains('active')) {
		document.body.classList.remove('active')
		menu.classList.remove('active')
		burger.classList.remove('active')
	} else {
		document.body.classList.add('active')
		menu.classList.add('active')
		burger.classList.add('active')
	}
})