# 🐝 Queen Bee - A NYT Spelling Bee Solver

As much as I love playing word games, I love finding ways to solve them efficiently. This little "one-day build" (really
more like an hour) provides a list of candidate words to solve a provided input of the current day's New York Times
Spelling Bee.

## Methodology

The approach we take here utilizes a [trie](https://en.wikipedia.org/wiki/Trie) data structure. A trie, pronounced trie,
is a tree data structure which, through a bit of preprocessing, creates an interface where searching for a word is an
`O(n)` operation, where `n` is the amount of letters in the word. In other words, it's fast.

## Limitations

The NYT Spelling Bee uses a curated word list, so this tool will undoubtedly provide real words that won't be valid
answers. It should be unlikely that a word exists that isn't in this list.

The word list I chose for this, after trying a few, can be found at https://github.com/lorenbrichter/Words

## Tech choices

I tend to use TypeScript for most things nowadays, but I didn't want to add a whole build system like Vite for something
so simple. Instead, I decided to use [esbuild](https://esbuild.github.io/) and a few package.json [pre scripts](https://docs.npmjs.com/cli/v9/using-npm/scripts#pre--post-scripts)
to handle file copying and ensuring the build was fresh. Because the build takes only a few milliseconds, we can build
on each run.

While developing the trie, I wanted to add some testing, and while looking for something that was less heavy than Jest,
I came across [node-tap](https://node-tap.org/). The one big downside to this library is that it pulls in
`@isaacs/import-jsx` which in turn pulls in Babel. It also for some reason comes with `react` as a dependency which I
seriously can't understand. I also had to pull in ts-node in order for it to work with TypeScript,
which again I would have preferred not to have. On the plus side, it does come with NYC/Istanbul and code coverage by
default, which is quite nice. That said, I probably would look elsewhere next time.

## Usage

Clone the repo, run `yarn install` and then `yarn start`. You'll be prompted with instructions.

```sh
> yarn start
yarn run v1.22.15
$ yarn build
$ esbuild src/main.ts --bundle --platform=node --outfile=dst/main.js && cp ./src/*.txt ./dst/

  dst/main.js  1.4mb ⚠️

$ node dst/main.js
? Using the first letter as the key, what letters are in today's puzzle? ADULTIN
Found words:
        aalii
        adit
        adland
        adult
        aida
        aidant
        aitu
        alalia
        ...
```

