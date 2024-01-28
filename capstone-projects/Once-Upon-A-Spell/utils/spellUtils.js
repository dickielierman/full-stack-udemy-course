// utils/spellUtils.js
export const sortSpells = (a, b) => {
  const levelA = a.data.level || 0;
  const levelB = b.data.level || 0;
  const nameA = a.name.toLowerCase();
  const nameB = b.name.toLowerCase();

  if (levelA !== levelB) {
    return levelA - levelB;
  } else {
    return nameA.localeCompare(nameB);
  }
};
