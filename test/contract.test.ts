/* global describe, it */
import { ethers } from 'hardhat'
import { expect } from 'chai'
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'

describe('Token', () => {
  async function deployContracts () {
    const [deployer, withdrawer] = await ethers.getSigners()
    const tokenFactory = await ethers.getContractFactory('Kamui')
    const tokenContract = await tokenFactory.deploy()

    expect(await tokenContract.totalSupply()).to.eq(ethers.utils.parseEther('1000000'))

    return { deployer, withdrawer, tokenContract }
  }
  describe('deposit', () => {
    it('Should deposit some tokens', async () => {
      const { deployer, tokenContract } = await loadFixture(deployContracts)

      const toDeposit = ethers.utils.parseEther('1')
      const deployerInstance = tokenContract.connect(deployer)
      await deployerInstance.deposit(toDeposit)

      expect(await tokenContract.balanceOf(tokenContract.address)).to.eq(toDeposit)
    })

    it('Should fail to deposit with low balance', async () => {
      const { withdrawer, tokenContract } = await loadFixture(deployContracts)

      const toDeposit = ethers.utils.parseEther('1')
      const withdrawerInstance = tokenContract.connect(withdrawer)

      await expect(withdrawerInstance.deposit(toDeposit)).to.be.revertedWith('ERC20: transfer amount exceeds balance')
    })
  })

  describe('withdraw', () => {
    it('Should withdraw tokens from user', async () => {
      const { deployer, withdrawer, tokenContract } = await loadFixture(deployContracts)

      const toDeposit = ethers.utils.parseEther('1')
      const deployerInstance = tokenContract.connect(deployer)
      await deployerInstance.deposit(toDeposit)

      const withdrawerInstance = tokenContract.connect(withdrawer)
      const toWithdraw = ethers.utils.parseEther('1')

      await withdrawerInstance.withdraw(toWithdraw)
      expect(await withdrawerInstance.balanceOf(withdrawer.address)).to.eq(toWithdraw)
    })

    it('Should fail to withdraw with low balance', async () => {
      const { deployer, withdrawer, tokenContract } = await loadFixture(deployContracts)

      const toDeposit = ethers.utils.parseEther('1')
      const deployerInstance = tokenContract.connect(deployer)
      await deployerInstance.deposit(toDeposit)

      const withdrawerInstance = tokenContract.connect(withdrawer)
      const toWithdraw = ethers.utils.parseEther('10')

      await expect(withdrawerInstance.withdraw(toWithdraw)).to.be.revertedWith('Balance not enough')
    })
  })
})
