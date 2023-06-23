//api anfrage + return wörter von server
export const fetchWords = async () => {
  const request = await fetch("https://random-word-api.herokuapp.com/all");
  //wenn ich hier andere api verwenden möchte-> https://random-word-api.herokuapp.com/all
  // ohne index.mjs
  return await request.json();
};
export const randomWord = (words) => {
  return words[Math.floor(Math.random() * words.length)];
};
