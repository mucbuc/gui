'use strict';

const path = require( 'path' );

function requireLibFile(file) {
  return require( path.join( __dirname, '../lib', file ) );
}
 
module.exports = {
	requireLibFile
};