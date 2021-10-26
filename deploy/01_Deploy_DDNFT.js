let {networkConfig} = require('../helper-hardhat-config')

module.exports = async ({
  getNamedAccounts,
  deployments,
  getChainId
}) => {

  const { deploy, get, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = await getChainId()
  let linkTokenAddress
  let vrfCoordinatorAddress
  let ethUsdPriceFeedAddress
  let additionalMessage = ""

  if (chainId == 31337) {
    linkToken = await get('LinkToken')
    VRFCoordinatorMock = await get('VRFCoordinatorMock')
    linkTokenAddress = linkToken.address
    vrfCoordinatorAddress = VRFCoordinatorMock.address
    additionalMessage = " --linkaddress " + linkTokenAddress
    const EthUsdAggregator = await deployments.get('EthUsdAggregator')
    ethUsdPriceFeedAddress = EthUsdAggregator.address
  } else {
    linkTokenAddress = networkConfig[chainId]['linkToken']
    vrfCoordinatorAddress = networkConfig[chainId]['vrfCoordinator']
    ethUsdPriceFeedAddress = networkConfig[chainId]['ethUsdPriceFeed']
  }
  const keyHash = networkConfig[chainId]['keyHash']
  const fee = networkConfig[chainId]['fee']

  const dungeonsDragons = await deploy('DungeonsAndDragonsCharacter', {
    from: deployer,
    args: [vrfCoordinatorAddress, linkTokenAddress, keyHash, ethUsdPriceFeedAddress], 
    log: true
  })

  log("Run the following command to fund contract with LINK:")
  log("npx hardhat fund-link --contract " + dungeonsDragons.address + " --network " + networkConfig[chainId]['name'] + additionalMessage)
  log("To generate a character run the following:")
  log("npx hardhat generate-character --contract " + dungeonsDragons.address + " --name InsertNameHere " +  " --network " + networkConfig[chainId]['name'])
  log("To get a character's details as metadata run the following:")
  log("npx hardhat create-metadata --contract " + dungeonsDragons.address + " --network " + networkConfig[chainId]['name'])
  log("----------------------------------------------------")
}

module.exports.tags = ['all', 'D&D']
