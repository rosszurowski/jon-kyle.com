## Harp

Harp has a build error with SASS. To fix:

- Locate the global install of Harp
- Open node_modules/terraform
- Locate the sass and scss js files
- Comment out the requirement on node-sass
- Comment out all of the code in exports
- Return `callback(null, '')`