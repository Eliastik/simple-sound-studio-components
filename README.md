# Simple Sound Studio - Components Library

* Version: 2.2.1 (9/10/2024)
* License: GNU GPL 3

## English

A React component library used in my [Simple Voice Changer](https://github.com/Eliastik/simple-voice-changer) (soon to be renamed to Simple Sound Studio) and [Memes Soundbox](https://github.com/Eliastik/memes-soundbox) projects.

This library is written in TypeScript and user React and DaisyUI.

## Using the library

You can directly use the bundled version of the library that is present here: [dist/esm/SimpleSoundStudioComponents.js](dist/esm/SimpleSoundStudioComponents.js).

But it's recommanded that you install the npm package to use the library with this command:

`npm install @eliastik/simple-sound-studio-components --save`

You will also need to install `simple-sound-studio-lib` as it is a peer-dependency:

`npm install @eliastik/simple-sound-studio-lib --save`

The TypeScript types are directly provided by the package.

### Project Structure

The project has the following directory structure:

- `dist/`: Contains the compiled library files.
- `lib/`: Source code of the library written in TypeScript/React.

### Example

You can refer to my projects [Simple Voice Changer](https://github.com/Eliastik/simple-voice-changer) and [Memes Soundbox](https://github.com/Eliastik/memes-soundbox) to see how to integrate this library.

#### Import and use providers, initialize library, expose workers/worklets

To use the library, you need to wrap your application with the following providers:

- `AudioPlayerProvider`
- `AudioEditorProvider`

You will also need to call the initialization method:

`SoundStudioApplicationFactory.initializeApplication()`

Example: see [layoutChild.tsx](https://github.com/Eliastik/memes-soundbox/blob/master/src/app/layoutChild.tsx) in the Memes Soundbox project.

You also need to expose the worklet and worker files provided by the simple-sound-studio-lib library at the root of your web application:

- [Workers files here](https://github.com/Eliastik/simple-sound-studio-lib/tree/master/dist/workers)
- [Worklets files here](https://github.com/Eliastik/simple-sound-studio-lib/tree/master/dist/worklets)

If you do not expose the files, the library will try to function as best as it can, but some features will fail:

- If worker files are not correctly exposed: the export-to-audio-file feature will not work
- If worklet files are not correctly exposed: the library will fallback to ScriptProcessorNode for certain filters. This implementation offers lower performance and quality but remains acceptable as a fallback

#### Using the components provided by the library

The library offers ready-to-use components to simplify integration:

- `FilterButtonList`: Displays buttons for managing filters (enable/disable and settings).
- `AudioEditorActionButtons`: Includes buttons like "Validate settings" and "Reset".
- `AudioEditorNotifications`: Handles various notifications.
- `AudioEditorDialogs`: Manages audio processing dialogs.

Examples:

- [SoundboxAudioEditor.tsx](https://github.com/Eliastik/memes-soundbox/blob/master/src/app/components/soundbox/SoundboxAudioEditor.tsx) and [SoundboxMain.tsx](https://github.com/Eliastik/memes-soundbox/blob/master/src/app/components/soundbox/SoundboxMain.tsx) of the Memes Soundbox project

#### Using hooks for audio features

The library provides React hooks for accessing audio features directly:

- `useAudioEditor`: For audio editing capabilities.
- `useAudioPlayer`: For audio playback functionality.

You can see an example here: [SoundboxContext.tsx](https://github.com/Eliastik/memes-soundbox/blob/master/src/app/context/SoundboxContext.tsx) of the Memes Soundbox project

The most important methods are:

- `loadAudioPrincipalBuffer`: loads an audio file
- `downloadAudio`: downloads a modified audio file
- `changeFilterSettings`: modify filter settings
- `playAudioBuffer`: play audio
- `stopAudioBuffer`: pause/stop audio

## Français

Une bibliothèque logicielle de composants React utilisée par mes projets [Simple Voice Changer](https://github.com/Eliastik/simple-voice-changer) (qui sera bientôt renommé Simple Sound Studio) et [Memes Soundbox](https://github.com/Eliastik/memes-soundbox).

Cette bibliothèque est écrite en TypeScript et utilise React et DaisyUI.

## Utiliser la bibliothèque

Vous pouvez utiliser directement la version packagée de la bibliothèque qui est présente ici : [dist/esm/SimpleSoundStudioComponents.js](dist/esm/SimpleSoundStudioComponents.js).

Mais il est recommandé d'installer le package npm pour utiliser la bibliothèque avec cette commande :

`npm install @eliastik/simple-sound-studio-components --save`

Vous devrez également installer `simple-sound-studio-lib` car il s'agit d'une peer-dependecy :

`npm install @eliastik/simple-sound-studio-lib --save`

Les types TypeScript sont directement fournis par le paquet.

Vous devez également exposer les fichiers worklet et worker fournis par la bibliothèque simple-sound-studio-lib à la racine de votre application web :

- [Fichiers Workers](https://github.com/Eliastik/simple-sound-studio-lib/tree/master/dist/workers)
- [Fichiers Worklets](https://github.com/Eliastik/simple-sound-studio-lib/tree/master/dist/worklets)

Si vous n'exposez pas les fichiers, la bibliothèque essaiera de fonctionner au mieux, mais certaines fonctionnalités échoueront :

- Si les fichiers worker ne sont pas correctement exposés : la fonction d'export audio ne fonctionnera pas.
- Si les fichiers des worklets ne sont pas correctement exposés : la bibliothèque se rabattra sur ScriptProcessorNode pour certains filtres. Cette implémentation offre des performances et une qualité moindres, mais reste acceptable en tant que solution de repli.

### Structure du projet

Le projet a la structure de répertoire suivante :

- `dist/` : Contient les fichiers de bibliothèque compilés.
- `lib/` : Code source de la bibliothèque écrite en TypeScript/React.

### Exemple

Vous pouvez vous référer à mes projets [Simple Voice Changer](https://github.com/Eliastik/simple-voice-changer) et [Memes Soundbox](https://github.com/Eliastik/memes-soundbox) pour voir comment intégrer cette bibliothèque.

#### Importer et utiliser les providers React, initialiser la bibliothèque

Pour utiliser la bibliothèque, vous devez envelopper votre application avec les providers suivants :

- `AudioPlayerProvider`
- `AudioEditorProvider`

Vous devrez également appeler la méthode d'initialisation :

`SoundStudioApplicationFactory.initializeApplication()`

Exemple : voir [layoutChild.tsx](https://github.com/Eliastik/memes-soundbox/blob/master/src/app/layoutChild.tsx) dans le projet Memes Soundbox.

#### Utiliser les composants fournis par la bibliothèque

La bibliothèque propose des composants prêts à l'emploi pour simplifier l'intégration :

- `FilterButtonList` : Affiche les boutons de gestion des filtres (activation/désactivation et réglages).
- `AudioEditorActionButtons` : Inclut des boutons comme « Valider les paramètres » et « Réinitialiser ».
- `AudioEditorNotifications` : Gère diverses notifications.
- `AudioEditorDialogs` : Gère les dialogues de traitement audio.

Exemples :

- [SoundboxAudioEditor.tsx](https://github.com/Eliastik/memes-soundbox/blob/master/src/app/components/soundbox/SoundboxAudioEditor.tsx) et [SoundboxMain.tsx](https://github.com/Eliastik/memes-soundbox/blob/master/src/app/components/soundbox/SoundboxMain.tsx) dans le projet Memes Soundbox.

#### Utilisation de hooks React pour les fonctions audio

La bibliothèque fournit des hooks React pour accéder directement aux fonctionnalités audio :

- `useAudioEditor` : Pour les capacités d'édition audio.
- `useAudioPlayer` : Pour les fonctionnalités de lecture audio.

Les méthodes les plus importantes sont les suivantes :

- `loadAudioPrincipalBuffer` : charge un fichier audio
- `downloadAudio` : télécharge un fichier audio modifié
- `changeFilterSettings` : modifie les paramètres du filtre
- `playAudioBuffer` : joue l'audio
- `stopAudioBuffer` : met en pause/arrête l'audio
