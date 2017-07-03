var CMS = 
{	
	cmsSiteMapPath : function( publishName, publishUrl )
	{
		CMS.configurationSiteMapPath( publishName, CMS.combineSiteMapPath( CMS_URL.CMS, publishUrl ) );
	},
	embedVideoSiteMapPath : function( publishName, publishUrl )
	{	
		CMS.configurationSiteMapPath( publishName, CMS.combineSiteMapPath( CMS_URL.VIDEO, publishUrl ) );
	},
	combineSiteMapPath : function( urlPrefix, publishUrl )
	{
		if ( typeof( urlPrefix ) == 'undefined' ) return undefined;
		if ( typeof( publishUrl ) == 'undefined' ) return undefined;
		
		return '/'+domainName+urlPrefix + '/' + publishUrl;
	},
	configurationSiteMapPath : function( publishName, pathUrl )
	{	
		var $siteMapArea = $( '#siteMapArea' );
		
		if ( typeof( pathUrl ) == 'undefined' || typeof( publishName ) == 'undefined' ) 
		{
			$siteMapArea.remove();
		}
		else
		{
			var $siteMapPath = $( 'a.pathlink:eq(1)', $siteMapArea );
			
			$siteMapPath.attr( 'href', pathUrl );
			$siteMapPath.attr( 'title', publishName );
			$siteMapPath.empty().append( publishName ).show();
		}
	},
	incrementHit : function( cmsListEntity )
	{
		if ( typeof( cmsListEntity ) == 'undefined' ) return;
		
		if ( !cmsListEntity.isHit )
		{
		    $.ajax({
		        type		: 'GET',
		        url			: '/'+domainName+'/incrementHit/' + cmsListEntity.publishUrl + '/' + cmsListEntity.contentId,
		        data		: {},
		        dataType	: 'json',
		        success		: function( success )
		        {  
//		        	console.info( JSON.stringify( success ) );
		        	
		        	cmsListEntity.isHit = true;
		        },
		        error		: function( error )
		        {
		        	console.error( JSON.stringify( error ) );
		        }
		    }).always( function() {
		    	
		    });
		}
	}
};