// SPDX-FileCopyrightText: 2023 Jacob K
//
// SPDX-License-Identifier: LicenseRef-GPL-3.0-or-later-WITH-js-exceptions

function getRefDataJson() {
	for (script of document.scripts) {
		const matchArr = script.textContent.match(/currentOid/);
		if (matchArr) {
			return JSON.parse(script.textContent);
		}
	}
}

// TODO: find a better detection method
if (document.location.href.match(/^https:\/\/github.com\/[^\/]*\/[^\/]*\/tree\/[^\/]*\/?$/) || document.location.href.match(/^https:\/\/github.com\/[^\/]*\/[^\/]*\/?$/)) {
	const userName = document.location.href.split("/")[3];
	const projectName = document.location.href.split("/")[4];
	const currentRefName = getRefDataJson().props.initialPayload.refInfo.name;
	const currentCommitHash = getRefDataJson().props.initialPayload.refInfo.currentOid;
	const thisNameArchiveUrl = `https://github.com/${userName}/${projectName}/archive/${currentRefName}.tar.gz`;
	const thisCommitArchiveUrl = `https://github.com/${userName}/${projectName}/archive/${currentCommitHash}.tar.gz`;

//	console.log(thisNameArchiveUrl);
//	console.log(thisCommitArchiveUrl);
	
	// Show archive URLs next to the "Code" button
	// TODO: Make the section a popup instead of adding onto an existing visible element
	const newDiv = document.createElement("div");
	const a1 = document.createElement("a");
	a1.href = thisNameArchiveUrl;
	a1.textContent = a1.href;
	newDiv.appendChild(a1);
	if (thisNameArchiveUrl != thisCommitArchiveUrl) {
		newDiv.appendChild(document.createElement("br"));
		const a2 = document.createElement("a");
		a2.href = thisCommitArchiveUrl;
		a2.textContent = a2.href;
		newDiv.appendChild(a2);
	}
//	newDiv.style.display = "none";
	const spotElem = document.querySelectorAll(".Layout-sidebar")[0].children[0].children[0].children[0].children[0];
	spotElem.insertBefore(newDiv, spotElem.firstChild);
	
	// Allow controlling display of links with "Code" button
	document.querySelector('button[id=":R55ab:"]').addEventListener("click", function() {
		if (newDiv.style.display) {
			newDiv.style.display = "";
		} else {
			newDiv.style.display = "none";
		}
	});
}
