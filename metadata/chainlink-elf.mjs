import fs from 'fs';
import { File } from 'nft.storage'

const elf = {
  name: "Alice",
  description: "Alice is awesome",
  image: new File([ await fs.promises.readFile('/Users/zak/Documents/NFTDemo-HH/images/Chainlink_Elf.png')], 'Chainlink_Elf.png',
  { type: 'image/png'
}),
  attributes: [
    { trait_type: "Strength", value: 40 },
    { trait_type: "Dexterity", value: 26 },
    { trait_type: "Constitution", value: 76 },
    { trait_type: "Intelligence", value: 18 },
    { trait_type: "Wisdom", value: 24 },
    { trait_type: "Charisma", value: 19 },
    { trait_type: "Experience", value: 0 },
  ],
};

export default elf;
