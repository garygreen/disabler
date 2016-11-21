/*
 *  Copyright 2015 Gary Green.
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

	this.$element = $(element);
	this.setOptions(options);
	this.bindEvents();
}

Disabler.prototype = {

	defaults: {
		timeout: 20000,
		html: undefined
	},

	/**
	 * Set the options.
	 *
	 * @param {object} options
	 */
	setOptions: function(options) {
		this.options = $.extend({}, this.defaults, options);

		var loadingMessage = this.$element.data('disabler');
		if (options.html === undefined && loadingMessage !== undefined) {
			this.options.html = loadingMessage;
		}
	},

	/**
	 * Bind events which trigger disabling the element.
	 *
	 * @return {void}
	 */
	bindEvents: function() {
		this.$element.on('click', $.proxy(this.debounce, this));
	},

	/**
	 * Debounce disabling/enabling the element.
	 *
	 * @return {void}
	 */
	debounce: function() {
		setTimeout($.proxy(function() {
			this.disable();
		}, this), 0);

		this.timer = setTimeout($.proxy(function() {
			this.enable();
		}, this), this.options.timeout);
	},

	/**
	 * Get html to add.
	 *
	 * @return {string}
	 */
	getHtml: function() {
		var html = this.options.html;
		if ($.isFunction(html)) {
			html = html.call(this, this.$element);
		}

		return html;
	},

	/**
	 * Disable the element.
	 *
	 * @return {void}
	 */
	disable: function() {
		this.$element.prop('disabled', true);

		var html = this.getHtml();
		if (html === undefined) return;

		this.oldHtml = this.$element.html();
		this.$element.html(html);
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

		this.$element.prop('disabled', false).html(this.oldHtml);
		this.oldHtml = '';
	}

};

$.fn.disabler = function(options) {

	options = options || {};

	var namespace = 'ggdisabler';

	return $(this).each(function() {
		var $this = $(this);

		if (!$this.data(namespace)) {
			$this.data(namespace, new Disabler(this, options));
		}
	});

};
