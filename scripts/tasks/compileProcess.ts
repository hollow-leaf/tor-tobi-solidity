import { task } from 'hardhat/config'

task('compile:cairo', 'Deploy Cairo0 Contract')
  .setAction(async (_, hre) => {
    console.log(hre.starknet.network)
    await hre.run('starknet-compile-deprecated', {
      paths: ['contracts/flatten/warp_output/KamuiFlatten.sol/ERC20.cairo'],
    })
  })
