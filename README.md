# Application mobile de l'intégration

Application mobile pour l'intégration de l'UTT, réalisée avec le framework [Ionic](https://ionicframework.com/).

## Installation

### Installation de Ionic

[Documentation officielle](https://ionicframework.com/docs/intro/installation/) de Ionic.

### Configuration

Renommez le fichier `env.dev.example.ts` en `env.dev.ts` dans `/src/config`, puis modifier les valeurs selon votre configuration.  

`CLI_ID` et `CLI_SECRET` sont les champs `id` et `secret` de la table `oauth_clients` créée par **Laravel Passport**.

Si vous souhaitez utiliser un second environnement, vous pouvez faire de même avec `env.prod.example.ts`. Pour utiliser cet environnement,
vous devrez ajouter `--prod` dans chaque commande.

## Lancer l'application

### Sur browser

```
ionic serve
```
Puis, rendez vous sur `http://localhost:8100/`
