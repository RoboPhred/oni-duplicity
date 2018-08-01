### v2.0.5

- Fix decimal values not editable.
- Stylistic improvements to tables.

### v2.0.4

- Fix numeric values not editable in browsers other than chrome.

### v2.0.3

- Really remove test button from production build...

### v2.0.2

- Remove test button from production build.

### v2.0.1

- Fix incorrect url path preventing website from loading.

### v2.0.0

Major rewrite of save editor.

- Ground-up rewrite of UI.
- Save / Load progress reporting.
- Edit any recognized template object
- extraData editors duplicant modifiers (health, stanima, germs, diseases, ...)
- extraData editor for storage
- Additional editors for minion modifiers

### v1.4.3

Fix all job mastery and experiences displayed as unmastered / 0.

### v1.4.2

Wallpaper over more bugs due to oni-save-parser@2 save object differences.

### v1.4.1

Slash and burn conversion to support oni-save-parser@2 and the Cosmic Update version of ONI (save version 7.4).

### v1.4.0

- Edit duplicant
  - Interests (aptitudes)
- Edit geysers
  - Type
  - Cycle time factor
  - Active time factor
  - Dormant time factor
- Ability to rename file on download.

### v1.3.0

- Edit current cycle.
- Edit duplicant printer
  - Next duplicant ready
  - Time to next duplicant

### v1.2.1

- Fix save corruption when text with multi-byte accents are encountered.
- Refactor URL layout to make way for future utilities.

### v1.2.0

- Edit Duplicants
  - Current Job
  - Target Job
  - Job Experience
  - Job Mastery

### v1.1.0

- Edit Duplicants
  - Gender (data only; no visual effect)
  - Voice
  - Appearance
- Dedicated load button (no more refreshes to edit new saves)

### v1.0.0

Ground-up rewrite.

- Edit Duplicants
  - Name
  - Size (width and height)
  - Health Status (healthy, critical, incapacitated, invulnurable, ...)
  - Skills (level and experience)
  - Traits
  - Status Effects
- New Theme
- Non-blocking file loading and saving. Prevents browsers from killing the process when working with large saves.
- Internal cleanup for mantainability going forward.
