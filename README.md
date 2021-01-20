# Musedata

It's a working title and this is definitely a work in progress. This is probably
some of the worst code I've ever written, I was just trying to quickly prototype
the idea.

## So what is this then

Basically its a json format for classifying/labelling classical music.

The way **classical** music is labeled on most streaming platforms kind of
sucks. It can be kind of hard to find what you are looking for, even when you
know _exactly_ what it is. This is weird, because classical music has a very
orderly naming system --- most composers order there works canonically into
"opuses" or something equivelant, and if these contain multiple pieces (for
example the movements of a concerto or the prèludes in a set of prèludes) each
of these are usually given numbers. So you'd think it would be super easy and
convenient to find a recording of a composition if you have the opus number and
composer's name. Unfortunately the search bars of streaming apps don't seem to
understand the classical system. Which I find super frustrating.

So this project aims to put the classical system in a machine-readable metadata
form, which can then generate the display name of the piece (which is what the
deno program currently does, really badly). Do I expect this to ever get
adopted? Nope.

## Usage

See the example metadata files in [`examples/`](examples/) directory.
`musedata.ts` currently outputs three versions of the piece name.

- The name of the work
- The name of the piece within the work
- The full name with the piece and its work

To run `musedata.ts`

```sh
$ cat examples/$filename | ./musedata.ts
```

## Status

Currently this is really bad. Doesn't support many other styles of naming
classical pieces, and most things are hardcoded. This was just an experiment.


