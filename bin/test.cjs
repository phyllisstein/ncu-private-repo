#!/usr/bin/env node

const assert = require('assert/strict')
const { spawnSync } = require('child_process')


const installResult = spawnSync('yarn', ['install'], { shell: true })
// Yarn finds the correct registry and applies the token.
assert.strictEqual(installResult.status, 0)


const fa = require('@fortawesome/pro-solid-svg-icons')
// The installation succeeds, yielding a working Font Awesome module.
assert.strictEqual(fa.faCoffee.iconName, 'coffee')


const checkResult = spawnSync('yarn', ['npm-check-updates'], { encoding: 'utf-8', shell: true })
// npm-check-updates exits successfully
assert.strictEqual(checkResult.status, 0)
assert.strictEqual(checkResult.stdout.includes('All dependencies match the latest package versions'), true)

// But it checked the public NPM registry, not the server configured in
// .yarnrc.yml.
assert.ok(checkResult.stderr.includes('https://registry.npmjs.org/@fortawesome%2fpro-solid-svg-icons'))
// The NPM registry 404s...
assert.ok(checkResult.stderr.includes('404 Not Found'))
// ...three times, for some reason.
const all404s = [...checkResult.stderr.matchAll(/404 Not Found/g)]
assert.strictEqual(all404s.length, 3)
