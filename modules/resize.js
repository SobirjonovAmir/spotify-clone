const sidebarContainer = document.querySelector(".left-sidebar");
const sidebarResize = document.getElementById("left-sidebar__resize");
const sidebarResizeInput = document.getElementById("sidebar-resize-input");
const range = localStorage.getItem("range")
let isResizing = false;



toggleMedia(document.querySelector(".hide-media"))
toggleMedia(document.querySelector(".show-media"))
function toggleMedia(button) {
	button.onclick = () => {
		sidebarContainer.classList.toggle("hide")
	}
}


if (range) {
	if (range < 82) {
		sidebarContainer.classList.add("hide")
		sidebarContainer.style.width = range + "px";
	} else {
		sidebarContainer.style.width = range + "px";
	}
}

sidebarResize.onmousedown = (e) => {
	e.preventDefault()
	isResizing = true;

	document.addEventListener("mousemove", resizeSidebar);
	document.addEventListener("mouseup", stopResize);
};

function resizeSidebar(e) {
	if (!isResizing) return;
	const newWidth = e.clientX - sidebarContainer.getBoundingClientRect().left;
	if (newWidth < sidebarResizeInput.max && newWidth > sidebarResizeInput.min) {
		if (newWidth > 290) {
			sidebarContainer.style.width = newWidth + "px";
			sidebarResizeInput.setAttribute("value", newWidth)
		} else {

			if (newWidth < 100) {
				sidebarContainer.classList.add("hide")
				sidebarResizeInput.setAttribute("value", 74)
			} else if (newWidth > 150) {
				sidebarContainer.classList.remove("hide")
				sidebarResizeInput.setAttribute("value", 282)
				sidebarContainer.style.width = 282 + "px";
			}
		}
		localStorage.setItem("range", sidebarResizeInput.value)
		document.querySelector(".root").style.cursor = "col-resize"
		sidebarResize.style.background = "white"
	}
}

function stopResize() {
	isResizing = false;
	sidebarResize.style.background = "none"
	document.querySelector(".root").style.cursor = "default"
	document.removeEventListener("mousemove", resizeSidebar);
	document.removeEventListener("mouseup", stopResize);
}

