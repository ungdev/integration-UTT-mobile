# Application mobile de l'intégration

Application mobile pour l'intégration de l'UTT.

[Lien play store](https://play.google.com/store/apps/details?id=fr.utt.ung.integration&hl=fr)

## Getting started

### Pré-requis

- [Ionic](https://ionicframework.com/docs/intro/installation/).

Pour build et executer l'application sur android :
- [Android SDK](https://developer.android.com/studio/index.html)

### Installation

Renommez le fichier `env.dev.example.ts` en `env.dev.ts` dans `/src/config`, puis modifier les valeurs selon votre configuration.  

`CLI_ID` et `CLI_SECRET` sont les champs `id` et `secret` de la table `oauth_clients` créée par **Laravel Passport** (de type **password grant**).

Si vous souhaitez utiliser un second environnement, vous pouvez faire de même avec `env.prod.example.ts`. Pour utiliser cet environnement, vous devrez ajouter `--prod` dans chaque commande. Attention, le fait d'ajouter l'option `--prod` build le code en mode production (donc uglifié, minifié, ...).

`BACKEND_API_URL` est l'url complète de l'api de l'intégration que vous souhaitez utiliser.

## Lancer l'application

[Documentation complète sur le sujet](http://ionicframework.com/docs/v1/guide/testing.html)

Les principaux :
* sur un navigateur web
```
ionic serve [--prod]
```
* sur un device android branché
```
ionic cordova run android [--prod]
```

## Debug

### Sur navigateur web
Avec la console développeur, comme une page web classique.

### Sur un téléphone
En utilisant l'outil **remote devices** de Chrome. Voir la documentation de cet outil [ici](https://developers.google.com/web/tools/chrome-devtools/remote-debugging/).

## Build une release

[Documentation complète](http://ionicframework.com/docs/v1/guide/publishing.html)

**ATTENTION A BIEN INCRÉMENTER LE NUMÉRO DE VERSION DANS *CONFIG.XML***  
Sinon le play store n'acceptera pas le build car il existera déjà.

**ATTENTION PENSER A BIEN CHNAGER L'ID EN FONCTION DE ANDROID/IOS**
fr.uttnetgroup.integration pour ios
fr.utt.ung.integration pour android

## Auteurs

* Antoine PRUDHOMME - *première version*
