BootstrapDialog.DEFAULT_TEXTS['OK'] = '確定';
BootstrapDialog.DEFAULT_TEXTS['CANCEL'] = '取消';

function showDataDialog( selector, url, data, closeId, callbackFunction, closeLabel, title, closable )
{
	if ( $.type( closeId ) === 'undefined' ) closeId = '';
	if ( $.type( title ) === 'undefined' ) title = '';
	if ( $.type( closeLabel ) === 'undefined' ) closeLabel = '';
	if ( $.type( closable ) === 'undefined' ) closable = true;
	
	var showDialog = BootstrapDialog.show({
		size		: BootstrapDialog.SIZE_WIDE,
		title		: title,
		animate		: false,
		draggable	: true,
		closable	: closable,
		data 		: data,
		message		: $( selector ).load( url, function( response, status, xhr ){
			
			detectLoginTimeout( xhr );
		}),
		buttons		: [{
			id		: closeId,
	        label	: closeLabel,
	        action	: function( dialogItself )
	        {
	        	if ( $.type( callbackFunction ) == 'function' )
	    		{
	        		callbackFunction.apply( this, [ dialogItself ] );
	    		}
	        	else
        		{
	        		dialogItself.close();
        		}
	        }
    	}]
	});
	
	if ( title == '' ) showDialog.getModalHeader().hide();
	if ( closeLabel == '' ) showDialog.getModalFooter().hide();
	
	return showDialog;
}

/**
 * 開啟視窗(點空白處自動關閉:OFF)
 * 
 * @param selector
 * @param url
 * @param closeId
 * @param callbackFunction
 * @param closeLabel
 * @param title
 * @returns
 */
function showTopDialog( selector, url, closeId, callbackFunction, closeLabel, title )
{
	return showDataDialog( selector, url, {}, closeId, callbackFunction, closeLabel, title, false );
}

/**
 * 開啟視窗(點空白處自動關閉:ON)
 * 
 * @param selector
 * @param url
 * @param closeId
 * @param callbackFunction
 * @param closeLabel
 * @param title
 * @returns
 */
function showDialog( selector, url, closeId, callbackFunction, closeLabel, title )
{
	return showDataDialog( selector, url, {}, closeId, callbackFunction, closeLabel, title );
}

/**
 * 開啟確認視窗
 * 
 * @param message
 * @param callbackFunction
 * @param parameter
 */
function showConfirm( message, callbackFunction, parameter )
{
//	console.log( 'parameter: ', $.type( parameter ) );
//	console.log( 'callbackFunction: ', $.type( callbackFunction ) );
	
	if ( $.type( parameter ) == 'undefined' ) parameter = [];
	else parameter = [ parameter ];
	
    BootstrapDialog.confirm({
        title		: '確認訊息',
        message		: message,
//        closable	: true,
        draggable	: true,
        animate		: false,
        callback	: function( result )
        {
        	var resultArray = [ result ];
        	
        	resultArray = resultArray.concat( parameter );
        	
        	if ( $.type( callbackFunction ) == 'function' )
    		{
        		callbackFunction.apply( this, resultArray );
    		}
        }
    });
}

/**
 * 開啟通知視窗
 * 
 * @param message
 * @param callbackFunction
 * @param parameter
 * @param type
 */
function showAlert( message, callbackFunction, parameter, type )
{
	if ( $.type( message ) == 'undefined' ) message = '';
	
	if ( message.length == 0 ) return;
	
	if ( $.type( parameter ) == 'undefined' ) parameter = [];
	else parameter = [ parameter ];
	
	if ( $.type( type ) == 'undefined' ) type = BootstrapDialog.TYPE_PRIMARY;
	
    BootstrapDialog.alert({
    	type		: type,
        title		: '系統訊息',
        message		: message,
//        closable	: true,
        draggable	: true,
        animate		: false,
        callback	: function( result ) 
        {
        	var resultArray = [];
        	
        	resultArray = resultArray.concat( parameter );
        	
        	if ( $.type( callbackFunction ) == 'function' )
    		{
        		callbackFunction.apply( this, resultArray );
    		}
        }
    });
}

/**
 * 開啟通知視窗(成功)
 * 
 * @param message
 * @param callbackFunction
 * @param parameter
 */
function showSuccessAlert( message, callbackFunction, parameter )
{
	showAlert( message, callbackFunction, parameter, BootstrapDialog.TYPE_SUCCESS );
}

/**
 * 開啟通知視窗(警告)
 * 
 * @param message
 * @param callbackFunction
 * @param parameter
 */
function showWarningAlert( message, callbackFunction, parameter )
{
	showAlert( message, callbackFunction, parameter, BootstrapDialog.TYPE_WARNING );
}

/**
 * 開啟通知視窗(錯誤)
 * 
 * @param message
 * @param callbackFunction
 * @param parameter
 */
function showErrorAlert( message, callbackFunction, parameter )
{
	showAlert( message, callbackFunction, parameter, BootstrapDialog.TYPE_DANGER );
}
