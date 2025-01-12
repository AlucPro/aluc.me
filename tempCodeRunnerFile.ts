function checkInclusion(s1: string, s2: string): boolean {
  const len1=s1.length, len2=s2.length;
  if(len2<len1) return false;

  const hashMap = Array(26).fill(0);
  let cnt=0;
  const setToMap = (char: string, isAdd: boolean) => {
    const index = char.charCodeAt(0)-'a'.charCodeAt(0);
    isAdd ? hashMap[index]++ : hashMap[index]--;
    isAdd ? cnt++ : cnt--;
    return hashMap[index];
  }
  const isAllZero = () => {
    return hashMap.every((item) => item ===0);
  }
  for(let i=0;i<len1;i++) {
    const ret = setToMap(s1.charAt(i), false);
  }

  for(let i=0; i<len1;i++) {
    setToMap(s2.charAt(i), true)
  }
  if(isAllZero()) return true;

  for(let i=len1; i<len2; i--) {
    setToMap(s2.charAt(i), true)
    setToMap(s2.charAt(i-len1), false)
    if(isAllZero()) return true;
  }

  return false;
};



console.log(checkInclusion('ab', "eidbaooo"))