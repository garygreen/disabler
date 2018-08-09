/*
 *  Copyright 2018 Gary Green.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

function Disabler(element, options) {
	this.init(element, options);
}

Disabler.prototype = {

	defaults: {
		timeout: 20000,
		html: undefined,
		auto: false
	},

	/**
	 * Initialise disabler on element with the given options.
	 *
	 * @param  {mixed} element
	 * @param  {object} options
	 *
	 * @return {void}
	 */
	init: function(element, options) {
		this.element = element;
		this.setOptions(options || {});

		if (this.options.auto) {
			this.debounce();
		} else {
			this.bindEvents();
		}
	},

	/**
	 * Set the options.
	 *
	 * @param {object} options
	 */
	setOptions: function(options) {
		this.options = this._simpleMerge(this.defaults, options);
		
		var loadingMessage = this.element.getAttribute('data-disabler');
		if (options.html === undefined && typeof loadingMessage === 'string' && loadingMessage.length) {
			this.options.html = loadingMessage;
		}
	},

	/**
	 * Bind events which trigger disabling the element.
	 *
	 * @return {void}
	 */
	bindEvents: function() {
		this.element.addEventListener('click', this.debounce.bind(this));
	},

	/**
	 * Debounce disabling/enabling the element.
	 *
	 * @return {void}
	 */
	debounce: function() {
		setTimeout(this.disable.bind(this), 0);
		this.timer = setTimeout(this.enable.bind(this), this.options.timeout);
	},

	/**
	 * Get html to add.
	 *
	 * @return {string}
	 */
	getHtml: function() {
		var html = this.options.html;
		if (typeof html === 'function') {
			html = html.call(this, this.element);
		}

		return html;
	},

	/**
	 * Disable the element.
	 *
	 * @return {void}
	 */
	disable: function() {
		this.element.disabled = true;

		var html = this.getHtml();
		if (html === undefined) return;

		this.oldHtml = this.element.innerHTML;
		this.element.innerHTML = html;
	},

	/**
	 * Enable the element.
	 *
	 * @return {void}
	 */
	enable: function() {
		if (this.timer) {
			clearTimeout(this.timer);
		}

		this.element.disabled = false;

		if (this.oldHtml !== undefined) {
			this.element.innerHTML = this.oldHtml;		
			this.oldHtml = undefined;
		}
	},

	_simpleMerge: function(obj1, obj2) {
		// It be nice to use Object.assign to avoid haing to write this function
		// but unfortunately IE11 doesn't support it.
		var ret = Object.create(obj1), prop;

		for (prop in obj2) {
			ret[prop] = obj2[prop];
		}

		return ret;
	}

};

export default Disabler;
