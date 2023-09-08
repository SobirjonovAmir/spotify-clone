import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';


let tooltips = document.querySelectorAll("[data-tooltip]")


tooltips.forEach(el => {
	let attributeValue = el.getAttribute("data-tooltip")

	tippy(el, {
		content: attributeValue,
		delay: [240, 0],
		offset: 7,
		placement: document.querySelector(".left-sidebar").classList.contains("hide") ? "right" : "top",
		arrow: false,
	});
})