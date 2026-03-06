# 🎧 Audio Files pour Histoires

## Comment ajouter le fichier audio

Pour que le lecteur audio fonctionne dans l'histoire de Nouh (AS), vous devez ajouter le fichier audio ici :

**Chemin attendu :** `assets/audio/nouh-story.mp3`

## Format recommandé

- **Format** : MP3 (le plus compatible)
- **Qualité** : 128 kbps minimum
- **Durée** : Adaptée à la longueur de l'histoire
- **Taille** : Optimisée pour le web (< 10 MB si possible)

## Sources possibles

Vous pouvez :
1. Enregistrer vous-même la narration de l'histoire
2. Utiliser un service de text-to-speech (voix naturelle)
3. Acheter/télécharger des narrations islamiques libres de droits

## Instructions

1. Placez votre fichier audio MP3 dans ce dossier
2. Renommez-le en `nouh-story.mp3`
3. Le lecteur audio fonctionnera automatiquement !

## Pour ajouter d'autres histoires audio

Modifiez le champ `src` dans le HTML de chaque histoire :
```html
<source src="assets/audio/nom-de-fichier.mp3" type="audio/mpeg">
```
