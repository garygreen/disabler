Disabler
===========================

Disable buttons with loading feedback. Useful for disabling form buttons to prevent submitting duplicate times.

![demo](resources/demo.gif)

## Usage

```javascript
$('button').disabler({
	timeout: 50000,
	html: 'Loading...'
});
```

It's easy to customise the html text displayed by setting up your disabler like so:

```html
<button type="submit" data-disabler="Saving...">Save</button>
```

```javascript
$('button[data-disabler]').disabler({
	html: function($btn) {
		return this.options.icon + ' ' + $btn.data('disabler');
	}
});
```

### Loading Spinner

By default font awesome is assumed to be available for use in the icon spinner. You can change the loading icon by supplying custom `html` option.

## Options

Option    | Default                | Description
----------|------------------------|-----------------
timeout   | 50000                  | Number of miliseconds before re-enabling the button
html      | "Loading..."           | Replacement html contents when in disabled state, left blank keeps existing HTML.