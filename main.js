import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';


let tooltips = document.querySelectorAll("[data-tooltip]")


tooltips.forEach(el => {
	let attributeValue = el.getAttribute("data-tooltip")

	tippy(el, {
		content: attributeValue,
		delay: [240, 0],
		placement: document.querySelector(".left-sidebar").classList.contains("hide") ? "right" : "top",
		arrow: false,
	});
})


let homeLink = document.querySelector("#home-link")
let searchLink = document.querySelector("#search-link")


homeLink.onclick = (e) => {
	e.preventDefault()

	if (location.pathname !== "/") {
		homeLink.parentElement.classList.add("active")
		searchLink.parentElement.classList.remove("active")
		history.pushState(null, null, "/")
		console.log(location.pathname);
	}
}

searchLink.onclick = (e) => {
	e.preventDefault()

	if (location.pathname !== "/search") {
		homeLink.parentElement.classList.remove("active")
		searchLink.parentElement.classList.add("active")
		history.pushState(null, null, searchLink.href)
		console.log(location);
	}
}

if (location.pathname == "/search") {
	homeLink.parentElement.classList.remove("active")
	searchLink.parentElement.classList.add("active")
} else if (location.pathname == "/") {
	homeLink.parentElement.classList.add("active")
	searchLink.parentElement.classList.remove("active")
}