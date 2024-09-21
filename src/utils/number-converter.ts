export const convertNumberToBengaliChars = (number: number): string => {
  const bengaliLetters = ["ক", "খ", "গ", "ঘ", "ঙ", "চ", "ছ", "জ", "ঝ", "ঞ"];

  return number
    .toString() // Convert number to string
    .split("") // Split the number into individual characters
    .map((digit) => (/[0-9]/.test(digit) ? bengaliLetters[+digit - 1] : digit)) // Map digits to Bengali letters, keep non-digit characters unchanged
    .join(""); // Join the result back into a string
};

const convertNumberToBengaliNumber = (number: number): string => {
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

  return number
    .toString() // Convert number to string
    .split("") // Split the number into individual characters
    .map((digit) => (/[0-9]/.test(digit) ? bengaliDigits[+digit] : digit)) // Map digits to Bengali, keep non-digit characters unchanged
    .join(""); // Join the result back into a string
};

export const convertNumberToRoman = (number: number): string => {
  const romanNumber = number.toString().replace(/\d/g, (d) => {
    const romanNumerals = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
    return romanNumerals[parseInt(d)];
  });
  return romanNumber;
};

export const convertNumberToSmallRoman = (number: number): string => {
  const romanNumber = number.toString().replace(/\d/g, (d) => {
    const romanNumerals = ["", "i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix"];
    return romanNumerals[parseInt(d)];
  });
  return romanNumber;
};

export const convertNumberToSmallEnglishChars = (number: number): string => {
  const letters = "abcdefghijklmnopqrstuvwxyz"; // Small English letters from a to z

  return number
    .toString() // Convert number to string
    .split("") // Split the number into individual digits
    .map((digit) => (/[0-9]/.test(digit) ? letters[+digit - 1] : digit)) // Map each digit to its corresponding letter
    .join(""); // Join the result back into a string
};

export const convertNumberToCapitalEnglishChars = (number: number): string => {
  const capitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Capital English letters from A to Z

  return number
    .toString() // Convert the number to a string
    .split("") // Split the number into individual digits
    .map((digit) => (/[0-9]/.test(digit) ? capitalLetters[+digit - 1] : digit)) // Map each digit to its corresponding capital letter
    .join(""); // Join the result back into a string
};

export const convertNumber = (number: number, type: string): string => {
  switch (type) {
    case "bangle":
      return convertNumberToBengaliChars(number);
    case "bengaliNumber":
      return convertNumberToBengaliNumber(number);
    case "roman":
      return convertNumberToRoman(number);
    case "smallRoman":
      return convertNumberToSmallRoman(number);
    case "smallEnglish":
      return convertNumberToSmallEnglishChars(number);
    case "capitalEnglish":
      return convertNumberToCapitalEnglishChars(number);
    default:
      return "" + number;
  }
};
