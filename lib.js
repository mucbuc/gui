'use strict';

let dependencies = {
	sources: [
		'node_modules/mucbuc-jsbag/lib/core.js',
		'node_modules/mucbuc-jsbag/lib/vec.js',
		'node_modules/mucbuc-jsbag/lib/rect.js',
		'node_modules/mucbuc-jsbag/lib/canvas.js',
		'node_modules/mucbuc-events/src/batch.js',
		'node_modules/mucbuc-events/src/emitter.js',
		'node_modules/mucbuc-events/src/queue.js',
		'node_modules/mucbuc-events/src/stream.js'
	],
	index: 0
};

let EventStream;

let scripts = {
	sources: [
		'lib/controller.js',
		'lib/factory.js',
		'lib/builder.js',
		'lib/element.js',
		'lib/view.js',
		'lib/gui.js',

		'lib/elements/clickrect.js',
		'lib/elements/label.js',
		'lib/elements/icon.js',
		'lib/elements/frame.js',
		'lib/elements/textbox.js',
		'lib/elements/checkbox.js',

		'lib/views/stack.js',
		'lib/views/button.js',
		'lib/views/row.js',
		'lib/views/debug.js',
		'lib/views/pretty.js' 
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