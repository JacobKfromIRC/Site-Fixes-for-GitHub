/*
github-com-settings
https://github.com/settings/***
*/

// SPDX-FileCopyrightText: 2024 Jacob K
//
// SPDX-License-Identifier: LicenseRef-GPL-3.0-or-later-WITH-js-exceptions

// Fully show expandable elements in the action list
for (elem of document.querySelectorAll(".ActionListContent[aria-expanded=false]")) {
	elem.setAttribute("aria-expanded", "true");
}
