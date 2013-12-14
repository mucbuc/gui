var assert = require( 'assert' )
  , Batch = require( '../src/batch' ).Batch;

assert( Batch !== 'undefined' ); 

testBatch();

function testBatch() {

	var counter = 0;

	process.setMaxListeners( 0 );

	test( basicBatch );
	test( removeWhileTraverse );
	test( addWhileTravese );

	function addWhileTravese() {
		var batch = new Batch();

		counter = 0;

		batch.include( addBump );
		batch.forEach();

		assert( counter == 1 );

		function addBump() {
			batch.include( bump );
			++counter;
		}
	}

	function removeWhileTraverse() {
		var batch = new Batch();

		counter = 0; 
		
		batch.include( removeBump );
		batch.include( bump );
		batch.forEach(); 

		assert( counter == 1);

		function removeBump() { 
			batch.exclude( bump );
			++counter;
		}
	}

	function basicBatch() {
		var batch = new Batch();

		counter = 0; 

		batch.include( bump );
		batch.forEach(); 

		assert( counter == 1 );
	}

	function bump() {
		++counter;
	}

	function test( f ) {
		f();
		process.once( 'exit', function() {
			console.log( f.name + ' passed' );
		} );
	}

}