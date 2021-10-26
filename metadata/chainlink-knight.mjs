import fs from 'fs';
import { File } from 'nft.storage'

const knight = {
  name: "Jim",
  description: "Jim is jamming",
  image: new File([ await fs.promises.readFile('/Users/zak/Documents/NFTDemo-HH/images/Chainlink_Knight.png')], 'Chainlink_Knight.png',
  { type: 'image/png'
}),
  attributes: [
    { trait_type: "Strength", value: 40 },
    { trait_type: "Dexterity", value: 99 },
    { trait_type: "Constitution", value: 0 },
    { trait_type: "Intelligence", value: 64 },
    { trait_type: "Wisdom", value: 87 },
    { trait_type: "Charisma", value: 15 },
    { trait_type: "Experience", value: 0 },
  ],
};

export default knight;