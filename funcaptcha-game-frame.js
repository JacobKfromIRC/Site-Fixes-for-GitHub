/*
funcaptcha-game-frame
https://api.funcaptcha.com/fc/assets/tile-game-ui/13.33.0/standard/index.html
https://api.funcaptcha.com/fc/assets/tile-game-ui/13.33.0/standard/index.html?meta=7&custom_font={%221%22:{%22family%22:%22sfMono-regular%22,%22formats%22:[%22woff%22],%22filePath%22:%22/assets/graphics/github/SFMono-Regular_1615161502680%22},%222%22:{%22family%22:%22sfMono-bold%22,%22formats%22:[%22woff%22],%22filePath%22:%22/assets/graphics/github/SFMono-Bold_1615161497267%22},%223%22:{%22family%22:%22AllianceNo%22,%22formats%22:[%22woff%22],%22filePath%22:%22/assets/graphics/github/AllianceNo.2-Light_1615175288472%22}}
called from funcaptcha-init-frame
NOTE: If you're running this from the console in Firefox/Abrowser, you need to
	set the evaluation context to the right of the text input to "Authentica"...
	and then run the script.
*/

const parentUrlParams = new URLSearchParams(parent.window.location.search);
const token = parentUrlParams.get("token");
const gameToken = frameElement.getAttribute("Haketilo-challengeId");

// get image for a challenge, called with 0 and then 1
function getChallengeImage(challengeNum) {
	fetch(`https://api.funcaptcha.com/rtig/image?challenge=${challengeNum}&sessionToken=${token}&gameToken=${gameToken}`, {
		"credentials": "omit",
		"headers": {
		    "Accept": "application/json, text/plain, */*",
		    "Accept-Language": "en-US,en;q=0.5",
		    "Sec-Fetch-Dest": "empty",
		    "Sec-Fetch-Mode": "cors",
		    "Sec-Fetch-Site": "same-origin"
		},
		"method": "GET",
		"mode": "cors"
	});
}


