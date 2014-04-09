npm-ls-scripts
==============

**List runnable npm scripts**

Inspired by `rake -T`, which will show you all the tasks runnable by rake, this script will show you all the runnable scripts that npm's package.json knows about.

### Usage

Npm lets you define [scripts](https://www.npmjs.org/doc/misc/npm-scripts.html) that npm can run.  Your `package.json` will include:

```
{
  "scripts": {
    "start": "node app.js",
    "job": "node my/one-off/job.js"
  }
}
```

You could cat `package.json`, but that's lame.  Instead, install `npm-ls-scripts`:

```
npm install npm-ls-scripts --save
```

And run:

```
ls-scripts
```

And see the scripts in a nice list:

```
NPM - ls scripts
---
start - node app.js
job   - node my/one-off/job.js
---
```

Note: `ls-scripts` is the binary that comes with this package.  To use, adjust your path to include:

```
export PATH=./node_modules/.bin:$PATH
```

Alternately, after installation, you could type:

```
node_modules/.bin/ls-scripts
```

Or different still, you make a script to run `npm-ls-scripts` in your `package.json`:

```
{
  "scripts": {
    "ls": "node_modules/.bin/ls-scripts"
  }
}
```

And run with:

```
npm run ls
```

### Config

You can make the output even nice by adding a verbal description to scripts that may be helped by it.  Add config via your `package.json`:

```
{
  "config": {
    "scripts": {
      "job": "I would gladly do the job"
    }
  },
  "scripts": {
    "start": "node app.js",
    "job": "node my/one-off/job.js"
  }
}
```

Make sure the script names match between `config` and `scripts`.

Run with this config, and you should see:

```
NPM - ls scripts
---
start - node app.js
job   - I would gladly do the job
---
```

Note that you do not need to specify a description for all scripts if it's not useful or your fingers are tired.
