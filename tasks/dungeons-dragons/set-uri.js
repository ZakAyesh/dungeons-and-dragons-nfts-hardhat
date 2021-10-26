task("set-uri", "Set URI for an NFT")
    .addParam("contract", "The address of the contract that you want to call")
    .addParam("tokenid", "The address of the contract that you want to call")
    .addParam("uri", "URI of NFT")
    .setAction(async taskArgs => {

        const contractAddr = taskArgs.contract
        const networkId = network.name
        console.log("Setting URI for NFTs ", contractAddr, " on network ", networkId)
        const DungeonsDragons = await ethers.getContractFactory("DungeonsAndDragonsCharacter")

        //Get signer information
        const accounts = await hre.ethers.getSigners()
        const signer = accounts[0]

        //Create connection to VRF Contract and call the getRandomNumber function
        const dungeonsDragonsContract = new ethers.Contract(contractAddr, DungeonsDragons.interface, signer)
        var result = await dungeonsDragonsContract.setTokenURI(taskArgs.tokenid,taskArgs.uri)
        console.log('Contract ', contractAddr, ' URIs have been set. Transaction Hash: ', result.hash)
        console.log("Go to https://testnets.opensea.io/ with your MetaMask to see your NFTs!")
    })

module.exports = {}
