/**
 * SPDX-License-Identifier: LicenseRef-GPL-3.0-or-later-WITH-js-exceptions
 *
 * Copyright (C) 2022 Jacob K
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute forms of that code without the copy of the GNU
 * GPL normally required by section 4, provided you include this
 * license notice and, in case of non-source distribution, a URL
 * through which recipients can access the Corresponding Source.
 * If you modify file(s) with this exception, you may extend this
 * exception to your version of the file(s), but you are not
 * obligated to do so. If you do not wish to do so, delete this
 * exception statement from your version.
 *
 * As a special exception to the GPL, any HTML file which merely
 * makes function calls to this code, and for that purpose
 * includes it by reference shall be deemed a separate work for
 * copyright law purposes. If you modify this code, you may extend
 * this exception to your version of the code, but you are not
 * obligated to do so. If you do not wish to do so, delete this
 * exception statement from your version.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

/*
octocaptcha-frame
https://octocaptcha.com/
https://octocaptcha.com/?origin_page=github_signup_next&responsive=true&require_ack=true&version=2
depends on cors-bypass
*/

const pkey = document.getElementById("funcaptcha").getAttribute("data-pkey");
const inIframe = window.location !== window.parent.location;

let lastResponseValue = null; // for debugging

// ugh, I need to bypass CORS again I think (to get data from https://api.funcaptcha.com/fc/api/?onload=loadFunCaptcha)
function loadFunCaptcha() {
	HKT.fetch("https://api.funcaptcha.com/fc/api/?onload=loadFunCaptcha", {
	//    "credentials": "omit", // not supported by cors-bypass currently
		"headers": {
		    "Accept": "*/*",
		    "Accept-Language": "en-US,en;q=0.5",
		    "Sec-Fetch-Dest": "script",
		    "Sec-Fetch-Mode": "no-cors",
		    "Sec-Fetch-Site": "cross-site",
	//        "If-None-Match": "W/\"34623ec09800ed1ff9bcf89539b4dd9450ff7d31|sha384-Yy6x+Wc2KX/tLkqJ3ciYcBKT0xjUSRHzg6h0b/AIDcqR70HAo9iemExAEgdbDhnt\"" // I do not know what this is. The first time this value appears is in this request. Wait, the first number here is actually the number we want to get from the script... Maybe it's from a cache? Okay yeah, if you go to incognito mode, then the first time this request is made, it will not already have this number, so I think this line is not important. I'll leave it and the explination here in case others are confused.
		},
		"method": "GET",
		"mode": "cors" // change to "no-cors" if you want an empty string, instead of an error :P
	}).then(async function(response){
		const responseText = await response.text();
		lastResponseValue = responseText;
		console.log(responseText);
		const apiJsUrl = responseText.match(/src="([^"]*)"/)[1];
		console.log(apiJsUrl);
		funCaptchaApi(apiJsUrl); // just testing
	});
}

function funCaptchaApi(apiJsUrl) {
	fetch(apiJsUrl, {
//		"credentials": "omit", // not supported by cors-bypass currently
		"headers": {
		    "Accept": "*/*",
		    "Accept-Language": "en-US,en;q=0.5",
		    "Sec-Fetch-Dest": "script",
		    "Sec-Fetch-Mode": "no-cors",
		    "Sec-Fetch-Site": "cross-site"
		},
		"method": "GET",
		"mode": "cors"
	}).then(async function(response){
		const responseText = await response.text();
		lastResponseValue = responseText;
		console.log(responseText);
	});
}

// Make the request to get the token string
function gt2() {
	const bda = "???"; // not sure how to get this... // TODO: figure out
	const rnd = Math.random();
		/*
			example rnd values:
				0.4792079331728678
				0.4817994780505471
		*/
	fetch(`https://api.funcaptcha.com/fc/gt2/public_key/${pkey}`, {
		"credentials": "omit",
		"headers": {
		    "Accept": "*/*",
		    "Accept-Language": "en-US,en;q=0.5",
		    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
		    "Sec-Fetch-Dest": "empty",
		    "Sec-Fetch-Mode": "cors",
		    "Sec-Fetch-Site": "cross-site"
		},
		"body": `bda=${bda}&public_key=${pkey}&site=${encodeURIComponent(document.URL.split("?")[0])}&userbrowser=${encodeURIComponent(navigator.userAgent)}&rnd=${rnd}&data[origin_page]=github_signup_next`,
		"method": "POST",
		"mode": "cors"
	}).then(async function(response){
		const responseJson = await response.json();
		lastResponseValue = responseJson;
		console.log(responseJson);
//		const challengeUrlCdn = responseJson.challenge_url_cdn;
//		fcBootstrap(challengeUrlCdn);
		const tokenString = responseJson.token;
		if (inIframe) {
			window.parent.postMessage(`OctocaptchaTokenString: ${tokenString}`, "https://github.com")
		}
		console.log("Put this in octocaptcha-token: ", tokenString);
		insertIframe(tokenString);
	});
}

// get a JavaScript file the official script gets, probably not important
function fcBootstrap(challengeUrlCdn) {
	HKT.fetch(challengeUrl, {
//		"credentials": "omit", // not supported by cors-bypass currently
		"headers": {
		    "Accept": "*/*",
		    "Accept-Language": "en-US,en;q=0.5",
		    "Sec-Fetch-Dest": "script",
		    "Sec-Fetch-Mode": "cors",
		    "Sec-Fetch-Site": "cross-site"
		},
		"method": "GET",
		"mode": "cors"
	});
}

// Construct iframe URL from a token string and add the iframe to the document
function insertIframe(tokenString) {
	const url = `https://api.funcaptcha.com/fc/gc/?token=${tokenString.replaceAll("|", "&")}`;
	let iframe = document.createElement("iframe");
	iframe.setAttribute("scrolling", "no");
	iframe.id = "fc-iframe-wrap";
	iframe.className = "fc-iframe-wrap";
	iframe.setAttribute("aria-label", " ");
	iframe.style = "width: 100%; height: 380px;";
	iframe.src = url;
	iframe.setAttribute("frameborder", "0");
	let nestedDiv = document.createElement("div");
	/* note: There are some hidden inputs below the element with id "FunCaptcha"
		in the official script. They may be important later. */
	nestedDiv.id = "FunCaptcha";
	document.getElementById("funcaptcha").appendChild(nestedDiv);
	document.getElementById("FunCaptcha").appendChild(iframe);
}

///* // program flow (type these commands to use this script)
//loadFunCaptcha(); // not necessary apparently? Maybe that means I didn't to wait for Haketilo 2.0 lol
gt2();
//*//
