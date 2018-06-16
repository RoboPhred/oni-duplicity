Making the entire save object observable does not work for us, as mobx clones the object and will not
update the underlying source object.
We then have to use toJS to get the changes, which has severe performance issues (probably running over our massive arrays).
To work around this, we have a pattern of models which wrap the underlying data, and have a syncChanges function to
write back the observable-clone data into the original.
