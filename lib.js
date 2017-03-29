'use strict';

let dependencies = {
	sources: [
		'javascripts/lib/jsbag/lib/core.js',
		'javascripts/lib/jsbag/lib/vec.js',
		'javascripts/lib/jsbag/lib/rect.js',
		'javascripts/lib/jsbag/lib/canvas.js',
		'javascripts/lib/events/src/batch.js',
		'javascripts/lib/events/src/emitter.js',
		'javascripts/lib/events/src/queue.js',
		'javascripts/lib/events/src/stream.js'
	],
	index: 0
};

let EventStream;

let scripts = {
	sources: [
		'javascripts/lib/gui/lib/controller.js',
		'javascripts/lib/gui/lib/factory.js',
		'javascripts/lib/gui/lib/builder.js',
		'javascripts/lib/gui/lib/element.js',
		'javascripts/lib/gui/lib/view.js',
		'javascripts/lib/gui/lib/gui.js',

		'javascripts/lib/gui/lib/elements/clickrect.js',
		'javascripts/lib/gui/lib/elements/label.js',
		'javascripts/lib/gui/lib/elements/icon.js',
		'javascripts/lib/gui/lib/elements/frame.js',
		'javascripts/lib/gui/lib/elements/textbox.js',
		'javascripts/lib/gui/lib/elements/checkbox.js',

		'javascripts/lib/gui/lib/views/stack.js',
		'javascripts/lib/gui/lib/views/button.js',
		'javascripts/lib/gui/lib/views/row.js',
		'javascripts/lib/gui/lib/views/debug.js',
		'javascripts/lib/gui/lib/views/pretty.js' 
	],
	index: 0
}

loadContext( dependencies )
.then( () => {
	EventStream = Stream;

	loadContext( scripts );
});

function loadContext(context) {
	return new Promise( (resolve, reject) => {
		const sources = context.sources;
		let index = context.index;

		loadScripts();

		function loadScripts() {

			if (index != sources.length) {
				loadScript( sources[index++] );
			}
			else {
				resolve();
			}

			function loadScript(src) {

				let script = document.createElement( 'script' );
				document.head.appendChild(script);

				script.onload = loadScripts;
				script.src = src;
			}
		}
	} );
}