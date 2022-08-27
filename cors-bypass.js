/* SPDX-License-Identifier: GPL-3.0-or-later
 *
 * A Haketilo library which facilitates making HTTP AJAX requests that bypass
 * CORS rules.
 *
 * Copyright (C) 2022 Wojtek Kosior
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
 *
 *
 * I, Wojtek Kosior, thereby promise not to sue for violation of this file's
 * license. Although I request that you do not make use of this code in a
 * proprietary program, I am not going to enforce this in court.
 */

"use strict";

var HKT = Object.assign(window.HKT || {}, {_api_call_id: 0});

HKT._error_from_jsonifiable_data = function(jsonifiable) {
    const arg_props = ["message", "fileName", "lineNumber"];
    return new window[jsonifiable.name](...arg_props.map(p => jsonifiable[p]));
}

HKT._response_from_jsonifiable_data = function(jsonifiable) {
    const body = jsonifiable.body, body_len = body.length / 2;
    const body_buf = new Uint8Array(body_len);

    for (let i = 0; i < body_len; i++)
	body_buf[i] = parseInt(`0x${body.substring(i * 2, i * 2 + 2)}`);

    const init = {
	status:     jsonifiable.status,
	statusText: jsonifiable.statusText,
	headers:    new Headers(jsonifiable.headers)
    };

    return new Response(body_buf, init);
}

HKT._headers_to_jsonifiable_object = function(headers) {
    return [...headers]
	.reduce((acc, [key, val]) => Object.assign(acc, {[key]: val}), {});
}

HKT._buffer_to_hex = function(buffer) {
    return [...new Uint8Array(buffer)]
	.map(b => ("0" + b.toString(16)).slice(-2))
	.join("");
}

HKT.fetch = async function(...args) {
    const request = new Request(...args)

    for (const [prop, allowed_value] of [
	["cache",        "default"],
	["mode",         "cors"],
	["credentials",  "same-origin"],
	["referrer",     "about:client"]
    ]) {
	if (request[prop] !== allowed_value)
	    throw Error(`Specifying custom value for request's option ${prop} is currently not supported.`);
    }

    const url = request.url;

    const init = {
	method:      request.method,
	headers:     HKT._headers_to_jsonifiable_object(request.headers),
	redirect:    request.redirect,
    };

    if (request.integrity)
	init.integrity = request.integrity;

    const buffer = await request.arrayBuffer();

    if (buffer.byteLength > 0)
	init.body = HKT._buffer_to_hex(buffer);

    const data = JSON.stringify({url, init});
    const id = `${HKT._api_call_id++}`;
    const detail = {data, id};

    let cb, done = new Promise(_cb => cb = _cb);

    window.addEventListener(`haketilo_CORS_bypass-${id}`,
			    e => cb(e.detail), {once: true});

    window.dispatchEvent(new CustomEvent("haketilo_CORS_bypass", {detail}));

    const result = JSON.parse(await done);
    if ("error" in result)
	throw HKT._error_from_jsonifiable_data(result);

    return HKT._response_from_jsonifiable_data(result);
}
