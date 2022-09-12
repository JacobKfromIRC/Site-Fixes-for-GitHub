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
github-signup
https://github.com/signup
*/


// WARNING: GitHub will definitely be able to tell that you are using this script!

// example URL: https://github.com/signup?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F&source=header-home

const authenticity_token = document.getElementsByName("authenticity_token")[0].value; // idk what this is but it seems important
const email_csrf = document.getElementById("email").parentElement.parentElement.getElementsByTagName("input")[1].value; // used in validateEmail()
const password_csrf = document.getElementById("password").parentElement.parentElement.getElementsByTagName("input")[1].value; // used in validatePassword()
const login_csrf = document.getElementById("login").parentElement.parentElement.getElementsByTagName("input")[1].value; // used in validateUsername()
// the double ".parentElement" is needed for when elements are marked as incorrect (which makes them more nested)

// remotely validate an email address
function validateEmail(email) {
	// a bunch of strange variables
	const idkWhereThisNumberComesFrom = "100000000000000000000000000000"; // Number has been 166353028224734401703269524861 and 21393931315955876992991971439, for example. It's wildly different for each request (but the first number always seems to be low, hmmm). GitHub doesn't immediately seem to care what the number is: you can even send 100000000000000000000000000000 and the request will still go through.
	const probablyFixedNumberOfDashes = "---------------------------";
	const boundary = probablyFixedNumberOfDashes + idkWhereThisNumberComesFrom;
	const twoExtraDashes = "--";
	const longBoundary = twoExtraDashes + boundary;
	fetch("https://github.com/email_validity_checks", {
		"credentials": "include",
		"headers": {
		    "Accept": "*/*",
		    "Accept-Language": "en-US,en;q=0.5",
		    "Content-Type": `multipart/form-data; boundary=${boundary}`,
		    "Sec-Fetch-Dest": "empty",
		    "Sec-Fetch-Mode": "cors",
		    "Sec-Fetch-Site": "same-origin"
		},
		"body": `${longBoundary}\r\nContent-Disposition: form-data; name=\"authenticity_token\"\r\n\r\n${email_csrf}\r\n${longBoundary}\r\nContent-Disposition: form-data; name=\"value\"\r\n\r\n${email}\r\n${longBoundary}${twoExtraDashes}\r\n`,
		"method": "POST",
		"mode": "cors"
	}).then(async function(response){
		const responseText = await response.text(); // text() gets the text body of a response
		document.getElementById("email-err").innerHTML = responseText;
		/*
			Response will have code 422 if the email is invalid, and the
			response will look something lik this:
			`<p class="mb-0">Email is invalid or already taken</p>`. If the 
			email is valid, the response will have code 200 and be completely
			blank.
		*/
	});
}

// remotely validate a password
function validatePassword(password) {
	// a bunch of strange variables
	const idkWhereThisNumberComesFrom = "100000000000000000000000000000"; // Number has been 166353028224734401703269524861 and 21393931315955876992991971439, for example. It's wildly different for each request (but the first number always seems to be low, hmmm). GitHub doesn't immediately seem to care what the number is: you can even send 100000000000000000000000000000 and the request will still go through.
	const probablyFixedNumberOfDashes = "---------------------------";
	const boundary = probablyFixedNumberOfDashes + idkWhereThisNumberComesFrom;
	const twoExtraDashes = "--";
	const longBoundary = twoExtraDashes + boundary;
	fetch("https://github.com/password_validity_checks", {
		"credentials": "include",
		"headers": {
		    "Accept": "*/*",
		    "Accept-Language": "en-US,en;q=0.5",
		    "Content-Type": `multipart/form-data; boundary=${boundary}`,
		    "Sec-Fetch-Dest": "empty",
		    "Sec-Fetch-Mode": "cors",
		    "Sec-Fetch-Site": "same-origin"
		},
		"body": `${longBoundary}\r\nContent-Disposition: form-data; name=\"authenticity_token\"\r\n\r\n${password_csrf}\r\n${longBoundary}\r\nContent-Disposition: form-data; name=\"value\"\r\n\r\n${password}\r\n${longBoundary}${twoExtraDashes}\r\n`,
		"method": "POST",
		"mode": "cors"
	}).then(async function(response){
		const responseText = await response.text();
		document.getElementById("password-err").innerHTML = responseText;
	});
}

// remotely validate a username (also called a login)
function validateUsername(login) {
	// a bunch of strange variables
	const idkWhereThisNumberComesFrom = "100000000000000000000000000000"; // Number has been 166353028224734401703269524861 and 21393931315955876992991971439, for example. It's wildly different for each request (but the first number always seems to be low, hmmm). GitHub doesn't immediately seem to care what the number is: you can even send 100000000000000000000000000000 and the request will still go through.
	const probablyFixedNumberOfDashes = "---------------------------";
	const boundary = probablyFixedNumberOfDashes + idkWhereThisNumberComesFrom;
	const twoExtraDashes = "--";
	const longBoundary = twoExtraDashes + boundary;
	fetch("https://github.com/signup_check/username", {
		"credentials": "include",
		"headers": {
		    "Accept": "*/*",
		    "Accept-Language": "en-US,en;q=0.5",
		    "Content-Type": `multipart/form-data; boundary=${boundary}`,
		    "Sec-Fetch-Dest": "empty",
		    "Sec-Fetch-Mode": "cors",
		    "Sec-Fetch-Site": "same-origin"
		},
		"body": `${longBoundary}\r\nContent-Disposition: form-data; name=\"authenticity_token\"\r\n\r\n${login_csrf}\r\n${longBoundary}\r\nContent-Disposition: form-data; name=\"value\"\r\n\r\n${login}\r\n${longBoundary}${twoExtraDashes}\r\n`,
		"method": "POST",
		"mode": "cors"
	}).then(async function(response){
		const responseText = await response.text();
		document.getElementById("login-err").innerHTML = responseText;
	});
}

/*
	In order to submit the form (at https://github.com/signup (the page we're
	on)), the following inputs will be needed:
		`button=` (blank input, idk why (ah, it's a <button> part of HTML))
		`authenticity_token` (part of HTML)
		`user[email]` (email, needs to be made editable and validated)
		`user[password]` (password, needs to be made editable and validated)
		`user[login]` (username, needs to be made editable and validated)
		`opt_in` (y or n to promo emails, needs to be made editable)
		`octocaptcha-token` (CAPTCHA, needs to be set with code)
		`required_field_edf5` (idk, part of HTML, empty)
		`timestamp` (part of HTML, not changed by scripts)
		`timestamp_secret` (part of HTML, not changed by scripts)
	Submitting the form will take us to
	https://github.com/account_verifications?recommend_plan=true at which point
	another script can take over.
	For some reason, submitting the form immediately (before modifying any
	values) leads to a page that shows some of the inputs that need to be
	filled in (email, password, login, opt_in).
*/

function setOctocaptchaToken(tokenString) {
	document.querySelector(".js-octocaptcha-token").value = tokenString;
}

// automatically set the token string
// copied and modified from https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage (MIT license or public domain, not sure; see https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Attrib_copyright_license for details)
window.addEventListener("message", (event) => {
  // Do we trust the sender of this message?
  if (event.origin !== "https://octocaptcha.com") {
  	console.error("Bad origin:", event.origin);
    return;
  }

	if (event.data.split(": ")[0] == "OctocaptchaTokenString") {
		setOctocaptchaToken(event.data.split(": ")[1]);
	}

}, false);

function submitForm() {
	document.querySelector("form").submit();
}

/* This frame already exists; we don't need to create it.
<iframe src="https://octocaptcha.com?origin_page=github_signup_next&amp;responsive=true&amp;require_ack=true&amp;version=2" class="js-octocaptcha-frame width-full d-block border-0 rounded-2" title="Please verify by completing this captcha." style="height: 380px; width: 556px;"></iframe>
*/

// Show form inputs and iframe
document.getElementById("email-container").removeAttribute("hidden");
document.getElementById("password-container").removeAttribute("hidden");
document.getElementById("username-container").removeAttribute("hidden");
document.getElementById("opt-in-container").removeAttribute("hidden");
document.getElementById("captcha-and-submit-container").style.position = "revert";
document.getElementById("captcha-and-submit-container").querySelector("iframe.js-octocaptcha-frame.width-full.d-block.v-hidden.border-0.rounded-2").style = "visibility: revert !important";


// https://api.funcaptcha.com/fc/assets/tile-game-ui/13.29.0/standard/index.html?meta=7&custom_font={%221%22:{%22family%22:%22sfMono-regular%22,%22formats%22:[%22woff%22],%22filePath%22:%22/assets/graphics/github/SFMono-Regular_1615161502680%22},%222%22:{%22family%22:%22sfMono-bold%22,%22formats%22:[%22woff%22],%22filePath%22:%22/assets/graphics/github/SFMono-Bold_1615161497267%22},%223%22:{%22family%22:%22AllianceNo%22,%22formats%22:[%22woff%22],%22filePath%22:%22/assets/graphics/github/AllianceNo.2-Light_1615175288472%22}}
