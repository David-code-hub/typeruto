const ninjaSpeedRanks = [
  {
    rank: "Academy Student",
    description:
      "The beginner level for aspiring ninjas. Your typing speed is slow and deliberate, as you’re still learning the basics of accuracy and consistency.",
    speed: "0-25",
    ninjas: ["Konohamaru Sarutobi", "Moegi Kazamatsuri", "Udon Ise"],
  },
  {
    rank: "Genin",
    description:
      "The first step towards becoming a true ninja. Your typing speed is improving, but there’s still room for growth as you learn new techniques.",
    speed: "26-50",
    ninjas: ["Naruto Uzumaki", "Sakura Haruno", "Sasuke Uchiha"],
  },
  {
    rank: "Chūnin",
    description:
      "A mid-level ninja who demonstrates leadership and competence. Your typing speed is steady and reliable, suitable for handling more advanced challenges.",
    speed: "51-75",
    ninjas: ["Shikamaru Nara", "Neji Hyuga", "Rock Lee"],
  },
  {
    rank: "Special Jōnin",
    description:
      "A specialist ninja with expertise in specific skills. Your typing speed is precise and targeted, perfect for specific tasks requiring focus and accuracy.",
    speed: "76-100",
    ninjas: ["Ibiki Morino", "Anko Mitarashi", "Hayate Gekkō"],
  },
  {
    rank: "Jōnin",
    description:
      "An elite ninja with advanced skills and experience. Your typing speed is fast and consistent, showcasing mastery over both speed and accuracy.",
    speed: "101-125",
    ninjas: ["Kakashi Hatake", "Asuma Sarutobi", "Might Guy"],
  },
  {
    rank: "Kage",
    description:
      "The leader of the village and the pinnacle of ninja excellence. Your typing speed is legendary, showcasing unparalleled precision and speed.",
    speed: "126-150",
    ninjas: ["Hashirama Senju", "Minato Namikaze", "Tsunade Senju"],
  },
  {
    rank: "S-Class",
    description:
      "An exceptional ninja, often considered the best of the best. Your typing speed transcends normal limits, making you a true legend in the typing world.",
    speed: "151+",
    ninjas: ["Madara Uchiha", "Itachi Uchiha", "Pain (Nagato)"],
  },
];

export const getRank = async (speed: number) => {
  const currentRank =
    speed >= 151
      ? ninjaSpeedRanks[6] //highest rank
      : ninjaSpeedRanks.filter((rank) => {
          const [min, max] = rank.speed.split("-");
          if (speed >= parseInt(min) && speed <= parseInt(max)) {
            return rank;
          }
        })[0];

  const currentNinja = getRankNinja(currentRank);
  return {
    rank: currentRank,
    ninja: currentNinja,
  };
};

export const getRankNinja = (currentRank: any) => {
  return currentRank.ninjas[Math.floor(Math.random() * 3)];
};
