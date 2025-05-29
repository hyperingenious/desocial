export function formatDateToCustomString(isoString: string) {
  const date = new Date(isoString);

  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const dayMonthYear = date.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return `${time} · ${dayMonthYear}`;
}

export function intToRoman(num: number) {
  const romanNumerals = [
    { value: 1000, symbol: "M" },
    { value: 900, symbol: "CM" },
    { value: 500, symbol: "D" },
    { value: 400, symbol: "CD" },
    { value: 100, symbol: "C" },
    { value: 90, symbol: "XC" },
    { value: 50, symbol: "L" },
    { value: 40, symbol: "XL" },
    { value: 10, symbol: "X" },
    { value: 9, symbol: "IX" },
    { value: 5, symbol: "V" },
    { value: 4, symbol: "IV" },
    { value: 1, symbol: "I" },
  ];

  let roman = "";

  for (let i = 0; i < romanNumerals.length; i++) {
    const { value, symbol } = romanNumerals[i];
    while (num >= value) {
      roman += symbol;
      num -= value;
    }
  }

  return roman;
}
