/* IT_COOKIE_LAW.js v.1.1b
* Plugin che permette di adempiere alla normativa europea sui Cookie così come
* receptia dallo Stato Italiano.
* Per funzionare necessita di jQuery v.1
* Autori: Duccio Armenise e Marta Petrella (http://NemboWeb.com), Antonio Porcelli (https://progressify.dev)
* Maggiori info:
** https://github.com/NemboWeb/it_cookie_law (repository online)
** http://nemboweb.com/blog/didattica/cookie-law-vademecum (cookie law vademecum)
* Il codice è molto semplice, breve e ben commentato,
* ti raccomandiamo vivamente di leggerlo e comprenderne il funzionamento.
* LE PRIME VARIABILI SONO DA IMPOSTARE SECONDO LE TUE ESIGENZE!
*/

// QUESTO URL DEVE ESSERE QUELLO DELLA TUA Cookie policy (Informativa Estesa) sul TUO sito!
var cookiePolicyURL = "http://example.com/cookie-policy";

// Nome del cookie impostato. Puoi cambiarlo a tuo piecere.
var acceptedCookieName = 'cookie_policy_accepted';
var deniedCookieName = 'cookie_policy_denied';

// Durata del cookie in giorni
var acceptedCookieLife = 3000;

// Deve essere univoco all'interno della pagina
var infoBannerId = "cookie_info_breve";

// Deve essere univoco all'interno della pagina
var acceptButtonId = "cookie_accept_button";
var denyButtonId = "cookie_deny_button";

// Se impostata a true aggiorna la pagina dopo che l'utente ha dato il consenso
var refreshAfterOptIn = false;

// testi dei pulsanti
var acceptButtonText = "Chiudi";
var infoLinkText = "Leggi informativa";

// Stili CSS degli elementi
var divEsternoCSS = "background-color: rgba(0, 0, 0, 0.7); font-size: 0.8em; font-family: verdana,arial,tahoma,sans-serif; padding: 1em 0px; margin: 0px; width: 100%; position: fixed; left: 0px; top: 0px; z-index: 999999;";
var divInternoCSS = "margin: 0px auto; width: 80%; position: relative;";
var divInfoTextCSS = "color: rgb(255, 255, 255); display: block; float:left; width: 70%; line-height: 1.5em;";
var divButtonsCSS = "color: rgb(255, 255, 255); display:block; float:right; block; width: 25%; text-align: right; line-height: 1.2em;";
var acceptButtonCSS = "color: rgb(255, 153, 0); font-size: 1.1em; font-weight: bold; text-decoration: none; display: block; margin-bottom:1em;";
var infoLinkCSS = "color: rgb(255, 255, 255); text-decoration: underline; display: block;";
var divEsternoCSSButtonHandler = "font-size: 0.8em; font-family: verdana,arial,tahoma,sans-serif; padding: 0 4em; margin: 0px; position: fixed; right: 0px; bottom: 0px; z-index: 999999;";
var buttonHandlerCss = 'padding: 1em;';

// Testo dell'informativa
var infoText = "Questo sito utilizza i cookie, anche di terze parti: cliccando su '"+acceptButtonText+"', proseguendo nella navigazione, effettuando lo scroll della pagina o altro tipo di interazione col sito, acconsenti all'utilizzo dei cookie. Per maggiori informazioni o per negare il consenso a tutti o ad alcuni cookie, consulta l'informativa.";
var buttonHandlerDivId = 'button_handler_div_id';
var buttonHandlerId = 'button_handler_id';
var buttonHandlerHtml = '<div  style="'+divEsternoCSSButtonHandler+'" id="' + buttonHandlerDivId + '"><button style="' + buttonHandlerCss + '" id="' + buttonHandlerId + '">Privacy & Cookie Policy</button></div>';

var explicitConset = false;
var denyButtonText = "Nega";
if (explicitConset) {
  acceptButtonText = "Accetta";
  infoText = "Questo sito utilizza i cookie, anche di terze parti: cliccando su '"+acceptButtonText+"' acconsenti all'utilizzo dei cookie. Per negare il consenso sull'utilizzo dei cookie di terze parti clicca su '" + denyButtonText + "'. Per maggiori informazioni consulta l'informativa.";
}

// Costruttore del banner informativo
var infoBanner =  "<div id='"+infoBannerId+"' style='"+divEsternoCSS+"'>" +
                    "<div style='"+divInternoCSS+"'>" +
                      "<div style='"+divInfoTextCSS+"'>" +
                        infoText +
                      "</div>" +
                      "<div style='"+divButtonsCSS+"'>" +
                        "<a href='#' id='"+acceptButtonId+"' style='"+acceptButtonCSS+"'>"+acceptButtonText+"</a>";

if (explicitConset) {
  infoBanner +=         "<a href='#' id='"+denyButtonId+"' style='"+acceptButtonCSS+"'>"+denyButtonText+"</a>";
}

infoBanner +=           "<a href='"+cookiePolicyURL+"' target='_blank' style='"+infoLinkCSS+"'>"+infoLinkText+"</a>" +
                      "</div>" +
                    "</div>" +
                  "</div>";

// Programma principale
$(document).ready(function() {
  // se è presente il cookie "acceptedCookieName" con valore 'true', allora
  if (getCookie(acceptedCookieName) === 'true') { // i cookie sono stati accettati
    optedIn();         // sblocca tutti gli elementi
  } else if (getCookie(deniedCookieName) === 'true') { // se è presente il cookie "deniedCookieName" con valore 'true', allora i cookie non sono stati accettati
    optInButtonHandler();   // bottone in basso per ri accettare i cookies
  } else { // altrimenti
    optInHandler();   // mostra banner con informativa breve
  }
});

// Gestione del visitatore che ha negato i cookies
function optInButtonHandler() {
  $('body').append(buttonHandlerHtml); // Inserisci il bottone per riaccettare i cookies
  $('#'+buttonHandlerId).click(function() {
    setCookie(deniedCookieName, 'false', acceptedCookieLife); // azzero il cookie della negazione consenso
    $('#'+buttonHandlerDivId).remove();
    optInHandler();   // mostra banner con informativa breve
  });
}

// Gestione del visitatore che deve ancora dare il consenso
function optInHandler(){
  $('body').append(infoBanner); // Inserisci il banner informativo
  setTimeout(readUserInput, 2000); // aspetta due secondi per dar tempo all'utente di notare il banner
}
function readUserInput(){
  // Accettazione mediante scroll
  var accepted = false; // questa variabile serve a rilevare l'accettamento solo una volta

  if (!explicitConset) {
    window.onscroll = function (e) {
      if (!accepted) {
        accepted = true;
        cookieOptIn();
      }
    };
  } else {
    // Negazione con click su denyButton
    $('#'+denyButtonId).click(function() {
      deniedButtonClicked();
    });
  }

  // Accettazione con click su acceptButton
  $('#'+acceptButtonId).click(function() {
    accepted = true;
    cookieOptIn();
  });
}

// Salvataggio della negazione con cookie tecnico 'deniedCookieName'
function deniedButtonClicked() {
  setCookie(deniedCookieName, 'true', acceptedCookieLife); //salvataggio del cookie sul browser dell'utente
  $('#'+infoBannerId).remove();
  optInButtonHandler();
}

// Salvataggio del consenso con cookie tecnico 'acceptedCookieName'
function cookieOptIn(){
  setCookie(acceptedCookieName, 'true', acceptedCookieLife); //salvataggio del cookie sul browser dell'utente
  $('#'+infoBannerId).hide();
  if (refreshAfterOptIn) {
      window.location.reload();
  } else {
      optedIn();
  }
}

// Sblocca gli script esterni ricaricandoli in fondo alla pagina HTML
function reloadJs(src) {
  src = $('script[data-blocked="' + src + '"]').attr("data-blocked");
  $('script[data-blocked="' + src + '"]').remove();
  $('<script/>').attr('src', src).appendTo('body');
}

// Sblocca tutti gli elementi bloccati per l'utente che ha
// accettato esplicitamente i cookie (ha cioè fatto "opt-in")
function optedIn(){
  // sblocca gli script esterni bloccati con 'data-blocked'
  $("head script[data-blocked]").each(function(){
    reloadJs($(this).attr('data-blocked'));
  });
  // sblocca iframes, immagini e altri elementi bloccati con 'data-blocked'
  $("body [data-blocked]").each(function(){
    $(this).attr('src', $(this).attr('data-blocked')).removeAttr('data-blocked') //ripristina l'attributo src
  });
  // sblocca gli script in embed bloccati con 'type=text/blocked'
  $("body script[type='text/blocked']").each(function(){
    $(this).attr('type', 'text/javascript'); //cambia il type dello script per renderlo eseguibile
    $.globalEval($(this).html()); //esegui lo script
  });
} // FINE!

// Quelle che seguono sono solo funzioni per rendere più semplice
// la lettura, scrittura e cancellazione dei cookie.

// Legge tutti i cookie e li inserisce nell'oggetto chiave/valore 'cookies'
function getCookies(){
  var cookies = {};
  var all = document.cookie; // Get all cookies in one big string
  if (all === "") { return cookies; }
  var list = all.split("; ");
  for (var i=0; i<list.length; i++) {
    var cookie = list[i];
    var p = cookie.indexOf("=");
    var name = cookie.substring(0,p);
    var value = cookie.substring(p+1);
    value = decodeURIComponent(value);
    cookies[name] = value;
  }
  return cookies;
}
// restituisce il valore di un cookie selezionato per nome
function getCookie(name){
  var cookies = getCookies();
  return cookies[name];
}
// imposta un cookie con 'name', 'value' e giorni di durata
function setCookie(name, value, days){
  var now = new Date();
  var expiration = new Date(now.getTime() + parseInt(days)*24*60*60*1000);
  // document.cookie = name + '=' + escape(value) + '; expires=' + expiration.toUTCString() + '; path=/';
  var cString = name + '=' + escape(value) + '; expires=' + expiration.toGMTString() + '; path=/';
  document.cookie = cString;
  return cString;
}
// elimina un cookie selezionato per nome
function delCookie(name){
  setCookie(name,'',-1);
}
