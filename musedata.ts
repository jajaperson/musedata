#!/usr/bin/env/deno

import * as JSONC from "https://jspm.dev/jsonc-parser";

const stdinContent = await Deno.readAll(Deno.stdin);
const textContent = new TextDecoder().decode(stdinContent);
const object = <Musedata>JSONC.parse(textContent);

interface Musedata {
  levels: number;
  composer: string;
  class: {
    0: PrimaryClassLevel;
    [k: number]: BasicClassLevel;
  };
}

interface BasicClassLevel {
  number: number;
  name: string;
  display: "arabic" | "roman" | "Roman";
}

interface PrimaryClassLevel extends BasicClassLevel {
  "canon-type": string;
}

// TODO: Transform number based on display
function getWorkName(data: Musedata): string {
  const primary = data.class[0];
  return `${primary.name}, ${primary["canon-type"]} ${primary.number}`;
}

function getSubName(data: Musedata): string {
  const sub = data.class[1];
  return `${sub.number}. ${sub.name}`;
}

function getFullName(data: Musedata): string {
  return `${getWorkName(data)}: ${getSubName(data)}`;
}

console.table({
  work: getWorkName(object),
  sub: getSubName(object),
  full: getFullName(object),
});
