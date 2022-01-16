
//TODO: maybe make table?
export const SET_TYPES = ["Welcome to Wrathe", "Arcane Rising", "Crucible of War", "Monarch", "Tales of Aria", "Everfest"];
export type SetType = typeof SET_TYPES[number];
export const TALENT_TYPES = ["Light", "Shadow", "Ice", "Lightning", "Earth", "Elemental"];
export type TalentType = typeof TALENT_TYPES[number];
export const CLASS_TYPES = ["Warrior", "Brute", "Guardian", "Ninja", "Mechanologist", "Runeblade", "Ranger", "Wizard", "Illusionist", "Merchant", "Shapeshifter", "Generic", "Not Classed"];
export type ClassType = typeof CLASS_TYPES[number];
export const RARITY_TYPES = ["Common", "Rare", "Super Rare", "Majestic", "Legendary", "Fabled"];
export type RarityType = typeof RARITY_TYPES[number];
export const CARD_TYPES = ["'Non-Attack' Action", "Attack Action", "Attack Reaction", "Defense Reaction", "Equipment", "Hero", "Instant", "Item", "Weapon"];
export type CardType = typeof CARD_TYPES[number];

export type Card = {
  name: string;
  cost: number;
  pitch: number;
  cardText: string;
  setName: SetType;
  talent: TalentType;
  class: ClassType;
  rarity: RarityType;
  seq: number;
  text: string;
  cardType: CardType;
}