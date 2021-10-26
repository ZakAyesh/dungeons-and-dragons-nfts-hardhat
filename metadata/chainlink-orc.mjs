import fs from 'fs';
import { File } from 'nft.storage'

const orc = {
  name: "Chainlink Orc",
  description: "This green tweeting machine is one of the most exciting and excited creatures on the planet. Don't let his looks fool you, he loves to love new technology and help others get involved. Loves watching 'JSON Parser'",
  image: new File([ await fs.promises.readFile('/Users/zak/Documents/NFTDemo-HH/images/Chainlink_Orc.png')], 'Chainlink_Orc.png',
  { type: 'image/png'
}),
  attributes: [
    { trait_type: "Strength", value: 40 },
    { trait_type: "Dexterity", value: 14 },
    { trait_type: "Constitution", value: 55 },
    { trait_type: "Intelligence", value: 1 },
    { trait_type: "Wisdom", value: 18 },
    { trait_type: "Charisma", value: 83 },
    { trait_type: "Experience", value: 0 },
  ],
};

export default orc;