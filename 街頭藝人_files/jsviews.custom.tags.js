$.views.tags({
	
	monthTW	: function( value )
	{
		return moment( value ).format( 'MM月DD日' );
	},
	month	: function( value )
	{
		return moment( value ).format( 'MM/DD' );
	},
	date		: function( value )
	{
		return moment( value ).format( 'YYYY/MM/DD' );
	},
	dateTime	: function( value )
	{
		return moment( value ).format( 'YYYY/MM/DD HH:mm:ss' );
	},
	thumbnailImageUrl : function( value )
	{
		return getUploadImageThumbnailUrl( value );
	}
});