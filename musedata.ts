#!/usr/bin/env deno run

import * as JSONC from "https://jspm.dev/jsonc-parser";

import { numerals, NumeralDisplay } from "./lib/numeral.ts";

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
  display: NumeralDisplay;
}

interface PrimaryClassLevel extends BasicClassLevel {
  prefix: string;
}

// TODO: Transform number based on display
function getWorkName(data: Musedata): string {
  const primary = data.class[0];
  return `${primary.name}, ${primary.prefix} ${numerals(primary.number, primary.display)}`;
}

function getSubName(data: Musedata): string {
  const sub = data.class[1];
  return `${numerals(sub.number, sub.display)}. ${sub.name}`;
}

function getFullName(data: Musedata): string {
  return `${getWorkName(data)}: ${getSubName(data)}`;
}

console.table({
  work: getWorkName(object),
  sub: getSubName(object),
  full: getFullName(object),
});
