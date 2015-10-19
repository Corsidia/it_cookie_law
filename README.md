# Implementazione della "EU Cookie Law" così come recepita dall'Italia

Questo plugin **composto da [un solo file javascript](it_cookie_law.js)**, breve e ben commentato, consente di realizzare facilmente:

* Il **blocco preventivo** di tutti gli elementi interni ed esterni che fanno uso di cookie;
* La **presentazione del banner** (l'informativa breve) ai soli utenti che non hanno ancora accettato la cookie policy;
* La **registrazione del consenso** dell'utente espresso con la *continuazione della navigazione mediante scroll della pagina* o click sul pulsante di accettazione del banner;
* Lo **sblocco di tutti gli elementi** preventivamente bloccati per i soli utenti che hanno espresso il consenso con le modalità descritte nel banner.

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

Il modo più sicuro per applicare il blocco preventivo consiste nel modificare l'HTML degli elementi esterni (script e iframe) in modo che non siano eseguibili a meno che non vengano sbloccati dallo script contenuto nel file [it_cookie_law.js](it_cookie_law.js). In questo modo se anche si dovesse verificare un errore a livello javascript la cosa peggiore che potrebbe accadere è che gli elementi esterni non vengano sbloccati, il che consentirebbe comunque di evitare le sanzioni previste dalla legge.

#### Come bloccare gli script in embed
Rinomina il valore dell'attributo `type=text/javascript` in `type=text/blocked`. Se non fosse presente l'attributo `type=text/javascript` nello script che vuoi bloccare è perché si tratta del valore di default e quindi talvolta viene omesso. Per bloccare lo script inserici comunque l'attributo `type=text/blocked`. Seguono due esempi.

##### Prima:
```html
<script type='text/javascript'>
  alert('sono eseguito subito');
</script>

<script>
  alert('anche io sono eseguito subito');
</script>
```

##### Dopo:
```html
<script type='text/blocked'>
  alert('sono bloccato preventivamente');
</script>

<script type='text/blocked'>
  alert('anche io sono bloccato preventivamente');
</script>
```

#### Come bloccare gli script esterni e gli iframe
Rinomina l'attributo `src=[URL]` in `data-blocked=[URL]`.

E' consigliato includere comunque l'attributo `src='#'` affinché il file HTML sia comunque valido rispetto agli standard del W3C.

##### Prima:
```html
<!-- script nella sezione head eseguito al caricamento della pagina -->
<script src="https://example.com/path/to/script.js"></script>
<!-- iframe incorporato al caricamento della pagina -->
<iframe src="https://example.com/path/to/script.js"></iframe>
```

##### Dopo:
```html
<!-- script nella sezione head bloccato preventivamente -->
<script src="#" data-blocked="https://example.com/path/to/script.js"></script>
<!-- iframe bloccato preventivamente -->
<iframe src="#" data-blocked="https://example.com/path/to/script.js"></iframe>
```

**Altri esempi** per gli elementi incorporati di **Facebook**, **Google** e **DISQUS** sono disponibili nel file [esempi.html](esempi.html).

### Cookie policy

**ATTENZIONE:** La normativa impone di scrivere anche una "[informativa estesa](http://nemboweb.com/blog/didattica/cookie-law-vademecum#passo2)", ricordati che devi includerla nel tuo sito e linkarla in fondo a tutte le pagine dello stesso. Inoltre **devi inserire l'url della tua cookie policy** nel banner informativo **valorizzando la variabile `cookiePolicyURL`** definita all'inizio del file [it_cookie_law.js](it_cookie_law.js).

Prossimamente scriveremo un articolo con la spiegazione dettagliata di questa soluzione nell'ambito del nostro corso online gratuito "[WebMaster Tutorial](http://nemboweb.com/corsi/webmaster-tutorial)".

*Buon lavoro!*

[Duccio Armenise](http://nemboweb.com/team/duccio-armenise) e [Marta Petrella](http://nemboweb.com/team/marta-petrella), [NemboWeb.com](http://nemboweb.com)
