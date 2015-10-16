# Implementazione della "EU Cookie Law" così come recepita dall'Italia

Questo plugin **composto da [un solo file javascript](it_cookie_law.js)**, breve e ben commentato, consente di realizzare facilmente:

* Il blocco preventivo di tutti gli elementi interni ed esterni che fanno uso di cookie;
* La presentazione del banner (l'informativa breve) ai soli utenti che non hanno ancora accettato la cookie policy;
* La registrazione del consenso dell'utente espresso con la *continuazione della navigazione mediante scroll della pagina* o click sul pulsante di accettazione del banner;
* Lo sblocco di tutti gli elementi preventivamente bloccati per i soli utenti che hanno espresso il consenso con le modalità descritte nel banner.

Come richiesto dalla normativa sui cookie italiana, anche nota come "cookie law".

Il codice è fa uso della libreria `jQuery v.1.11` ed è retro-compatibile fino a IE6. Inoltre è stato testato coi principali principali smartphone. Se dovessi trovare un problema di compatibilità è **più che benaccetta la sua segnalazione!** Se fossi obbligato a utilizzare `jQuery 2` il plugin potrebbe funzionare lo stesso ma la retro-compatibilità ne risentirebbe (jQuery v.2 supporta i browser a partire da IE9).
Inoltre, trattandosi di un progetto open-source, sei benvenuto a contribuire.

Infine il plugin è **liberamente utilizzabile** anche per scopi commerciali.

Maggiori informazioni sulla cookie law e sulle modalità di adempimento [sono disponibili qui](http://nemboweb.com/blog/didattica/cookie-law-vademecum).

## Installazione
Devi solo copiare e salvare il file [it_cookie_law.js](it_cookie_law.js) nel tuo progetto e quindi richiamarlo nella sezione `head` di tutte le tue pagine HTML subito dopo aver richiamato anche jQuery, così:

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script type="text/javascript" src="[percorso_al_file]/it_cookie_law.js"></script>
```

Dove, ovviamente, `[percorso_al_file]` deve essere sostituito con il path relativo o assoluto alla posizione in cui hai salvato il file.
Ora puoi procedere al blocco preventivo di tutti gli elementi che fanno uso di cookie che devono essere bloccati (di terze parti e profilanti) con le seguenti modalità.

### Blocco preventivo, come applicarlo

#### Script in embed
Rinomina il valore dell'attributo `type=text/javascript` in `type=text/blocked`.

#### Script esterno e iframe
Rinomina l'attributo `src=[URL]` in `data-blocked=[URL]`,

Diversi esempi sono disponibili nel file [esempi.html](esempi.html).

*Buon lavoro!*

[Duccio Armenise](http://nemboweb.com/team/duccio-armenise) e [Marta Petrella](http://nemboweb.com/team/marta-petrella), [NemboWeb.com](http://nemboweb.com)
