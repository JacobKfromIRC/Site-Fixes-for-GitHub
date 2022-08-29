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


