import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
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

  describe("Bets", () => {
    describe("Put", () => {
      it("Should revert bet creation because it does not have enough funds to create bet", async () => {
        const { contract, otherAccount } = await loadFixture(deploy);

        // Put bet with account with no balance.
        const result = contract
          .connect(otherAccount)
          .putBet("1000000", "10", "0");

        await expect(result).to.be.revertedWith(
          "Address does not have enough funds to place bet."
        );
      });
      it("Should revert bet creation because user already has a bet in place.", async () => {
        const { contract, otherAccount } = await loadFixture(deploy);

        // Mint coins to other account address.
        await contract.mint(otherAccount.address, 10);

        // Put Bet with other account.
        await contract.connect(otherAccount).putBet("10", "1", "1");

        // Check the bet is in contract.
        expect(await contract.hasBet(otherAccount.address)).to.be.true;

        // Put another Bet with other account.
        const result = contract.connect(otherAccount).putBet("10", "1", "0");

        // expect to fail be cause address already has bet in place.
        await expect(result).to.be.revertedWith(
          "Address already has a bet in place."
        );
      });
      it("should place a bet & record that it has a bet in place", async () => {
        const { contract, otherAccount } = await loadFixture(deploy);

        // Mint coins to other account address.
        await contract.mint(otherAccount.address, 10);

        // Put Bet with other account.
        await contract.connect(otherAccount).putBet("10", "1", "1");

        // Check the bet is in contract.
        expect(await contract.hasBet(otherAccount.address)).to.be.true;

        const placedBet = await contract.getBet(otherAccount.address);

        expect(placedBet[0]).equals("10");
        expect(placedBet[1]).equals("1");
        expect(placedBet[2]).equals(1);
      });
    });

    describe("Claim", () => {
      it("Should revert bet claim because it does not have a bet in place", async () => {
        const { contract, otherAccount } = await loadFixture(deploy);

        // Put bet with account with no balance.
        const result = contract.connect(otherAccount).claimBet("1000001");

        await expect(result).to.be.revertedWith(
          "Address does not have a bet in place."
        );
      });
      describe("Balance transfer logic", () => {
        it("should be successful - bet going Up actual going up", async () => {
          const { contract, otherAccount } = await loadFixture(deploy);
  
          // Mint coins to other account address.
          await contract.mint(otherAccount.address, 10);
  
          // Put Bet with other account.
          await contract.connect(otherAccount).putBet("20", "1", "1");
  
          // Claim Bet prize successfully.
          await contract.connect(otherAccount).claimBet("21");
  
          // check other account balance.
          const otherAccountBalance = await contract.balanceOf(
            otherAccount.address
          );
  
          expect(otherAccountBalance).to.be.equal(11);
        });
        it("should be un-successful - bet going up actual going down", async () => {
          const { contract, otherAccount } = await loadFixture(deploy);
  
          // Mint coins to other account address.
          await contract.mint(otherAccount.address, 10);
  
          // Put Bet with other account.
          await contract.connect(otherAccount).putBet("20", "1", "1");
  
          // Claim Bet prize successfully.
          await contract.connect(otherAccount).claimBet("18");
  
          // check other account balance.
          const otherAccountBalance = await contract.balanceOf(
            otherAccount.address
          );
  
          expect(otherAccountBalance).to.be.equal(9);
        });
        it("should be successful - bet going down actual going down", async () => {
          const { contract, otherAccount } = await loadFixture(deploy);
  
          // Mint coins to other account address.
          await contract.mint(otherAccount.address, 10);
  
          // Put Bet with other account.
          await contract.connect(otherAccount).putBet("20", "1", "0");
  
          // Claim Bet prize successfully.
          await contract.connect(otherAccount).claimBet("18");
  
          // check other account balance.
          const otherAccountBalance = await contract.balanceOf(
            otherAccount.address
          );
  
          expect(otherAccountBalance).to.be.equal(11);
        });
        it("should be un-successful - bet going down actual going up", async () => {
          const { contract, otherAccount } = await loadFixture(deploy);
  
          // Mint coins to other account address.
          await contract.mint(otherAccount.address, 10);
  
          // Put Bet with other account.
          await contract.connect(otherAccount).putBet("20", "1", "0");
  
          // Claim Bet prize successfully.
          await contract.connect(otherAccount).claimBet("21");
  
          // check other account balance.
          const otherAccountBalance = await contract.balanceOf(
            otherAccount.address
          );
  
          expect(otherAccountBalance).to.be.equal(9);
        });
      })
      it("should emit an Outcome event with the correct values", async () => {
        const { contract, otherAccount } = await loadFixture(deploy);

        // Mint coins to other account address.
        await contract.mint(otherAccount.address, 10);

        // Put Bet with other account.
        await contract.connect(otherAccount).putBet("10", "1", "1");

        // Claim Bet prize successfully.
        await expect(contract.connect(otherAccount).claimBet("11"))
          .to.emit(contract, "Outcome")
          .withArgs(otherAccount.address, 1, "10", "11", "1");
      })
    });
  });
});
