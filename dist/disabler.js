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
	this.options = $.extend({}, this.defaults, options);
	this.start();

}

Disabler.prototype = {

	defaults: {
		timeout: 50000,
		html: '<i class="fa fa-circle-o-notch fa-spin"></i> Loading...'
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
	 * Add loading html
	 * @return {void}
	 */
	addHtml: function() {
		if (!this.options.html.length) return false;
		
		this.oldHtml = this.$element.html();
		this.$element.html(this.options.html);
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

	var namespace = 'disabler';

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