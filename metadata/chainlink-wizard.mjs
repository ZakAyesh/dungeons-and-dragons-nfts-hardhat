import fs from 'fs';
import { File } from 'nft.storage'

const wizard = {
  name: "Chainlink Wizard",
  description: "Brilliant spell-slinger and magical with cryptography. Often uses Jewles in her h-index potions.",
  image: new File([ await fs.promises.readFile('/Users/zak/Documents/NFTDemo-HH/images/Chainlink_Wizard.png')], 'Chainlink_Wizard.png',
  { type: 'image/png'
}),
  attributes: [
    { trait_type: "Strength", value: 40 },
    { trait_type: "Dexterity", value: 27 },
    { trait_type: "Constitution", value: 53 },
    { trait_type: "Intelligence", value: 15 },
    { trait_type: "Wisdom", value: 3 },
    { trait_type: "Charisma", value: 23 },
    { trait_type: "Experience", value: 0 },
  ],
};

export default wizard;
