$.views.tags( 'bulletinDetailUrl', function( value ){
	return [ '/',domainName,CMS_URL.CMS, '/', bulletinPublishUrl, '/', value ].join('');
});

$(function(){
	
	$( '#indexNewsTitle' ).empty().append( bulletinPublishName );
	

    $( '#bulletinNext' ).on( 'click', function( event ){
		console.log('/'+domainName+CMS_URL.CMS + '/' + bulletinPublishUrl);
    	$(location).attr( 'href', '/'+domainName+CMS_URL.CMS + '/' + bulletinPublishUrl );
    });

    $.ajax({
        type		: 'GET',
        url			: '/'+domainName+CMS_URL.CMS_LIST + '/' + bulletinPublishUrl + '/5',
        data		: {},
        dataType	: 'json',
		beforeSend: function (xhr) 
		{
			$( 'div.news' ).mask( bulletinPublishName + ' 讀取中，請稍後…' );
		},
        success		: function( success )
        {  
//        	console.info( JSON.stringify( success ) );
        	
        	var template = $.templates( '#bulletinTmpl' );
        	
        	template.link( '#bulletinResult', success );
        },
        error		: function( error )
        {
        	console.error( JSON.stringify( error ) );
        	
        	showErrorAlert( bulletinPublishName + ' 讀取失敗' );
        },
		complete	: function( jqXHR, textStatus )
	    {
	       	$( 'div.news' ).unmask();
	    }
    });
});