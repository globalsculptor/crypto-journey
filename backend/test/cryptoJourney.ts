import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";

describe("Crypto Journey", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploy() {
    // Deployment assumptions
    const name = "CryptoJourney";
    const symbol = "JRNY";
    const initialSupply = 10;
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Factory = await ethers.getContractFactory("CryptoJourney");
    const contract = await Factory.deploy(name, symbol, initialSupply);

    return { contract, name, symbol, initialSupply, owner, otherAccount };
  }

  describe("Deployment", () => {
    it("Should set the right name", async () => {
      const { contract, name } = await loadFixture(deploy);

      expect(await contract.name()).to.equal(name);
    });

    it("Should set the right symbol", async () => {
      const { contract, symbol } = await loadFixture(deploy);

      expect(await contract.symbol()).to.equal(symbol);
    });

    it("Should set the right initial supply", async () => {
      const { contract, initialSupply, owner } = await loadFixture(deploy);

      const ownerBalance = await contract.balanceOf(owner.address);

      const decimals = await contract.decimals();
      const expectedBalance = initialSupply * 10 ** decimals;

      expect(ownerBalance).to.equal(BigNumber.from(expectedBalance.toString()));
    });
  });

  // TODO() Test bets.
  // TODO() Test token transfers.

  // describe("Withdrawals", function () {
  //   describe("Validations", function () {
  //     it("Should revert with the right error if called too soon", async function () {
  //       const { lock } = await loadFixture(deploy);

  //       await expect(contract.withdraw()).to.be.revertedWith(
  //         "You can't withdraw yet"
  //       );
  //     });

  //     it("Should revert with the right error if called from another account", async function () {
  //       const { contract, unlockTime, otherAccount } = await loadFixture(
  //         deploy
  //       );

  //       // We can increase the time in Hardhat Network
  //       await time.increaseTo(unlockTime);

  //       // We use contract.connect() to send a transaction from another account
  //       await expect(contract.connect(otherAccount).withdraw()).to.be.revertedWith(
  //         "You aren't the owner"
  //       );
  //     });

  //     it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
  //       const { contract, unlockTime } = await loadFixture(
  //         deploy
  //       );

  //       // Transactions are sent using the first signer by default
  //       await time.increaseTo(unlockTime);

  //       await expect(contract.withdraw()).not.to.be.reverted;
  //     });
  //   });

  //   describe("Events", function () {
  //     it("Should emit an event on withdrawals", async function () {
  //       const { contract, unlockTime, lockedAmount } = await loadFixture(
  //         deploy
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(contract.withdraw())
  //         .to.emit(contract, "Withdrawal")
  //         .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
  //     });
  //   });

  //   describe("Transfers", function () {
  //     it("Should transfer the funds to the owner", async function () {
  //       const { contract, unlockTime, lockedAmount, owner } = await loadFixture(
  //         deploy
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(contract.withdraw()).to.changeEtherBalances(
  //         [owner, lock],
  //         [lockedAmount, -lockedAmount]
  //       );
  //     });
  //   });
  // });
});
