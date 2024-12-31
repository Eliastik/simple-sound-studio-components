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

#### Import and use providers, initialize library

To use the library, you will need to use the AudioPlayerProvider and AudioEditorProvider providers.

You will also need to call also the initialization method:

`SoundStudioApplicationFactory.initializeApplication()`

Example: [https://github.com/Eliastik/memes-soundbox/blob/master/src/app/layoutChild.tsx](https://github.com/Eliastik/memes-soundbox/blob/master/src/app/layoutChild.tsx)

#### Using the components provided by the library

You can use the component `FilterButtonList` to display the filters buttons, so the user can edit the filters settings and enable/disable filters.

You can also use the compoennt `AudioEditorActionButtons` to display the "Validate settings" and "Reset" buttons.

Example: [https://github.com/Eliastik/memes-soundbox/blob/master/src/app/components/soundbox/SoundboxAudioEditor.tsx](https://github.com/Eliastik/memes-soundbox/blob/master/src/app/components/soundbox/SoundboxAudioEditor.tsx)

You can also display the compoennts `AudioEditorNotifications` and `AudioEditorDialogs` to display various notifications and dialogs (audio processing dialogs for example).

Example: [https://github.com/Eliastik/memes-soundbox/blob/6a35f8df80a7e49f2b8203b70bb0d57bde8a8575/src/app/components/soundbox/SoundboxMain.tsx](https://github.com/Eliastik/memes-soundbox/blob/6a35f8df80a7e49f2b8203b70bb0d57bde8a8575/src/app/components/soundbox/SoundboxMain.tsx)

#### Use the hooks to use the audio editor features

You can then use the React hooks `useAudioEditor` and `useAudioPlayer` to use the features provided by the library.

You can see an example here: [https://github.com/Eliastik/memes-soundbox/blob/master/src/app/context/SoundboxContext.tsx](https://github.com/Eliastik/memes-soundbox/blob/master/src/app/context/SoundboxContext.tsx)

The most important methods are :

- `loadAudioPrincipalBuffer`: loads an audio file
- `downloadAudio`: downloads a modified audio file
- `changeFilterSettings`: modify filter settings
- `playAudioBuffer`: play audio

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

### Structure du projet

Le projet a la structure de répertoire suivante :

- `dist/` : Contient les fichiers de bibliothèque compilés.
- `lib/` : Code source de la bibliothèque écrite en TypeScript/React.

### Exemple

Vous pouvez vous référer à mes projets [Simple Voice Changer](https://github.com/Eliastik/simple-voice-changer) et [Memes Soundbox](https://github.com/Eliastik/memes-soundbox) pour voir comment intégrer cette bibliothèque.

#### Importer et utiliser les fournisseurs, initialiser la bibliothèque

Pour utiliser la bibliothèque, vous devrez utiliser les providers AudioPlayerProvider et AudioEditorProvider.

Vous devrez également appeler la méthode d'initialisation :

`SoundStudioApplicationFactory.initializeApplication()`

Exemple : [https://github.com/Eliastik/memes-soundbox/blob/master/src/app/layoutChild.tsx](https://github.com/Eliastik/memes-soundbox/blob/master/src/app/layoutChild.tsx)

#### Utilisation des composants fournis par la bibliothèque

Vous pouvez utiliser le composant `FilterButtonList` pour afficher les boutons des filtres, afin que l'utilisateur puisse modifier les paramètres des filtres et activer/désactiver les filtres.

Vous pouvez également utiliser le composant `AudioEditorActionButtons` pour afficher les boutons « Valider les paramètres » et « Réinitialiser ».

Exemple : [https://github.com/Eliastik/memes-soundbox/blob/master/src/app/components/soundbox/SoundboxAudioEditor.tsx](https://github.com/Eliastik/memes-soundbox/blob/master/src/app/components/soundbox/SoundboxAudioEditor.tsx)

Vous pouvez également utiliser les composants `AudioEditorNotifications` et `AudioEditorDialogs` pour afficher diverses notifications et dialogues (dialogues de traitement audio par exemple).

Exemple : [https://github.com/Eliastik/memes-soundbox/blob/6a35f8df80a7e49f2b8203b70bb0d57bde8a8575/src/app/components/soundbox/SoundboxMain.tsx](https://github.com/Eliastik/memes-soundbox/blob/6a35f8df80a7e49f2b8203b70bb0d57bde8a8575/src/app/components/soundbox/SoundboxMain.tsx)

#### Utiliser les hooks pour utiliser les fonctionnalités de l'éditeur audio

Vous pouvez ensuite utiliser les hooks React `useAudioEditor` et `useAudioPlayer` pour utiliser les fonctionnalités fournies par la bibliothèque.

Vous pouvez voir un exemple ici : [https://github.com/Eliastik/memes-soundbox/blob/master/src/app/context/SoundboxContext.tsx](https://github.com/Eliastik/memes-soundbox/blob/master/src/app/context/SoundboxContext.tsx)

Les méthodes les plus importantes sont :

- `loadAudioPrincipalBuffer` : permet de charger un fichier audio
- `downloadAudio` : permet de télécharger un audio modifié
- `changeFilterSettings` : permet de modifier les paramètres d'un filtre
- `playAudioBuffer` : lire l'audio
