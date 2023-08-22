# Site-Fixes-for-GitHub
This repository contains free software JavaScript to use GitHub, including registration.

The original repository is at https://github.com/JacobKfromIRC/Site-Fixes-for-GitHub but there is a mirror at https://codeberg.org/JacobK/Site-Fixes-for-GitHub

You can use either this repository or the mirror to open issues.

Warning: GitHub will be able to tell that you used these scripts and not the official ones!

Current features:

* register an account
* view lazily loaded <include-fragement-element\> elements

Currently, there are some features missing:

* For registration:
	* Visual CAPTCHA is not supported.
	* Some values that do not seem to affect functionality are missing, such as "bda" and "bio", which means it would be trivial for GitHub to figure out who is not using the official scripts (There are probably lots of non-obvious differences too, though).
	* There is no GUI option to validate email, password, and username before submitting the form.
	* The personalization menu after entering the launch code does not function properly.
* When creating a repository, the license selected does not display properly.
* The dropdown that appears when you click on your profile icon does not display properly.
* Previewing issue comments does not work.
* There is no button to sign out. You can currently sign out by going to https://github.com/logout
* You cannot attach files in GitHub issues.
* You cannot hover over react emojis to see who made the reaction.
* You cannot see lazily loaded <batch-deferred-content\> elements.
* The dynamically loaded parts of the home page (i.e. https://github.com/ when logged in) do not load.



There is also a known issue that I am not planning to fix:

* If you try to register with [HTTPS Everywhere](https://www.eff.org/https-everywhere)'s "Encrypt All Sites Eligible (EASE) Mode", then you will get an error, "The connection to a verification server was interrupted. Please refresh this page to try again.", when trying to register. Abrowser/Firefox's native "HTTPS-Only Mode" does not cause this problem.

### Instructions

The below instructions are outdated. The program should now be intuitive to use via the GUI once installed via Haketilo.

To use this script from the dev console (no Haketilo needed, probably), go to github.com/signup, and copy/paste the code in github-signup.js in the console, and run it.

You can go ahead and enter all your registration details now.

Then, select the execution context to the iframe, by clicking on the dropdown to the right of the typing box in the dev console.

Run the code in octocaptcha-frame.js.

Then, set the execution context to the other iframe that starts with "https://api.funcaptcha".

Run the code in funcaptcha-init-frame.js.

Type "playAudio();" to play the audio challenge.

Type "solveAudioCaptcha(NUMBERSHEARD);", replacing "NUMBERSHEARD" with the numbers you heard, and run that.

If you get an alert saying the CAPTCHA was solved, set the execution context back to the top. Otherwise the following instructions will not work and you should restart I guess.

Scroll up in the console (or search) to find "Put this in octocaptcha-token:" and run "setOctocaptchaToken(TOKENSTRING);", replacing TOKENSTRING with the value in the console log.

run "submitForm();" and you should be taken to the launch code page, and you should get an email from GitHub with your launch code. This page works without JavaScript.

After entering the launch code, you can click "Skip Personalization" to get to your home page.

You now have a GitHub account! Most functions work without JavaScript, but the profile dropdown is broken. To get to settings you can go to github.com/settings.

## License

This program is licensed as GPL version 3 or later, with 2 (optional) exceptions. See the following license header for details:

```
/**
 * SPDX-License-Identifier: LicenseRef-GPL-3.0-or-later-WITH-js-exceptions
 *
 * Copyright (C) 2022 Wojtek Kosior
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
```
