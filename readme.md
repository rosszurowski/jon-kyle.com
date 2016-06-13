## Harp

Requires Harp to build.

`npm harp install -g`

Harp has a build error with SASS and Node 6+. To fix:

- Locate the global install of Harp
- Open node_modules/terraform
- Locate the sass and scss js files
- Comment out the requirement on node-sass
- Comment out all of the code in exports
- Return `callback(null, '')`

## Watch

`npm run watch`

## Deploy

`npm run deploy`

Requires a file called `credentials.json` in the root directory.

```
{
  "aws": {
    "bucket": "bucketname",
    "accessKeyId": "1234",
    "secretAccessKey": "1234"
  }
}
```