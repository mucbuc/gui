var assert = require( 'assert' )
  , Batch = require( '../src/batch' ).Batch;

assert( Batch !== 'undefined' ); 

testBatch();

function testBatch() {

	var counter = 0;

	testBasicBatch(); 
	testModifyWhileDispatch(); 

	function testModifyWhileDispatch() {
		var batch = new Batch();

		counter = 0; 
		
		batch.include( removeBump );
		batch.include( bump );
		batch.forEach(); 

		assert( counter == 0 );

		function removeBump() { 
			batch.exclude( bump );
		}
	}

	function testBasicBatch() {
		var batch = new Batch();

		counter = 0; 

		batch.include( bump );
		batch.forEach(); 

		assert( counter == 1 );
	}

	function bump() {
		++counter;
	}
}