export  function convertNumber(value){
    return parseInt(value, 10);
}

export function truncateString(text, maxLength = 50) {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  }