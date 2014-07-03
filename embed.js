
/**
 * Run ./build.py after you change this file to make a minified version of it,
 * but be sure to test it afterwards.
 */

(function(d, w, q, campaignID)
{
	// Check to see if the queue shim is already installed
	if (w[q] && w[q]['q'])
	{
		// If so put the init event at the front of the queue
		(function() { w[q]['q'].unshift(arguments); })('init', campaignID);
	} else {
		// If its not there, or non conformant, install a new queue
		w[q] = function() { (w[q]['q'] = w[q]['q'] || []).push(arguments); };
		// Push init
		w[q]('init', campaignID);
	}

	// Create the script element and get the first script on the page
	var script = d.createElement('script');
	var above = d.getElementsByTagName('script')[0];

	// We embrace asynchronicity and older browsers will silently ignore this
	script.async = true;

	// The URL of the jazz version you'd like to embed
	script.src = 'https://static-dev.sojo.com/jazz/jazz.min.js';

	// Insert and evaluate the JS on the page
	above.parentNode.insertBefore(script, above);

// Finally, invoke the function with the last param being
})(document, window, '__saq', 'a18251e0-259a-486a-bc71-69b43ab032e6');
