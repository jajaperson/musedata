export type NumeralDisplay = "locale" | "arabic" | "roman" | "Roman";

/**
 * Converts a number to a specified numeral style.
 *
 * Supported styles are
 *
 * - `arabic`: arabic
 * - `roman`: roman (lowercase)
 * - `Roman`: roman (uppercase)
 * - `locale`: locale-specific
 *
 * @param `n` - The number to be converted.
 * @param `display` - The numeral style.
 * @throws {RangeError} Thrown if a number cannot be converted to desired
 * style. See {@link basicRoman}.
 * @return `n` in the numeral style.
 */
export function numerals(n: number, display: NumeralDisplay): string {
  if ((n % 1 !== 0 || n < 1 || n > 3999) && ["roman", "Roman"].indexOf(display) > -1 ) {
    throw new RangeError(`Value ${n} cannot be converted to roman numerals.`);
  }

  switch (display) {
    case "locale":
      return n.toLocaleString();
    case "arabic":
      return n.toString();
    case "roman":
      return basicRoman(n);
    case "Roman":
      return basicRoman(n).toUpperCase();
  }
}

/**
 * Get the roman numeral symbol for a specific value.
 * @param `n` - The value of a roman numeral symbol.
 * @return Lowercase character for that value. If `n` is not valid, a `?` is
 * returned instead.
 */
function romanSymbol(n: number): string {
  switch (n) {
    case 1:
      return "i";
    case 5:
      return "v";
    case 10:
      return "x";
    case 50:
      return "l";
    case 100:
      return "c";
    case 500:
      return "d";
    case 1000:
      return "m";
    default:
      return "?";
  }
}

/**
 * Converts an natural number into lowercase roman numeral form.
 * @param `n` - The number to be converted.
 * @throws {RangeError} Argument `n` must be an integer of value  between 1 and
 * 3999 inclusive.
 * @returns `n` in lowercase roman numerals,
 */
export function basicRoman(n: number): string {
  if (n % 1 !== 0 || n < 1 || n > 3999) {
    throw new RangeError(`Value ${n} is not a valid natural number in the defined range.`);
  }

  let digits = getDigits(n);
  let numChunks = new Array<string>();

  digits.map((d, i) => {
    const unit = romanSymbol(10**i);
    const half = romanSymbol((10**i)*5);
    const full = romanSymbol((10**i)*10);

    let chunk = "";

    if (d === 9) {
      chunk += unit + full;
    } else {
      if (d >= 5) {
        chunk += half
      }

      const mod5 = d % 5;

      if (mod5 === 4) {
        chunk += unit + half;
      } else {
        chunk += unit.repeat(mod5);
      }
    }

    numChunks.unshift(chunk);
  });

  return numChunks.join("");
}

/**
 * Get the digits of a number
 @param `n` - The number to convert.
 @returns The digits of `n` in reverse order, lowest to highest place value.
 */
function getDigits(n: number): number[] {
  let result = new Array<number>();
  let nMut = n;

  while (nMut !== 0) {
    let digit = nMut % 10;
    result.push(digit);
    nMut -= digit;
    nMut /= 10;
  }

  return result;
}


