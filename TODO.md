
- Changes are never written back to save data when saved.  Issue is mobx observable creates entirely new objects and never writes data back.

- Move relevant constants and behavior interfaces out of oni-duplicity and into oni-save-parser