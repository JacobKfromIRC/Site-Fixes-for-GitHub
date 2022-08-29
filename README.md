# Haketilo-Fixes-for-GitHub
This repository contains free software JavaScript to use GitHub, including registration.

Warning: GitHub will be able to tell that you used these scripts and not the official ones!

# Instructions

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

# License

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
