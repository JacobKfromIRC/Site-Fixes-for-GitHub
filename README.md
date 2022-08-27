# Haketilo-Fixes-for-GitHub
This repository contains free software JavaScript to use GitHub, including registration.

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
