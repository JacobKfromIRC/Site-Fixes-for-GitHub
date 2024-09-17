<!--
For this README file:
SPDX-FileCopyrightText: 2022-2024 Jacob K

SPDX-License-Identifier: CC0-1.0
-->

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

Although it is possible to run these scripts by pasting them in the console when JavaScript is blocked by some other extension, you will probably want to use them with [Haketilo](https://haketilo.koszko.org/). If you do not have hydrilla set up, here is what I recommend, run from the root of this repository (You will need [guix](https://guix.gnu.org/) installed; it is available in the Trisquel 11 apt repository):

```
cd ..
git clone --recurse-submodules https://git.koszko.org/haketilo-hydrilla/
cd haketilo-hydrilla
git checkout 334801b3d0fa2494a39b46257bec0972116ce5a6 # latest at time of writing
make shell-with-haketilo
cd ../Site-Fixes-for-GitHub
./host.sh
```

Then, if http://127.0.0.1:10112/ is a repository in your Haketilo settings, you should be able to add the scripts for GitHub pages. In Haketilo 2 you can do this by navigating to a page that needs scripts, for example https://github.com/divVerent/aaaaxy/releases , and then click on the extension icon, then click on "Search for custom resources", then "Show results" next to the local repository, and then "More..." to get info and then install.

For hydrilla, I recommend using the master branch rather than a release because hydrilla does not have a stable release yet. If you've never used Haketilo, I recommend using the latest stable version (v2.0.1). It can be downloaded [here](https://haketilo.koszko.org/downloads#webextension). After it's installed, add http://127.0.0.1:10112/ as a repository in the settings, and then search for custom resources on a GitHub page.

If you do use Haketilo 3 (currently in beta), then it will automatically let you know when a script is available, but I have not tested this and the way Haketilo 3 works makes using other JavaScript blocking extensions like LibreJS and NoScript somewhat inconvenient. If the only JavaScript you want to run is Haketilo JavaScript, then I might recommend the Haketilo 3 beta.

## License

This program is licensed as GPL version 3 or later, with 2 (optional) exceptions. See the following license header for details:

```
/**
 * SPDX-License-Identifier: LicenseRef-GPL-3.0-or-later-WITH-js-exceptions
 *
 * Copyright (C) 2022 Wojtek Kosior
 * Copyright (C) 2022-2024 Jacob K
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
