/**
 * Anywhere on the page, you can do the following to queue commands that will
 * be executed by jazz whenever the embed snippet is evaluated and the program
 * has been loaded by the interpreter.
 */
__saq = __saq || function() { (__saq.q = __saq.q || []).push(arguments); };
__saq('bind-click-events');
__saq('show-modal');


/**
 * The following modular form works as well, depending on your JavaScript style
 */
(function(w, q) {
	w[q] = w[q] || function() { (w[q].q = w[q].q || []).push(arguments); };
	w[q]('bind-click-events');
	w[q]('show-modal');
})(window, '__saq');
