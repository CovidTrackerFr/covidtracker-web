# Contribuer au site

## Mettre en place une copie locale

### Pré-requis

Covidtracker est basé sur Jekyll, il vous faudra donc avoir les pré-requis de Jekyll installés sur votre système : https://jekyllrb.com/docs/installation/

### Installation

Récupérer les sources
```
git clone
```

Installer Jekyll
```shell
gem install jekyll bundler
```

Lancer le site en local
```shell
cd covidtracker
bundle exec jekyll serve --livereload
```

Le site est alors disponible à l'adresse http://localhost:4000

Et une interface d'administration est disponible à l'adresse http://localhost:4000/admin

### Pour les développeurs

#### Mettre à jour Bootstrap

La version de Bootstrap utilisée est la version 4, elle est installée avec le gestionnaire de paquets npm.
Pour mettre à niveau la version de Bootstrap, il suffit donc de lancer 
```shell
npm update
./deploy_npm.sh
```

### Pour les contributeurs

Pour modifier le site : soit directement en modifiant les sources, soit en passant par l'interface d'administration.

Pour ajouter une page à la barre de navigation, il suffit de modifier le fichier ```_data/navbar.yml```.