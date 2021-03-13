const TurnToHump = (underlineStr) => {
  return underlineStr.split('_').filter(x => x).map((word, index) => {
    if (index === 0) return word.toLowerCase();
    const tail = word.slice(1).toLowerCase();
    return word[0].toUpperCase() + tail; 
  }).join("");
}
console.log(TurnToHump('_world__hello_'));