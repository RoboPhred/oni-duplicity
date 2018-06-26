# Duplicity (vnext)

A web-based Oxygen Not Included save editor.

You can find the editor at [https://robophred.github.io/oni-duplicity/vnext](https://robophred.github.io/oni-duplicity/vnext).

# Compatibility

Supports Cosmic Update (save file version 7.4). Future versions may not be compatible until the editor is updated. Previous versions may need to be updated by re-saving them in the newest version of the game.

# VNext

VNext is a full rewrite of the web editor, accompanied by a full rewrite of oni-save-parser

The new version will focus on editing the data as directly extracted from the save file. This will allow most of the data in the save to be immediately editable, and allow for future game objects and behaviors to immediately be supported so long as the underlying format remains the same.

## Data Editing

The ui will exist to complement the structure of the save. The structure will be visible by the user and available at all times, and provide an easy way to modify the data stored at any point. Clicking on data in the structure will reveal an editor for that data.

Various save structures will have editors that understand the content they are editing, and provide a user friendly way of editing them. For example, clicking on the "Minions" (duplicants) game object set may show a list of duplicants by name and other interesting bits. It may also provide inline editing for some of their attributes, and allow them to be clicked on to be taken to a specific "Minion" editor. In this way, these structured editors will bring the guided editing experience that V1 currently offers.

Adding these specific editors will take time, and there will always be an interest in peering behind the curtain to the raw data beyond. Due to this, all levels of the save structure will have a "raw editor".
This will allow the user to change the content of the save structure with minimal validation according to the primitive data types exposed by the save's type templates. This will allow the user to experiment with changing values and to edit data that is not yet programmed in to the more user-friendly data editors. However, the cost of such raw access is it will be possible for the user to write invalid data into the save, resulting in save corruption and potential long term instability on that save. Because of this, the raw editor will eventually be hidden by default, and must be opted into with an "advanced mode" setting.

# Implementation

The actual save serialization is done by the [oni-save-parser](https://github.com/RoboPhred/oni-save-parser) library. Feel free to use this library in your own projects.
