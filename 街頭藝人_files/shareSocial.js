var shareSocial = {
	url		: window.location.href,
	title	: $( 'title' ).text()
};

function setShareSocialUrl( url )
{
	if ( typeof( url ) != 'undefined' ) shareSocial.url = url;
}

function setShareSocialTitle( title )
{
	if ( typeof( title ) != 'undefined' ) shareSocial.title = title;
}

$(function(){
	
	$( '#shareTwitter' ).attr( 'href', 'javascript:;' ).on( 'click', shareTwitter );
	$( '#shareGoogle' ).attr( 'href', 'javascript:;' ).on( 'click', shareGoogle );
	$( '#shareFacebook' ).attr( 'href', 'javascript:;' ).on( 'click', shareFacebook );
	
	function shareTwitter()
	{
		var shareUrl = shareSocial.title + ' ' + shareSocial.url;
		window.open( 'http://twitter.com/home/?status='.concat(encodeURIComponent(shareUrl)), '_blank', 'height=500,resizable=yes,scrollbars=yes,width=700' );	
	}

	function shareGoogle()
	{
		window.open( 'https://plus.google.com/share?url='.concat(encodeURIComponent(shareSocial.url)), '_blank', 'height=500,resizable=yes,scrollbars=yes,width=700' );
	}
		  
	function shareFacebook()
	{
		window.open( 'http://www.facebook.com/sharer.php?u='.concat(encodeURIComponent(shareSocial.url)).concat('&t=').concat(encodeURIComponent(shareSocial.title)), '_blank', 'height=500,resizable=yes,scrollbars=yes,width=700' );
	}
});