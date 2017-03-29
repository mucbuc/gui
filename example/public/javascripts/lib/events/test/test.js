var cp = require( 'child_process' );

cp.fork( './batch' );
cp.fork( './emitter' );
cp.fork( './queue' );
cp.fork( './stream' );
