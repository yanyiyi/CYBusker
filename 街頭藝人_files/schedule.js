$(function(){
	
	var url = '/frontend/schedule/findAll';
	var data = {};
	
    $.ajax({
        type		: 'GET',
        url			: url,
        data		: data,
        dataType	: 'json',
		beforeSend: function (xhr) 
		{
			$( '#storyResult' ).mask( '考照行事曆 讀取中，請稍後…' );
		},
        success		: function( success )
        {  
//        	console.info( JSON.stringify( success ) );
        	
        	var template = $.templates( '#scheduleTmpl' );
        	var templateMobile = $.templates( '#scheduleMobileTmpl' );
        	
        	template.link( '#scheduleResult', success );
        	templateMobile.link( '#scheduleMobileResult', success );
        },
        error		: function( error )
        {
        	console.error( JSON.stringify( error ) );
        	
        	showErrorAlert( '考照行事曆 讀取失敗' );
        },
		complete	: function( jqXHR, textStatus )
	    {
	       	$( '#storyResult' ).unmask();
	    }
    });
});