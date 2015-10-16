function getCookies(){
  var cookies = {};
  var all = document.cookie; // Get all cookies in one big string
  if (all === "")
    return cookies;
  var list = all.split("; ")
  for (var i=0; i<list.length; i++) {
    var cookie = list[i]
    var p = cookie.indexOf("=");
    var name = cookie.substring(0,p);
    var value = cookie.substring(p+1);
    value = decodeURIComponent(value);
    cookies[name] = value;
  }
  return cookies;
}

function getCookie(name){
  var cookies = getCookies();
  return cookies[name];
}

function setCookie(name, value, days){
  var now = new Date();
  var expiration = new Date(now.getTime() + parseInt(days)*60*60*1000);
  // document.cookie = name + '=' + escape(value) + '; expires=' + expiration.toUTCString() + '; path=/';
  var cString = name + '=' + escape(value) + '; expires=' + expiration.toGMTString() + '; path=/'; 
  document.cookie = cString;
  return cString;
}

function delCookie(name){
  setCookie(name,'',-1);
}

$(document).ready(function() {
  if (getCookie('nemboweb_cookies_accepted') === 'true') {
    $("[type='text/plain']").each(function(){
      $(this).attr('type', 'text/javascript'); //cambia il type dello script per renderlo eseguibile
      $.globalEval($(this).html()); //esegui lo script
    });
  }
});