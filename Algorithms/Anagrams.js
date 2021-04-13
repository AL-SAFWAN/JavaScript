/*
check if the rearrange can be form into another 
cinema -> iceman 
helloWorld -> Worldhello
*/

function validAnagram(str1, str2) {
  // is the length the same
  if (str1.length !== str2.length) return false;
  const lookUp = {};

  for (let i = 0; i < str1.length; i++) {
    lookUp[str1[i]] ? (str2[i] += 1) : (lookUp[str1[i]] = 1);
  }

  for (let i = 0; i < str2.length; i++) {
    let letter = str2[i];
    if (lookUp[letter]) {
      lookUp[letter] -= 1;
    } else {
      return false;
    }
  }
  console.log(lookUp);
  //is valid
  return true;
}
console.log(validAnagram("123456", "123456"));
