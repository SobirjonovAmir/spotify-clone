const sidebarContainer = document.querySelector(".left-sidebar");
const sidebarResize = document.getElementById("left-sidebar__resize");
const sidebarResizeInput = document.getElementById("sidebar-resize-input");
const roll = document.getElementById("roll");
const turn_aside = document.getElementById("turn-aside");
const range = localStorage.getItem("range")
let isResizing = false;


roll.onclick = () => {
	const opened = localStorage.getItem("opened")
	if (opened) {
		sidebarContainer.style.width = opened + "px";
		localStorage.setItem("range", opened)
	} else {
		sidebarContainer.classList.add("show")
		sidebarResizeInput.setAttribute("value", 580)
		sidebarContainer.style.width = 580 + "px";
	}
	sidebarContainer.classList.add("show")
}

turn_aside.onclick = () => {
	const closed = localStorage.getItem("closed")
	if (closed) {
		sidebarContainer.style.width = closed + "px";
		localStorage.setItem("range", closed)
	}else {
		sidebarContainer.style.width = 420 + "px";
	}
	sidebarContainer.classList.remove("show")
	sidebarResizeInput.setAttribute("value", 420)
}

toggleMedia(document.querySelector(".hide-media"))
toggleMedia(document.querySelector(".show-media"))
function toggleMedia(button) {
	button.onclick = () => {
		if (range < 80) {
			sidebarResizeInput.setAttribute("value", 282)
			sidebarContainer.style.width = 282 + "px";
		}
		sidebarContainer.classList.toggle("hide")
	}
}



if (range) {
	if (range < 82) {
		sidebarContainer.classList.add("hide")
		sidebarContainer.style.width = range + "px";
	} else if (range > 580) {
		sidebarContainer.classList.add("show")
		sidebarContainer.style.width = range + "px";
	}
	else {
		sidebarContainer.style.width = range + "px";
	}
}

sidebarResize.onmousedown = (e) => {
	isResizing = true;

	document.addEventListener("mousemove", resizeSidebar);
	document.addEventListener("mouseup", stopResize);
};

function resizeSidebar(e) {
	if (!isResizing) return;
	const newWidth = e.clientX - sidebarContainer.getBoundingClientRect().left;
	if (newWidth < sidebarResizeInput.max && newWidth > sidebarResizeInput.min) {
		if (newWidth > 420) {
			if (newWidth > 540 && newWidth < 550) {
				sidebarContainer.classList.add("show")
				sidebarResizeInput.setAttribute("value", 580)
				sidebarContainer.style.width = 580 + "px";
			} else if (newWidth < 450) {
				sidebarContainer.classList.remove("show")
				sidebarResizeInput.setAttribute("value", 420)
				sidebarContainer.style.width = 420 + "px";
			} else if (newWidth > 580) {
				sidebarContainer.style.width = newWidth + "px";
				sidebarResizeInput.setAttribute("value", newWidth)
				localStorage.setItem("opened", newWidth)
			}
		} else if (newWidth < 290) {
			if (newWidth < 150) {
				sidebarContainer.classList.add("hide")
				sidebarResizeInput.setAttribute("value", 74)
			} else if (newWidth > 150) {
				sidebarContainer.classList.remove("hide")
				sidebarResizeInput.setAttribute("value", 282)
				sidebarContainer.style.width = 282 + "px";
			}
		} else {
			localStorage.setItem("closed", newWidth)
			sidebarContainer.style.width = newWidth + "px";
			sidebarResizeInput.setAttribute("value", newWidth)
		}
		localStorage.setItem("range", sidebarResizeInput.value)
		document.querySelector(".root").style.cursor = "col-resize"
		sidebarResize.style.borderLeft = "1px solid white"
	}
}

function stopResize() {
	isResizing = false;
	sidebarResize.style.borderLeft = "none"
	document.querySelector(".root").style.cursor = "default"
	document.removeEventListener("mousemove", resizeSidebar);
	document.removeEventListener("mouseup", stopResize);
}

