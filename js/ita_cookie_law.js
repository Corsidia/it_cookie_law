var acceptedCookieName = 'cookie_policy_accepted' // puoi cambiarlo col nome che vuoi, sarà il nome del cookie impostato
var cookiePolicyURL = "http://example.com/cookie-policy" // QUESTO DEVE ESSERE IMPOSTATO CORRETTAMENTE!
var infoBannerId = "cookie_info_breve" // Deve essere univoco all'interno della pagina
var acceptButtonId = "cookie_accept_button" // Deve essere univoco all'interno della pagina

var infoText = "Questo sito utilizza i cookie, anche di terze parti: cliccando su 'Chiudi', proseguendo nella navigazione, effettuando lo scroll della pagina o altro tipo di interazione col sito, acconsenti all'utilizzo dei cookie. Per maggiori informazioni o per negare il consenso a tutti o ad alcuni cookie, consulta l'informativa."
var infoLinkText = "Leggi informativa"
var acceptButtonText = "Chiudi"
var divEsternoCSS = "position: fixed; width: 100%; background-color: rgba(0, 0, 0, 0.7); margin: 0px; left: 0px; top: 0px; padding: 10px 0px; z-index: 1000;";
var divInternoCSS = "position: relative; width: 80%; margin: 0px auto;";
var infoTextCSS = "display: block; width: 800px; line-height: 20px; color: rgb(255, 255, 255); font-family: verdana,arial,tahoma,sans-serif; font-size: 12px;";
var infoLinkCSS = "position: absolute; top: 30px; right: 0px; display: block; width: 140px; line-height: 30px; color: rgb(255, 255, 255); text-align: center; font-size: 12px; text-decoration: underline;";
var acceptButtonCSS = "position: absolute; top: 0px; right: 0px; display: block; width: 140px; line-height: 30px; color: rgb(255, 153, 0); text-align: center; font-size: 14px; font-weight: bold; text-decoration: none;";

// Costruttore del banner informativo
var infoBanner = "<div id='"+infoBannerId+"' style='"+divEsternoCSS+"'>" +
                   "<div style='"+divInternoCSS+"'>" +
                     "<span style='"+infoTextCSS+"'>" +
                       infoText +
                     "</span>" +
                     "<a href='"+cookiePolicyURL+"' target='_blank' style='"+infoLinkCSS+"'>"+infoLinkText+"</a>" +
                     "<a href='#' id='"+acceptButtonId+"' style='"+acceptButtonCSS+"'>"+acceptButtonText+"</a>"
                   "</div>" +
                 "</div>";

$(document).ready(function() {
  if (getCookie(acceptedCookieName) === 'true') { 
    optedIn(); // cookie accettati, esegui script
  } else { // cookie non accettati
    optInHandler(); // mostra banner con informativa breve
  }
});

function optInHandler(){
  $('body').append(infoBanner);
  setTimeout(readUserInput, 2000) // aspetta due secondi per dar tempo all'utente di notare il banner
}
function readUserInput(){
  // Accettazione mediante scroll
  var scrolled = false;
  window.onscroll = function(e){
    if (scrolled == false){
      scrolled = true;
      cookieOptIn();
    }
  }
  // Accettazione con click su acceptButton
  $('#'+acceptButtonId).click(function() {
    cookieOptIn();
  });
} 
function cookieOptIn(){
  setCookie(acceptedCookieName, 'true', 1000);
  $('#'+infoBannerId).hide();
  optedIn();
}

function reloadJs(src) {
  src = $('script[src$="' + src + '"]').attr("src");
  $('script[src$="' + src + '"]').remove();
  $('<script/>').attr('src', src).appendTo('body');
}

function optedIn(){
// head scripts with type=text/plain
$("head script[type='text/plain']").each(function(){
  reloadJs($(this).attr('src'));
});

// body script with type=text/plain
$("body script[type='text/plain']").each(function(){
  $(this).attr('type', 'text/javascript'); //cambia il type dello script per renderlo eseguibile
  $.globalEval($(this).html()); //esegui lo script
});

}

// Cookie get, set and delete functions
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
  var expiration = new Date(now.getTime() + parseInt(days)*24*60*60*1000);
  // document.cookie = name + '=' + escape(value) + '; expires=' + expiration.toUTCString() + '; path=/';
  var cString = name + '=' + escape(value) + '; expires=' + expiration.toGMTString() + '; path=/'; 
  document.cookie = cString;
  return cString;
}
function delCookie(name){
  setCookie(name,'',-1);
}