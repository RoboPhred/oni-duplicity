# Duplicity (V3)

A web-based Oxygen Not Included save editor.

You can find the editor at [https://robophred.github.io/oni-duplicity/vnext](https://robophred.github.io/oni-duplicity/vnext).

# Compatibility

Supports save file version 7.6. Future versions may not be compatible until the editor is updated. Previous versions may need to be updated by re-saving them in the newest version of the game.

# V3

This branch is a rewrite of the UI focusing on ease of use and community requested features.

# Translations

This project is ready for translations.

To contribute a translation, translate [/src/translations/en/common.json](src/translations/en/common.json) and [/src/translations/en/oni.json](src/translations/en/oni.json) and submit them in a new issue.

# Implementation

The actual save serialization is done by the [oni-save-parser](https://github.com/RoboPhred/oni-save-parser) library. Feel free to use this library in your own projects.
