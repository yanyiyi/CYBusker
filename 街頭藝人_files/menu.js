$(function(){
	
	var menu = menuJson[0].menu;
	
	var topTemplate = $.templates( '#topMenuTmpl' );
	var bottomTemplate = $.templates( '#bottomMenuTmpl' );
	
	topTemplate.link( '#topMenuResult', menu );
	bottomTemplate.link( '#bottomMenuResult', { 'menus' : menu } );
});