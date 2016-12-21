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

## Options

Option    | Type         | Default                 | Description
----------|--------------|-------------------------|------------------
timeout   | integer      | 50000                   | Number of miliseconds before re-enabling the button
html      | string, func | *keep element's text*   | HTML to use for the element when disabled
auto      | bool         | false                   | Whether to disable the button instantly (and not bind click events, etc)
