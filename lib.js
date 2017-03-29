'use strict';

let dependencies = {
	sources: [
		'../node_modules/mucbuc-jsbag/lib/core.js',
		'../node_modules/mucbuc-jsbag/lib/vec.js',
		'../node_modules/mucbuc-jsbag/lib/rect.js',
		'../node_modules/mucbuc-jsbag/lib/canvas.js',
		'../node_modules/mucbuc-events/src/batch.js',
		'../node_modules/mucbuc-events/src/emitter.js',
		'../node_modules/mucbuc-events/src/queue.js',
		'../node_modules/mucbuc-events/src/stream.js'
	],
	index: 0
};

let scripts = {
	sources: [
		'../node_modules/mucbuc-gui/lib/controller.js',
		'../node_modules/mucbuc-gui/lib/factory.js',
		'../node_modules/mucbuc-gui/lib/builder.js',
		'../node_modules/mucbuc-gui/lib/element.js',
		'../node_modules/mucbuc-gui/lib/view.js',
		'../node_modules/mucbuc-gui/lib/gui.js',

		'../node_modules/mucbuc-gui/lib/elements/clickrect.js',
		'../node_modules/mucbuc-gui/lib/elements/label.js',
		'../node_modules/mucbuc-gui/lib/elements/icon.js',
		'../node_modules/mucbuc-gui/lib/elements/frame.js',
		'../node_modules/mucbuc-gui/lib/elements/textbox.js',
		'../node_modules/mucbuc-gui/lib/elements/checkbox.js',

		'../node_modules/mucbuc-gui/lib/views/stack.js',
		'../node_modules/mucbuc-gui/lib/views/button.js',
		'../node_modules/mucbuc-gui/lib/views/row.js',
		'../node_modules/mucbuc-gui/lib/views/debug.js',
		'../node_modules/mucbuc-gui/lib/views/pretty.js' 
	],
	index: 0
}

loadContext( dependencies, () => {
	loadContext( scripts );
});

function loadContext(context, cb) {
	const sources = context.sources;
	let index = context.index;

	loadScripts();

	function loadScripts() {

		if (index != sources.length) {
			loadScript( sources[index++] );
		}
		else if (typeof cb === 'function') {
			cb();
		}

		function loadScript(src) {

			let script = document.createElement( 'script' );
			document.head.appendChild(script);

			script.onload = loadScripts;
			script.src = src;
		}
	}
}