const getTranslations = (transform) => {
  // 'translate(20px, 20px)'
  const matches = [...transform.matchAll(/\d+/g)];
  return matches.map((e) => e[0]);
};
const transform = "translate(20px, 20px)";
getTranslations(transform);
