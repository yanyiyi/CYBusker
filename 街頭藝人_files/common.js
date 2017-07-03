/**
 * 開啟檔案上傳元件
 * 
 * @param selector
 * @param uploadType
 * @param isSingle
 * @param callbackFunction
 * @param title
 * @returns {BootstrapDialog}
 */
function showFileUploadDialog( selector, uploadType, isSingle, callbackFunction, title )
{
	if ( $.type( title ) == 'undefined' ) title = '';
	
    var fileUploadDialog  = new BootstrapDialog({
    	size		: BootstrapDialog.SIZE_WIDE,
        title		: title,
        animate		: false,
        draggable	: true,
        closable	: false,
        message		: $( selector ).load( '/common/uploadView?type=' + uploadType + '&isSingle='+isSingle),
        buttons		: [{
            label	: '取消',
            action	: function( dialogItself )
            {
            	dialogItself.close();
            },
            cssClass: 'btn btn-default'
        }, {
            label	: '儲存',
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
            },
            cssClass: 'btn btn-primary'
        }]
    });
    
    fileUploadDialog.realize();
    fileUploadDialog.open();
    
    if ( title == '' ) fileUploadDialog.getModalHeader().hide();
    else fileUploadDialog.getModalHeader().children( 'div.bootstrap-dialog-header' ).children( 'div.bootstrap-dialog-close-button' ).attr( 'style', 'display: none' );
    
    return fileUploadDialog;
}

/**
 * 根據上傳檔案回傳物件, 回傳檔案連結
 * 
 * @param uploadfile
 * @param urlAttribute
 * @returns
 */
function getUploadFileUrl( uploadfile, urlAttribute )
{
	if ( typeof( urlAttribute ) === 'undefined' ) urlAttribute = 'urlShort';
	
	try
	{
		var fileUrl = [ uploadfile[urlAttribute], uploadfile.filename, '.', uploadfile.ext_name ].join('');
		
		console.log( 'fileUrl: ', fileUrl );
		
		return fileUrl;
	}
	catch( error )
	{
		console.error( error );
	}
}

/**
 * 根據上傳圖檔原始連結 or 物件, 回傳檔案名稱
 * 
 * @param file
 * @returns
 */
function getUploadFileName( file )
{
	if ( typeof( file ) === 'undefined' ) return '';
	
	if ( typeof( file ) === 'object' )
	{
		var fileUrl = getUploadFileUrl( image );
		
		return getUploadFileName( fileUrl );
	}
	
	if ( typeof( file ) === 'string' )
	{
		var index = file.lastIndexOf( '/' );
		
		if ( index < 0 ) return file;
		
		var fileName = file.substring( index + 1, file.length );
		
//		console.log( fileName );
		
		return fileName;
	}
}

/**
 * 根據上傳圖檔原始連結 or 物件, 回傳縮圖連結
 * 
 * @param image
 * @returns
 */
function getUploadImageThumbnailUrl( image )
{
	if ( typeof( image ) === 'undefined' ) return '';
	
	if ( typeof( image ) === 'object' )
	{
		var fileUrl = getUploadFileUrl( image );
		
		return getUploadImageThumbnailUrl( fileUrl );
	}
	
	if ( typeof( image ) === 'string' )
	{
		var index = image.lastIndexOf( '.' );
		
		if ( index < 0 ) return image;
		
		var keyword = '_thn.png';
		
		if ( image.lastIndexOf( keyword ) > -1 ) return image;
		
		var uploadImageThumbnailUrl = image.substring( 0, index ) + keyword;
		
//		console.log( uploadImageThumbnailUrl );
		
		return uploadImageThumbnailUrl;
	}
}

/**
 * 取得資料列表中已選取的資料
 * 
 * @param tableSelector
 * @returns
 */
function getTableListSelections( tableSelector )
{
	if ( typeof( tableSelector ) === 'undefined' ) tableSelector = '#table';
	
	return $( tableSelector ).bootstrapTable( 'getSelections' );
}

function modifyPpl( vo ){
	var list=['建檔人員', '建檔單位', '建檔日期', '異動人員', '異動單位', '異動日期'];
	for(var i=0; i<list.length; i++){
		var first = $('<div class="col-md-4 col-sm-12 col-xs-12"/>');
		var title = $('<div class="col-md-4 col-sm-6 col-xs-6 title"/>');
		title.text(list[i]);
		var data = $('<div class="col-md-8 col-sm-6 col-xs-6 cont"/>');
		first.append(title);
		first.append(data)
		$('#modifylist').append(first);
	}
	
	if ( typeof( vo ) === 'object' )
	{
		$('.cont:eq(0)').append(vo['creator']);
		$('.cont:eq(1)').append(vo['creatorDepartment']);
		$('.cont:eq(2)').append(vo['createDateStr']);
		$('.cont:eq(3)').append(vo['modifier']);
		$('.cont:eq(4)').append(vo['modifierDepartment']);
		$('.cont:eq(5)').append(vo['modifyDateStr']);
	}
}

// 權限控管

var List=function(data){
	this.data=data;

}

List.renderList= function(lists){
	var list=[] ,snd=[], file=lists.fields, $leftside=lists.menuOption,
		$rightside='';
	var l=new List();
	if($leftside){
		$.each($leftside, function(){
			if(!this.url){
				list.push(l.firstLayer(this, file));

				console.log(this)
			}else {
				snd.push(l.secondLayer(this, file));
			}
		});


		$.merge(list, snd);
		$.each(list, function(i, val){
			$(val).appendTo('#menulistLeft');
		})
	}
	while (list.length || snd.length) { list.pop(); snd.pop();}

	if($rightside){
		if($rightside == '')	$('<div class="dd-empty"></div>').appendTo('#menulistRight');
		else{
			$.each($rightside, function(){
				list = (l.firstLayer(this, file));
				if(this.menu){
					$.each(this.menu, function(){
						var sub=l.secondLayer(this, file);
						snd =($('<ol></ol>').append(sub));
						$(snd).appendTo($(list));
						$(list).addClass('dd-list');
					})
				}
				$(list).appendTo($('#menulistRight').children('ol'));
			})
		}
	}else $('<div class="dd-empty"></div>').appendTo('#menulistRight');
}
List.prototype.dataField=function(text, node, data){
	for(var i=0; i < data.length; i++){
		node.attr('data-'+data[i], text[data[i]]);
	}
	return true;
}
List.prototype.firstLayer=function(data, fields){
	var $sp=$('<span class="glyphicon glyphicon-remove-circle"></span>'), $li=$('<li></li>');
	$li.append($('<a></a>', {
		class: 'dd-action pull-right delbtn',
		href: '#',
		'data-action': 'remove',
		title: 'remove'
	}).append($sp))
		.append($('<div></div>',{
			class: 'dd-handle dd3-handle',
			text: 'DragHere'
		})).append($('<div></div>',{
			class: 'dd3-content blue',
			text: data.displayName
		})).addClass('dd-item dd3-item');
	if(fields){
		this.dataField(data, $li, fields)
	}
	return $li;
}
List.prototype.secondLayer=function(data, fields){
	var $sp=$('<span class="glyphicon glyphicon-remove-circle"></span>'), $li=$('<li></li>');
	$li.append($('<a></a>', {
		class: 'dd-action pull-right delbtn',
		href: '#',
		'data-action': 'remove',
		title: 'remove'
	}).append($sp))
		.append($('<div></div>',{
			class: 'dd-handle dd3-handle',
			text: 'DragHere'
		})).append($('<div></div>',{
			class: 'dd3-content skyblue',
			text: data.displayName
		})).addClass('dd-item dd3-item dd-nonest');
	if(fields){
		this.dataField(data, $li, fields)
	}
	return $li;
}