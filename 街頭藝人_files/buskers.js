$.views.tags( 'buskersDetailUrl', function( value ){
	return [ '/'+domainName+'/performer/detail?performerId=', value ].join('');
});

$(function(){
	
    $( '#buskersNext' ).on( 'click', function( event ){
    	
    	$(location).attr( 'href', '/'+domainName+'/performer/list' );
    });
	
	var url = '/'+domainName+'/performer/findAll';
	var data = { 'pageIndex' : 1, 'pageSize' : 8, 'isRandom': true };
	
    $.ajax({
        type		: 'GET',
        url			: url,
        data		: data,
        dataType	: 'json',
		beforeSend: function (xhr) 
		{
			$( 'div.buskers' ).mask( 'BUSKERS 讀取中，請稍後…' );
		},
        success		: function( success )
        {  
//        	console.info( JSON.stringify( success ) );
        	
        	var template = $.templates( '#buskersTmpl' );
        	
        	template.link( '#buskersResult', success );
        },
        error		: function( error )
        {
        	console.error( JSON.stringify( error ) );
        	
        	showErrorAlert( 'BUSKERS 讀取失敗' );
        },
		complete	: function( jqXHR, textStatus )
	    {
	       	$( 'div.buskers' ).unmask();
	    }
    });
});