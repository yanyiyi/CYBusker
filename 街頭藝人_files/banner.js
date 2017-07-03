$(function(){
	
    $.ajax({
        type		: 'GET',
        url			: '/'+domainName+CMS_URL.BANNER + '/' + bannerPublishUrl,
        data		: {},
        dataType	: 'json',
		beforeSend: function (xhr) 
		{
			// $( 'div.banner' ).mask( bannerPublishName + ' 讀取中，請稍後…' );
		},
        success		: function( success )
        {
//        	console.info( JSON.stringify( success ) );

        	if ( success.length === 0 ) return;

			success.forEach(function(element, index, array){
				var image = element.attachmentEntity;
				if(index == 0){
					$('#indicator').append('<li class="active" data-target="#myCarousel" data-slide-to="' + index + '"></li>');
					$('#bannerList').append('<div class="item active"><a href="' + element.provideLink + '" target="_blank"><img src="' + image.saveSite + image.saveUrl + image.name + '.' + image.extName + '"></a></div>');

				}else {
					$('#indicator').append('<li data-target="#myCarousel" data-slide-to="' + index + '"></li>');
					$('#bannerList').append('<div class="item"><a href="' + element.provideLink + '" target="_blank"><img src="' + image.saveSite + image.saveUrl + image.name + '.' + image.extName + '"></a></div>');
				}
			});
			
        	// var data = success[0];
        	// var image = data.attachmentEntity;
        	//
        	// var $banner = $( '#banner' );
        	
            // $banner.attr( 'src', image.saveUrl + image.originalFileName ).attr( 'alt', data.title ).attr( 'title', data.title );
            //
            // if ( data.provideLink.length > 0 )
			// {
			// 	switch ( data.openType )
			// 	{
			// 		case 0:
			// 			$banner.wrap( '<a href="' + data.provideLink + '" target="_self"></a>'  );
			// 			break;
			// 		case 1:
			// 			$banner.wrap( '<a href="' + data.provideLink + '" target="_blank"></a>'  );
			// 			break;
			// 		default :
			// 			$banner.wrap( '<a href="javascript:;"></a>' ).bind( 'click', function(){
			// 				newWindow( data.provideLink, 805, 645, data.content );
			// 			});
			// 	}
			// }
        },
        error		: function( error )
        {
        	console.error( JSON.stringify( error ) );
        	
        	showErrorAlert( bannerPublishName + ' 讀取失敗' );
        },
		complete	: function( jqXHR, textStatus )
	    {
	       	$( 'div.banner' ).unmask();
	    }
    });
});

function newWindow(url, w, h,title)
{
	window.open( url, title,  config='height='+h+',width='+w+', toolbar=no, location=no, scrollbars=no, resizable=no, menubar=no, status=no');
}
