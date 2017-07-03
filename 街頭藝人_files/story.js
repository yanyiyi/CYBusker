$.views.tags( 'storyDescription', function( value ){
	return value.substring(0,100) + '....';
});

$.views.tags( 'storyDetailUrl', function( value ){
	return [ '/',domainName,CMS_URL.CMS, '/', storyPublishUrl, '/', value ].join('');
});

$(function(){
	
	var url = '/'+domainName+'/story/' + storyPublishUrl;
	var data = {};
	
    $.ajax({
        type		: 'GET',
        url			: url,
        data		: data,
        dataType	: 'json',
		beforeSend: function (xhr) 
		{
			$( '#storyResult' ).mask( storyPublishName + ' 讀取中，請稍後…' );
		},
        success		: function( success )
        {  
//        	console.info( JSON.stringify( success ) );
        	
        	var list = success.list;
        	
        	var template = $.templates( '#storyTmpl' );
        	
        	template.link( '#storyResult', list );
        },
        error		: function( error )
        {
        	console.error( JSON.stringify( error ) );
        	
        	showErrorAlert( storyPublishName + ' 讀取失敗' );
        },
		complete	: function( jqXHR, textStatus )
	    {
	       	$( '#storyResult' ).unmask();
	    }
    });
});
