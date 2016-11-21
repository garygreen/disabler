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
		this.$element.on('click', $.proxy(this.start, this));
	},

	/**
	 * Start disabler
	 * @return {void}
	 */
	start: function() {
		this.disable();
		this.timer = setTimeout($.proxy(function() {
			this.enable();
		}, this), this.options.timeout);
	},

	/**
	 * Disable
	 * @return {void}
	 */
	disable: function() {
		setTimeout($.proxy(function() {
			this.$element.prop('disabled', true);
			this.addHtml();
		}, this), 0);
	},

	/**
	 * Enable
	 * @return {void}
	 */
	enable: function() {
		this.$element.prop('disabled', false);
		this.removeHtml();
	},

	/**
	 * Get html to add
	 * @return {string}
	 */
	getHtml: function() {
		var html = this.options.html;
		if ($.isFunction(html))
		{
			html = html.call(this, this.$element);
		}
		return html;
	},

	/**
	 * Add loading html
	 * @return {void}
	 */
	addHtml: function() {
		var html = this.getHtml();
		if (html.length === undefined) return false;

		this.oldHtml = this.$element.html();
		this.$element.html(html);
	},

	/**
	 * Remove loading html
	 * @return {void}
	 */
	removeHtml: function() {
		if (this.oldHtml)
		{
			this.$element.html(this.oldHtml);
			this.oldHtml = '';
		}
	},

	/**
	 * Destroy plugin instance
	 * @return {void}
	 */
	destroy: function() {
		if (this.timer)
		{
			clearTimeout(this.timer);
		}
		this.enable();
		this.removeHtml();
	}

};

$.fn.disabler = function(options) {

	options = options || {};

	var namespace = 'ggdisabler';

	return $(this).each(function() {

		var $this = $(this);

		// Get plugin instance
		var disabler = $this.data(namespace);

		// Destroy?
		if (disabler)
		{
			disabler.destroy();
			delete disabler;
		}

		disabler = new Disabler(this, options);
		$this.data(namespace, disabler);

	});

};
