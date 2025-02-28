export {};

declare global {
  type narutoQuote = {
    quote: string;
    character: string;
  };

  type currentRank = {
    rank: string;
    description: string;
    speed: string;
    ninjas: Array<string>;
  };

  type showUserCurrentRank = {
    rank: currentRank;
    ninja: string;
  };
}
