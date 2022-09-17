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
funcaptcha-init-frame
https://api.funcaptcha.com/fc/gc/
iframe inside of octocaptcha-frame
URL has many parameters
NOTE: If you're running this from the console in Firefox/Abrowser, you need to
	set the evaluation context to the right of the text input to "https://ap"...
	and then run the script.
*/

const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token");
var challengeId = null;

/*
// something to do with analytics, not going to use for now
function analytics() {
	fetch("https://api.funcaptcha.com/fc/a/", {
		"credentials": "omit",
		"headers": {
*///		    "Accept": "*/*",
/*		    "Accept-Language": "en-US,en;q=0.5",
		    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
		    "cache-control": "no-cache",
		    "X-NewRelic-Timestamp": "166155300606786",
		    "X-Requested-ID": "{\"ct\":\"jr3mneyUaM/3SoVO9zPNNw==\",\"iv\":\"bb49c081a3330a6857583fe1f2936ac3\",\"s\":\"ba77709866a3b4e3\"}",
		    "X-Requested-With": "XMLHttpRequest",
		    "Sec-Fetch-Dest": "empty",
		    "Sec-Fetch-Mode": "cors",
		    "Sec-Fetch-Site": "same-origin"
		},
		"body": `analytics_tier=40&render_type=canvas&session_token=${token}&action=https%3A%2F%2Foctocaptcha.com%2F&category=Site+URL&sid=us-east-1`,
		"method": "POST",
		"mode": "cors"
	});
}
*/

function getCaptchaInfo() {
	fetch("https://api.funcaptcha.com/fc/gfct/", {
		"credentials": "omit",
		"headers": {
		    "Accept": "*/*",
		    "Accept-Language": "en-US,en;q=0.5",
		    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
		    "cache-control": "no-cache",
//		    "X-NewRelic-Timestamp": "166155300606813",
//		    "X-Requested-ID": "{\"ct\":\"YX156QfqZF8U9wwReypOWA==\",\"iv\":\"a89e5952588d58dabf4a598dd5dfc11b\",\"s\":\"4d53e012439e0735\"}", // If we keep these the same, it might cause some confusion hehe
		    "X-Requested-With": "XMLHttpRequest",
		    "Sec-Fetch-Dest": "empty",
		    "Sec-Fetch-Mode": "cors",
		    "Sec-Fetch-Site": "same-origin"
		},
		"body": `token=${token}&lang=&render_type=canvas&sid=us-east-1&data%5Bstatus%5D=init&analytics_tier=40`,
		"method": "POST",
		"mode": "cors"
	}).then(async function(response){
		const responseJson = await response.json();
		lastResponseValue = responseJson;
		console.log(responseJson);
		
		let nestedIframe = document.getElementById("CaptchaFrame")
		if (nestedIframe) {
			/* Don't do this anyway currently, as non-audio CAPTCHAs aren't
				solveable with this program yet.
			challengeId = responseJson.challengeID;
			nestedIframe.setAttribute("Haketilo-challengeId", challengeId);
			nestedIframe.src = "https://api.funcaptcha.com/fc/assets/tile-game-ui/13.33.0/standard/index.html?meta=7&custom_font={%221%22:{%22family%22:%22sfMono-regular%22,%22formats%22:[%22woff%22],%22filePath%22:%22/assets/graphics/github/SFMono-Regular_1615161502680%22},%222%22:{%22family%22:%22sfMono-bold%22,%22formats%22:[%22woff%22],%22filePath%22:%22/assets/graphics/github/SFMono-Bold_1615161497267%22},%223%22:{%22family%22:%22AllianceNo%22,%22formats%22:[%22woff%22],%22filePath%22:%22/assets/graphics/github/AllianceNo.2-Light_1615175288472%22}}";
			*/
		} else {
			console.log("CaptchaFrame does not exist."); // Why does this happen sometimes?
		}
		
		// audio CAPTCHA
		let audioElement = document.createElement("audio");
		audioElement.id = "audioElement";
		audioElement.src = `https://api.funcaptcha.com/fc/get_audio/?session_token=${token}&analytics_tier=40&r=us-east-1&game=0&language=en`;
		audioElement.setAttribute("controls", "");
		document.body.prepend(audioElement);
		document.querySelector(".audio-ctn").remove(); // get out of the way of audioElement
	});
}

// after displaying some stuff in the iframe, and the user clicking on the image

function solveCaptcha() {
	let guessString = encodeURIComponent(JSON.stringify({
		"ct": "???",
		"iv": "???",
		"s": "???"
	}));
	let bio = "???";
	fetch("https://api.funcaptcha.com/fc/ca/", {
		"credentials": "omit",
		"headers": {
		    "Accept": "*/*",
		    "Accept-Language": "en-US,en;q=0.5",
		    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
		    "cache-control": "no-cache",
		    "X-NewRelic-Timestamp": "166158300124240",
//		    "X-Requested-ID": "{\"ct\":\"rIbMz91NnybLHXu/5GR+sg==\",\"iv\":\"f1142028679007d7204ff8c16727a000\",\"s\":\"c9a340dfcc25f5de\"}",
//		    "X-Requested-With": "XMLHttpRequest",
		    "Sec-Fetch-Dest": "empty",
		    "Sec-Fetch-Mode": "cors",
		    "Sec-Fetch-Site": "same-origin"
		},
		"body": `session_token=${token}&sid=us-east-1&game_token=${challengeId}&guess=${guessString}&analytics_tier=40&bio=${bio}`,
		"method": "POST",
		"mode": "cors"
	});
}

function solveAudioCaptcha(solution) {
	const bio = "???";
	fetch("https://api.funcaptcha.com/fc/audio/", {
		"credentials": "omit",
		"headers": {
		    "Accept": "*/*",
		    "Accept-Language": "en-US,en;q=0.5",
		    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
		    "cache-control": "no-cache",
//		    "X-NewRelic-Timestamp": "166161700098232",
//		    "X-Requested-ID": "{\"ct\":\"nfVOxmrqdMCgvNuVFkkAPQ==\",\"iv\":\"99415d97f23d3b060a2ebbd83d6ec109\",\"s\":\"5bd82705c3213a87\"}",
		    "X-Requested-With": "XMLHttpRequest",
		    "Sec-Fetch-Dest": "empty",
		    "Sec-Fetch-Mode": "cors",
		    "Sec-Fetch-Site": "same-origin"
		},
		"body": `audio_type=2&response=${solution}&r=us-east-1&language=en&analytics_tier=40&session_token=${token}&bio=${bio}`,
		"method": "POST",
		"mode": "cors"
	}).then(async function(response){
		const responseJson = await response.json();
		lastResponseValue = responseJson;
		console.log(responseJson);
		if (responseJson.response == "correct") {
			alert("CAPTCHA solved successfully!");
		} else if (responseJson.error_reply) {
			alert(`CAPTCHA failed, with error reply: ${responseJson.error_reply}`);
		} else {
			alert("CAPTCHA failed, not sure why!");
		}
	});
}

function playAudio() {
	document.getElementById("audioElement").play();
}




// actually run the script
getCaptchaInfo();

// add audio solution box so you don't have to manually run solveAudioCaptcha()
let audioCaptchaSolveButton = document.createElement("button");
audioCaptchaSolveButton.innerText = "Submit answer to audio CAPTCHA";
audioCaptchaSolveButton.addEventListener("click", function(element){
	solveAudioCaptcha(document.getElementById("audioTextInput").value);
});
document.body.prepend(audioCaptchaSolveButton);
let audioTextInput = document.createElement("input");
audioTextInput.id = "audioTextInput";
document.body.prepend(audioTextInput);

// Then run solveCaptcha() after you've run funcaptcha-game-frame





// remove some (currently) useless elements
document.querySelector("div.main-ctn").remove();
document.querySelector("div.infoCtn").remove();
