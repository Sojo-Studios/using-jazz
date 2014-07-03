Using Jazz
=====

## Embedding
Embedding jazz on your website is easy! Simply put the following at the bottom of the `<body></body>` tag on every page that you control after changing 'CAMPAIGN_ID' to the one you got from [Sojo Portal](http://app.sojo.com/):

```html
<script>(function(d,a,b,c){a[b]&&a[b].q?function(){a[b].q.unshift(arguments)}("init",c):(a[b]=function(){(a[b].q=a[b].q||[]).push(arguments)},a[b]("init",c));c=d.createElement("script");d=d.getElementsByTagName("script")[0];c.async=!0;c.src="https://static.sojo.com/jazz/jazz.min.js";d.parentNode.insertBefore(c,d)})(document,window,"__saq","CAMPAIGN_ID");</script>
```

(Note that the portal will automagically generate this snippet for you when you create your campaign.)

Once you've done this, you can queue commands for jazz to execute once the library has loaded by calling the following JavaScript anywhere you like. A `<script></script>` tag, for example:

```js
__saq = __saq || function() { (__saq.q = __saq.q || []).push(arguments); };
__saq('bind-click-events');
__saq('show-modal', 'share-post-purchase-modal');
```

This simply adds your functions to the queue. It does so by making sure that the __saq (**S**ojo **A**ction **Q**ueue) object exists, and if it doesn't, it creates it. The following calls push your command (the first argument, as a string) and arguments to your command (the following values) to the queue which will be evaluated in order once Jazz has been loaded.

## Programming
Using jazz within your own javascript projects is even easier. For the following example, we'll assume that jQuery is being used to easily load scripts asyc, but `$.getScript()` does exactly what you think. Feel free to replace this with any script loader, or remove it entirely and put a `<script></script>` node with the correct `src` attribute anywhere in your dom tree.

```js
(function($)
{
	'use strict';

	var campaignID = 'my-campaign-uuid4';

	// Install the queue shim into the global namespace
	__saq = __saq || function() { (__saq.q = __saq.q || []).push(arguments); };

	// Make sure to init first
	__saq('init', campaignID);

	// Get the script
	$.getScript('//static.sojo.com/jazz/jazz.min.js');

	// This function will only get called once everything is done
	__saq('function', function() { console.log('Everything\'s done!'); });

}).call(window, jQuery);
```

Note that so long as the shim is installed before using `__saq` as a function, you can request the script anywhere in your program and Jazz will still initialize correctly and evacuate the queue without problem. Also make sure to note that we assume the context the function is being called in is `window`, thus installing the `__saq` variable into the global namespace.

If installation into the global namespace is akin to scratching a chalkboard, continue reading.

## AMD Programming
If you're into the more enlightened way to build large-scale javascript you'll be wanting a module that doesn't mutate the global namespace. While Jazz uses RequireJS internally, it currently doesn't make it easy to avoid mutating the global namespace.

A jazz.amd.min.js is forthcoming. 


## Command reference
#### init
Parameters: `string`, [`object`]

Initializes the sojo global object with the campaign ID passed as the first string and with override options as passed by the optional second parameter. **Please note:** The prescribed embedding snippet *does this initialization automatically* and failure to do so at the beginning of the queue will result in halting errors. Apply with care. 

#### bind-click-events
Parameters: [`string`]

Searches the `<body>` for elements that have the `data-sojo-command` HTML5 data attribute and binds the action specified as the value of that attribute to their click event. The value of the attribute can be any of these commands (except function) with the parameters delimited by the ':' character. Convenient for buttons that trigger modals.

The optional string parameter is a jQuery 1.9-valid css selector that only does the search for the tag attribute inside results for that selector. This is provided because searching the entire body could potentially be a time-intensive operation if the page is very complex or if the computer is slow and the browser is old.

#### show-modal
Parameters: [`string`]

Shows the modal named by the string parameter. If not provided, it defaults to `share-modal`.

#### set-campaign-id
Parameters: `string`

Sets the current Campaign ID to the provided string.

#### function
Parameters: `function`

Executes the function passed as the second argument and continues executing the queue immediately when that function returns. If you need to block the queue's continued execution, look at the `promise-function` command below.

#### promise-function
Parameters: `function`

Executes a function which is expected to return an [RSVP](https://github.com/tildeio/rsvp.js/) promise. The queue will not continue executing until that promise is resolved.