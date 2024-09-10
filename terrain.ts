export type Terrain = 'asphalt' | 'dirt' | 'grass' | 'cobblestone' | 'building';

export const terrainCosts: Record<Terrain, number> = {
  asphalt: 1,
  dirt: 3,
  grass: 5,
  cobblestone: 10,
  building: Infinity, // Não pode atravessar
};

const prisonMap: Terrain[][] = [
  // Mapa 42x42 representando os tipos de terreno
];
