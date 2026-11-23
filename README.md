# Duplicity — v3.18.1-tosjkg v0

An **offline** save editor for **Oxygen Not Included**.

This is a maintained fork of [RoboPhred/oni-duplicity](https://github.com/RoboPhred/oni-duplicity) 3.18.1. It's packaged so you don't have to build anything and no internet is needed.

> ⚠️ **Always back up your save before editing.** The editor was last updated by its original author before recent game updates, so it can fail to load newer saves or damage them.

## Download

Get the files from the [Releases page](https://github.com/tosjkg-max/oni-duplicity-copy/releases). Pick **one**:

| File | How to use |
| --- | --- |
| `Duplicity-v3.18.1-tosjkg-v0.html` | Double-click it. It opens in your browser (Chrome, Edge, Firefox) and works on Windows, Mac and Linux. 100% offline. |
| `Duplicity-v3.18.1-tosjkg-v0.exe` | Windows, portable, no install. Double-click it: a small window opens and the editor starts in your browser. Keep the window open while editing and close it to quit. The editor runs only on your PC (127.0.0.1). Nothing is sent online. |

Windows may show a "Windows protected your PC" (SmartScreen) message because the exe isn't code-signed. Click **More info → Run anyway**.

## Where are my saves?

- Windows: `Documents\Klei\OxygenNotIncluded\save_files\`
- Mac: `~/Library/Application Support/unity.Klei.Oxygen Not Included/save_files/`
- Linux: `~/.config/unity3d/Klei/Oxygen Not Included/save_files/`

## What it can edit

- Duplicants: name, appearance, attributes, skills, interests, traits, health, effects
- Creatures
- Geysers (list)
- Raw editor (advanced: edit any save data directly)

The Planets and Materials editors are disabled because they don't work with newer saves.

Supported save version: **7.31** (oni-save-parser 14.0.1). For other versions you can turn on the version-check bypass, but use it at your own risk.

## Changelog

See [CHANGELOG.md](CHANGELOG.md). The same log is shown inside the app (Changelog page).

## For maintainers: building

Requirements: Node.js 18+ (tested on 22). For the exe you also need [Go](https://go.dev) 1.21+.

```bash
npm install
npm run build        # -> dist/Duplicity-<version>.html  (single offline file)
npm run build:exe    # -> dist/Duplicity-<version>.exe   (Windows portable)
npm run build:all    # both
npm start            # dev server with hot reload
npm test
```

### Releasing a new version

1. In `package.json`, bump `version` (semver, e.g. `3.18.1-tosjkg.1`) and `displayVersion` (e.g. `v3.18.1-tosjkg v1`). The display version appears in the app, the file names and the exe.
2. Add a `## v3.18.1-tosjkg v1` section at the top of `CHANGELOG.md`.
3. Run `npm run build:all`, then create a GitHub release with the tag (e.g. `v3.18.1-tosjkg-v1`) and attach the `.html` and `.exe` from `dist/`.

### How it works

- `webpack.config.js` builds the React app into one bundle. Fonts, images and the save-parser web worker are all inlined.
- `scripts/inline-html.js` puts that bundle inside `index.html`, giving one self-contained HTML file.
- `launcher/main.go` embeds that HTML into a tiny Go program. The program serves it on `127.0.0.1` and opens the browser.
- Saves are read and written by [oni-save-parser](https://github.com/RoboPhred/oni-save-parser).

## Credits / License

MIT. Original work © RoboPhred. Fork maintained by tosjkg-max.
