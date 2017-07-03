var CMS_URL = 
{	
	CMS 		: '/cms',
	CMS_PREVIEW : '/cms/preview',
	CMS_LIST	: '/cmsList',
	CMS_DATA	: '/cmsData',
	VIDEO 		: '/embedVideo',
	VIDEO_LIST	: '/embedVideoList',
	FOOTER 		: '/footer',
	BANNER		: '/banner'
};

var CMS_TOOLS = 
{	
	/**
	 * 取得民國日期
	 * 
	 * @param value
	 * @param format
	 * @returns
	 */
	convertRocDate : function( value, format )
	{	
		if ( $.type( value ) != 'number' ) return;
		
		if ( typeof( format ) == 'undefined' ) format = 'YYYY/MM/DD';
		
		var year = moment( value ).get( 'year' ) - 1911;
		var month = moment( value ).get( 'month' );
		var date = moment( value ).get( 'date' );
		var hour = moment( value ).get( 'hour' );
		var minute = moment( value ).get( 'minute' );
		var second = moment( value ).get( 'second' );
		var millisecond = moment( value ).get( 'millisecond' );
		
	    return [
				moment()
				.set({ 'year' : year, 'month' : month, 'date' : date, 'hour' : hour, 'minute' : minute, 'second' : second, 'millisecond' : millisecond } )
				.format( format )
	    ].join('').slice( 1 );
	},
	
	/**
	 * 檢測現在時間是否在起訖日期中
	 * 
	 * @param startDate
	 * @param endDate
	 * @returns {Number}, 0: 不在起訖日期中 / 1: 在起訖日期中
	 */
	detectPublishDate : function( startDate, endDate )
	{
		var status = 0;	
		var resultStart = 0;
		var resultEnd = 0;
		
		if ( $.type( startDate ) == 'number' )
		{
			resultStart = moment( moment().format( 'YYYY-MM-DD' ) ).diff( moment( startDate ), 'days' );
		}
		
		if ( $.type( endDate ) == 'number' )
		{
			resultEnd = moment( endDate ).diff( moment( moment().format( 'YYYY-MM-DD' ) ), 'days' );
		}
		
//		console.log( 'resultStart: %s, resultEnd: %s', resultStart, resultEnd );
		
		if ( resultStart >= 0 && resultEnd >= 0 ) 
		{
			status = 1;
		}
		
		return status;
	}
};
