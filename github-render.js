// SPDX-FileCopyrightText: 2023-2024 Jacob K
//
// SPDX-License-Identifier: LicenseRef-GPL-3.0-or-later-WITH-js-exceptions

/*
e.g.
https://github.com/iv-org/invidious/tree/master/scripts
https://github.com/JacobKfromIRC/Site-Fixes-for-GitHub/blob/main/cors-bypass.js
*/

function getReactData(target) {
	const dataArr = [];
	for (script of document.scripts) {
	  if (script.getAttribute("data-target") == target) {
		dataArr.push(JSON.parse(script.textContent));
	  }
	}
	return dataArr;
}

const embeddedData = getReactData("react-app.embeddedData")[0];
const reactApp = document.querySelector("react-app"); // should really use querySelectorAll here and render all reactApps

function getLinkFromPath(path) {
	const matchArr = document.URL.match(/https:\/\/github.com\/[^/]*\/[^/]*\/tree\/[^/]*/);
	if (matchArr) {
		return matchArr[0] + "/" + path;
	} else {
		return null;
	}
}


if (embeddedData && embeddedData.payload.tree) {
	const textDiv = document.createElement("div");
	for (item of embeddedData.payload.tree.items) {
		const itemLink = document.createElement("a");
		itemLink.innerText = item.name;
		itemLink.href = getLinkFromPath(item.path);
		textDiv.appendChild(itemLink);
		textDiv.appendChild(document.createElement("br"));
	}
	reactApp.querySelector(`div[data-target="react-app.reactRoot"]`).appendChild(textDiv);
}


function goToRaw() {
	document.location.assign(document.URL.replace("blob", "raw"));
}

if (embeddedData && embeddedData.payload.blob) {
	const headerDiv = document.createElement("div");
	const rawButton = document.createElement("button");
	rawButton.addEventListener("click", goToRaw);
	rawButton.innerText = "view raw text";
	headerDiv.appendChild(rawButton);
	reactApp.querySelector(`div[data-target="react-app.reactRoot"]`).appendChild(headerDiv);
	const textDiv = document.createElement("div");
	if (embeddedData.payload.blob.richText) {
		textDiv.innerHTML = embeddedData.payload.blob.richText;
	} else if (embeddedData.payload.blob.rawLines) {
		for (line of embeddedData.payload.blob.rawLines) {
			const newLine = document.createElement("p");
			newLine.innerText = line;
			textDiv.appendChild(newLine);
		}
	} else {
		console.error("[Site-Fixes-for-GitHub] file not displayed");
	}
	reactApp.querySelector(`div[data-target="react-app.reactRoot"]`).appendChild(textDiv);
}
