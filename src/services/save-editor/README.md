
Failed to mobx on two attempts:

### Attempt 1
We cannot make our existing object observable, we must deep clone it into a new observable object.
Upon doing this, we must change it back with toJS, which when used on our save state causes the browser to freeze.  This
occurs even with small files.

### Attempt 2
Creating wrapper objects is problematic for behaviors, as they have deep objects that we have to track.  mobx
does not provide a means of observing deep changes, just all-changes and single-object changes.  We would
ultimately need to flush the object with a .save call and run toJS on the template data.