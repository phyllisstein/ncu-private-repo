# `npm-check-updates` Private Repo Bug
This package reproduces a bug in which `npm-check-updates` ignores the NPM registry configured in Yarn. See [`bin/test.cjs`](bin/test.cjs) for details. Run `yarn test` to reproduce.


## Bug description
`package.json` expresses a dependency on Font Awesome Pro through their private NPM server. (I've created a temporary key and dropped it into the Yarn config.) `yarn install` should successfully locate and install the private package. `npm-check-updates` will report a `0` exit status, but log errors to STDERR:

<details>
<summary>`npm-check-updates` output</summary>

```
Using yarn
Checking /Users/daniel/Code/Ephemera/ncu-private-repo/package.json
[==========----------] 1/2 50%
FetchError: Request @fortawesome/pro-solid-svg-icons info failed[1 of 3]:
404 Not Found - GET https://registry.npmjs.org/@fortawesome%2fpro-solid-svg-icons - Not found.

FetchError: Request @fortawesome/pro-solid-svg-icons info failed[2 of 3]:
404 Not Found - GET https://registry.npmjs.org/@fortawesome%2fpro-solid-svg-icons - Not found.

FetchError: Request @fortawesome/pro-solid-svg-icons info failed[3 of 3]:
404 Not Found - GET https://registry.npmjs.org/@fortawesome%2fpro-solid-svg-icons - Not found.
[====================] 2/2 100%

All dependencies match the latest package versions :)
```

</details>

The error messages suggest it's checking the public NPM registry, not the private registry configured in [`.yarnrc.yml`](.yarnrc.yml).
