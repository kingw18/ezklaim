import { expect } from "chai";
import hre from "hardhat";
import { parseGwei, keccak256 } from "viem";

describe("ezklaimNoVerify", function () {
  async function deployEzklaimNoVerify() {
    const [account1, account2] = await hre.viem.getWalletClients();
    const ezklaimNoVerify = await hre.viem.deployContract(
      "eZKlaimNoVerify",
      []
    );
    const publicClient = await hre.viem.getPublicClient();
    return {
      ezklaimNoVerify,
      account1,
      account2,
      publicClient,
    };
  }

  describe("Deposits", function () {
    it("Should deposit and store the funds to claim", async function () {
      const { ezklaimNoVerify } = await deployEzklaimNoVerify();
      const depositAmount = parseGwei("100");
      const hash = keccak256("0x1234");
      await ezklaimNoVerify.write.deposit([hash], { value: depositAmount });
      expect(await ezklaimNoVerify.read.balances([hash])).to.equal(
        depositAmount
      );
    });

    it("Should fail to claim if the hash does not have balance", async function () {
      const { ezklaimNoVerify, account1 } = await deployEzklaimNoVerify();
      const hash = keccak256("0x123");
      await expect(
        ezklaimNoVerify.write.claim([hash, account1.account.address])
      ).to.be.rejectedWith("No balance available to claim");
    });

    it("Should send the funds to the claimant", async function () {
      const { ezklaimNoVerify, account2, publicClient } =
        await deployEzklaimNoVerify();
      const depositAmount = parseGwei("100");
      const hash = keccak256("0x1234");
      await ezklaimNoVerify.write.deposit([hash], { value: depositAmount });
      expect(await ezklaimNoVerify.read.balances([hash])).to.equal(
        depositAmount
      );
      const initialBalance = await publicClient.getBalance({
        address: account2.account.address,
      });
      await ezklaimNoVerify.write.claim([hash, account2.account.address]);
      expect(
        await publicClient.getBalance({
          address: account2.account.address,
        })
      ).to.equal(initialBalance + depositAmount);
    });
  });
});
