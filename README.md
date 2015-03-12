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
$('.disabler').on('click', function() {
	$(this).disabler().closest('form').submit();
});
```

The above will add a disabler to all elements with `.disabler` once clicked and submit the form.

### Loading Spinner

By default font awesome is assumed to be available for use in the icon spinner. You can change the loading icon by supplying custom `html` option.

## Options

Option    | Default                | Description
----------|------------------------|-----------------
timeout   | 50000                  | Number of miliseconds before re-enabling the button
html      | "Loading..."           | Replacement html contents when in disabled state, left blank keeps existing HTML.