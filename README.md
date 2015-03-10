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

## Working with forms

```javascript
$('.disabler').each(function() {
	var $btn = $(this);
	$btn.closest('form').on('submit', function() {
		$btn.disabler();
	});
});
```

The above will add a disabler to all elements with `.disabler` class once the form is submitted.

### Loading Spinner

By default font awesome is assumed to be available for use in the icon spinner. You can change the loading icon by supplying custom `html` option.

## Options

Option    | Default                | Description
----------|------------------------|-----------------
timeout   | 50000                  | Number of miliseconds before re-enabling the button
html      | "Loading..."           | Replacement html contents when in disabled state, left blank keeps existing HTML.