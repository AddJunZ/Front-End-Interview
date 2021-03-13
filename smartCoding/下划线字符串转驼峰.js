// 1. 常规做法
const TurnToHump = (underlineStr) => {
  return underlineStr.split('_').filter(x => x).map((word, index) => {
    word = word.toLowerCase();
    if (index === 0) return word;
    const tail = word.slice(1);
    return word[0].toUpperCase() + tail;
  }).join("");
}

console.log(TurnToHump('_world__he_allo_'));