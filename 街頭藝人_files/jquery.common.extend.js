/**
 * jquery 擴展功能
 * 
 */
( function( $ ){
    $.fn.extend({
        outerHtml   : function(){
            return $( '<div>' ).append( this.clone() ).remove().html();
        },
        tagHtml     : function(){
            return $( '<div>' ).append( this.clone().empty() ).remove().html();
        }
    });
})( jQuery );

/**
 * 判斷字串開頭是否為指定的字
 * 回傳: bool
 * 
 */
String.prototype.startsWith = function( prefix )
{
  return ( this.substr( 0, prefix.length ) === prefix );
}

/**
 * 判斷字串結尾是否為指定的字
 * 回傳: bool
 * 
 */
String.prototype.endsWith = function( suffix )
{
  return ( this.substr( this.length - suffix.length ) === suffix);
}

/**
 * 判斷字串是否包含指定的字
 * 回傳: bool
 * 
 */
String.prototype.contains = function( txt )
{
  return ( this.indexOf( txt ) >= 0 );
}
