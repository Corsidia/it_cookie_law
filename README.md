# DEPRECATO, NON UTILIZZARE: gli ultimi aggiornamenti della normativa hanno reso questa soluzione inadeguata, sconsigliamo di utilizzarla.

## Implementazione della "EU Cookie Law" così come recepita dall'Italia, con un semplice script

Questo plugin, **composto da [un solo file javascript](it_cookie_law.js)** breve e ben commentato, fornisce una base di partenza per adempiere alla normativa sui cookie italiana. In particolare consente di implementare facilmente:

* Il **blocco preventivo** di tutti gli elementi interni ed esterni che fanno uso di cookie;
* La **presentazione del banner** (l'informativa breve) ai soli utenti che non hanno ancora accettato la cookie policy;
* La **registrazione del consenso** dell'utente espresso con la *continuazione della navigazione mediante scroll della pagina* o click sul pulsante di accettazione del banner; (L'accettazione tramite scroll può anche essere disabilitata).
* Lo **sblocco di tutti gli elementi** preventivamente bloccati per i soli utenti che hanno espresso il consenso con le modalità descritte nel banner.

Una [**DEMO** è disponbile online a questo indirizzo](http://corsidia.github.io/it_cookie_law/esempi.html).

Lo **script** fa uso della libreria `jQuery v.1.11` ed è retro-compatibile fino a IE6. Inoltre è stato testato coi principali smartphone. Se dovessi trovare un problema di compatibilità è **più che benaccetta la sua segnalazione!** Se fossi obbligato a utilizzare `jQuery 2` il plugin potrebbe funzionare lo stesso ma la retro-compatibilità ne risentirebbe (jQuery v.2 supporta i browser a partire da IE9).

Inoltre, trattandosi di un progetto open-source, ogni contributo è il benvenuto!

Infine il plugin è **liberamente utilizzabile** anche per scopi commerciali.

Maggiori informazioni sulla cookie law e sulle modalità di adempimento [sono disponibili qui](https://corsidia.com/materia/web-design/webmaster-tutorial/privacy-e-cookie-law#quadro-normativo).

## Installazione
Devi solo copiare e salvare lo script [it_cookie_law.js](it_cookie_law.js) nel tuo progetto e quindi richiamarlo nella sezione `head` di tutte le tue pagine HTML subito dopo aver richiamato anche jQuery, così:

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script type="text/javascript" src="[percorso_al_file]/it_cookie_law.js"></script>
```

Dove, ovviamente, `[percorso_al_file]` deve essere sostituito con il path relativo o assoluto alla posizione in cui hai salvato il file.
Ora puoi procedere al blocco preventivo di tutti gli elementi che fanno uso di cookie che devono essere bloccati (di terze parti e profilanti) con le seguenti modalità.

Se il tuo sito è *responsive* e quindi vuoi che il banner sia ben leggibile sugli schermi di diverse dimensioni (cellulari, tablet, iPad etc.) devi ricordarti di inserire e impostare anche il meta tag `viewport`, sempre nella sezione `head` della pagina. Ecco un esempio:

```html
<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;"/>
```

### Blocco preventivo, come applicarlo

Il modo più sicuro per applicare il blocco preventivo consiste nel modificare l'HTML degli elementi esterni (script e iframe) in modo che non siano eseguibili a meno che non vengano sbloccati dallo script contenuto nel file [it_cookie_law.js](it_cookie_law.js). In questo modo se anche si dovesse verificare un errore a livello javascript la cosa peggiore che potrebbe accadere è che gli elementi esterni non vengano sbloccati, il che consentirebbe comunque di evitare le sanzioni previste dalla legge.

**ATTENZIONE:** questo script funziona modificando temporaneamente il codice degli elementi di terze parti, pertanto potrebbe non essere adatto all'uso con sistemi per l'advertising come **Google Adsense** e **DoubleClick** che penalizzano la modifica dei propri elementi.

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

#### Come bloccare gli script esterni, gli iframe e le immagini di terze parti
Rinomina l'attributo `src=[URL]` in `data-blocked=[URL]`.

E' consigliato includere comunque l'attributo `src="blocked.html"` affinché il file HTML sia comunque valido rispetto agli standard del W3C. Il file blocked.html può essere una pagina html con un semplice messaggio temporaneo, come questo:

```
<!-- blocked.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Cookie bloccati</title>
  </head>
  <body>
     Per vedere questo contenuto devi accettare i cookie.
  </body>
</html>
```

##### Prima:
```html
<!-- script nella sezione head eseguito al caricamento della pagina -->
<script src="https://example.com/path/to/script.js"></script>
<!-- iframe incorporato al caricamento della pagina -->
<iframe src="https://example.com/path/to/script.js"></iframe>
<!-- immagine di terza parte -->
<img src="https://example.com/path/to/image.jpg" />
```

##### Dopo:
```html
<!-- script nella sezione head bloccato preventivamente -->
<script src="blocked.html" data-blocked="https://example.com/path/to/script.js"></script>
<!-- iframe bloccato preventivamente -->
<iframe src="blocked.html" data-blocked="https://example.com/path/to/script.js"></iframe>
<!-- immagine di terza parte bloccata preventivamente -->
<img src="blocked.html" data-blocked="https://example.com/path/to/image.jpg" />
```

#### Abilitare l'aggiornamento della pagina dopo che l'utente ha dato il consenso

Di default questa funzionalità è disabilitata.

All'inizio del file `it_cookie_law.js` tra le variabili di configurazioni della libreria troverai:

##### Prima:
```javascript
var refreshAfterOptIn = false;
```

Se vuoi abilitare questa funzionalità ti basta impostare questa variabile a `true`:

##### Dopo:
```javascript
var refreshAfterOptIn = true;
```


#### Abilitare il consenso esplicito dell'utente

Di default la libreria memorizza il consenso dell'utente anche in maniera implicita, se prosegue la navigazione sul 
sito accetta implicitamente i cookies.
Se vuoi disabilitare questa funzionalità e far si che l'utente accetti esplicitamente i cookies cliccando sul bottone
'Accetta' ed abbia anche la possibiltà di negare l'utilizzo dei cookies devi impostare la seguente variabile:

##### Prima:
```javascript
var explicitConsent = false;
```

##### Dopo:
```javascript
var explicitConsent = true;
```

**Altri esempi** per gli elementi incorporati di **Facebook**, **Google** e **DISQUS** sono disponibili nel file [esempi.html](esempi.html), che è lo stesso utilizzato per la [DEMO online](http://corsidia.github.io/it_cookie_law/esempi.html).

### Cookie policy

**ATTENZIONE:** La normativa impone di scrivere anche una "[informativa estesa](https://corsidia.com/materia/web-design/webmaster-tutorial/privacy-e-cookie-law#quadro-normativo)" o "cookie policy", ricordati che devi includerla nel tuo sito e linkarla in fondo a tutte le pagine dello stesso.

Inoltre:

* **Devi inserire l'url della tua cookie policy** nel banner informativo **valorizzando la variabile `cookiePolicyURL`**.
* Devi inserire il *cookie tecnico* utilizzato da questo plugin nell'elenco dei cookie utilizzati dal tuo sito che dev'essere presente nella tua **cookie policy**. Il nome del *cookie tecnico* è definito dalla variabile `acceptedCookieName` mentre la sua durata in giorni è definita dalla variabile `acceptedCookieLife`.

Tutte le variabili appena citate sono definite all'inizio del file [it_cookie_law.js](it_cookie_law.js).

*Buon lavoro!*

[Duccio Armenise](https://corsidia.com/team/duccio-armenise), [Alberto Olla](https://www.albertoolla.it/), [Marta Petrella](http://www.martapetrella.com/) e [Antonio Porcelli](https://progressify.dev).

## P.S.:

Stiamo preparando una serie di lezioni con la spiegazione dettagliata di questa soluzione nell'ambito del nostro corso online gratuito "[WebMaster Tutorial](https://corsidia.com/materia/web-design/webmaster-tutorial)".

Per aggiornamenti [seguici su Twitter](https://twitter.com/Corsidia)!
