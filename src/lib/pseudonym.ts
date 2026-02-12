const firstWords = [
  "Stille",
  "Trouwe",
  "Dankbare",
  "Hoopvolle",
  "Biddende",
  "Zachte",
  "Lichtende",
  "Vredevolle",
  "Wakende",
  "Nederige",
];

const secondWords = [
  "Wateren",
  "Herder",
  "Visser",
  "Duif",
  "Ceder",
  "Akker",
  "Pelgrim",
  "Bron",
  "Olijf",
  "Wachter",
];

function randomFrom<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

function generatePseudonym() {
  const number = Math.floor(Math.random() * 90) + 10;
  return `${randomFrom(firstWords)}_${randomFrom(secondWords)}_${number}`;
}

export async function generateUniquePseudonym(
  existsCheck: (candidate: string) => Promise<boolean>
) {
  for (let attempt = 0; attempt < 12; attempt++) {
    const candidate = generatePseudonym();
    const exists = await existsCheck(candidate);
    if (!exists) {
      return candidate;
    }
  }

  return `Pelgrim_${Date.now().toString().slice(-6)}`;
}
