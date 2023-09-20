import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';


let tooltips = document.querySelectorAll("[data-tooltip]")
let state = 0

tooltips.forEach(el => {
	let attributeValue = el.getAttribute("data-tooltip")

	tippy(el, {
		content: attributeValue,
		delay: [240, 0],
		placement: "top",
		arrow: false,
	});
})


let homeLink = document.querySelector("#home-link")
let searchLink = document.querySelector("#search-link")


homeLink.onclick = (e) => {
	e.preventDefault()
	if (location.pathname !== "/") {
		state++
		homeLink.parentElement.classList.add("active")
		searchLink.parentElement.classList.remove("active")
		window.history.pushState(state, null, "/")
		updateButtonState()
	}
}

searchLink.onclick = (e) => {
	e.preventDefault()
	if (location.pathname !== "/search") {
		state++
		homeLink.parentElement.classList.remove("active")
		searchLink.parentElement.classList.add("active")
		window.history.pushState(state, null, searchLink.href)
		updateButtonState()
	}
}

if (location.pathname == "/search") {
	homeLink.parentElement.classList.remove("active")
	searchLink.parentElement.classList.add("active")
} else if (location.pathname == "/") {
	homeLink.parentElement.classList.add("active")
	searchLink.parentElement.classList.remove("active")
}



const backButton = document.getElementById('backButton');
const forwardButton = document.getElementById('forwardButton');

function updateButtonState() {
	console.log(window.history.state);
	if (window.history.state > 0) {
		backButton.disabled = false;
	} else {
		backButton.disabled = true;
	}

	if (window.history.state !== state) {
		forwardButton.disabled = false;
	} else {
		forwardButton.disabled = true;
	}
}


backButton.onclick = () => {
	state--
	window.history.back();
}
forwardButton.onclick = () => {
	state++
	window.history.forward();
}


window.onpopstate = function () {
	updateButtonState();
	if (location.pathname == "/search") {
		homeLink.parentElement.classList.remove("active")
		searchLink.parentElement.classList.add("active")
	} else if (location.pathname == "/") {
		homeLink.parentElement.classList.add("active")
		searchLink.parentElement.classList.remove("active")
	}
};

window.onload = function () {
	updateButtonState();
};


document.querySelector("#like").checked = true
let media_search = document.querySelector("#media-search")
let media_search_input = document.querySelector("#media-search-input")

media_search.onclick = () => {
	media_search_input.focus()
}