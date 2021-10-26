const fs = require('fs')
require("@nomiclabs/hardhat-web3");

task("create-metadata", "Create metadata for all created characters")
    .addParam("contract", "The address of the contract that you want to call")
    .setAction(async taskArgs => {

    const contractAddr = taskArgs.contract

    //Get signer information
    const accounts = await hre.ethers.getSigners()
    const signer = accounts[0]

const metadataTemple = {
    "name": "",
    "description": "",
    "image": "",
    "attributes": [
        {
            "trait_type": "Strength",
            "value": 0
        },
        {
            "trait_type": "Dexterity",
            "value": 0
        },
        {
            "trait_type": "Constitution",
            "value": 0
        },
        {
            "trait_type": "Intelligence",
            "value": 0
        },
        {
            "trait_type": "Wisdom",
            "value": 0
        },
        {
            "trait_type": "Charisma",
            "value": 0
        },
        {
            "trait_type": "Experience",
            "value": 0
        }
    ]
}
    const dungeonsDragonsContract = await ethers.getContractAt('DungeonsAndDragonsCharacter', contractAddr)
    length = await dungeonsDragonsContract.getNumberOfCharacters()
    index = 0
    while (index < length) {
        console.log('Let\'s get the overview of your character ' + index + ' of ' + length)
        let characterMetadata = metadataTemple
        let characterOverview = await dungeonsDragonsContract.characters(index)
        index++
        characterMetadata['name'] = characterOverview['name']
        if (fs.existsSync('metadata/' + characterMetadata['name'].toLowerCase().replace(/\s/g, '-') + '.json')) {
            console.log('test')
            continue
        }
        console.log(characterMetadata['name'])
        console.log(characterOverview['strength'].toNumber())
        characterMetadata['attributes'][0]['value'] = characterOverview['strength'].toNumber()
        characterMetadata['attributes'][1]['value'] = characterOverview['dexterity'].toNumber()
        characterMetadata['attributes'][2]['value'] = characterOverview['constitution'].toNumber()
        characterMetadata['attributes'][3]['value'] = characterOverview['intelligence'].toNumber()
        characterMetadata['attributes'][4]['value'] = characterOverview['wisdom'].toNumber()
        characterMetadata['attributes'][5]['value'] = characterOverview['charisma'].toNumber()
        filename = 'metadata/' + characterMetadata['name'].toLowerCase().replace(/\s/g, '-')
        let data = JSON.stringify(characterMetadata)
        fs.writeFileSync(filename + '.mjs', data)
        console.log("Run the following to set the URIs for your NFTs:")
        console.log("npx hardhat set-uri --contract " + contractAddr + " --tokenid InsertIdHere" + " --uri insertURIHere" + " --network " + network.name)
    }
})

module.exports = {}