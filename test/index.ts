import { expect } from "chai";
import { Signer } from "ethers";
import { ethers } from "hardhat";
import { OutliersNFT } from "../typechain";

describe("OutliersNFT", function () {
  let outliersNFT: OutliersNFT;
  let admin: Signer;
  let minter: Signer;
  let nonApprovedMinter: Signer;
  let minterRole: string;

  const TOKEN_NAME = "OutliersNFT";
  const TOKEN_SYMBOL = "OUTLIERS";

  beforeEach("deploy contract", async function () {
    // get signers
    [admin, minter, nonApprovedMinter] = await ethers.getSigners();

    // deploy contract
    const OutliersNFT = await ethers.getContractFactory("OutliersNFT");
    outliersNFT = await OutliersNFT.deploy(
      await admin.getAddress(),
      TOKEN_NAME,
      TOKEN_SYMBOL
    );

    minterRole = await outliersNFT.MINTER_ROLE();
  });

  it("authorized minters should be able to mint exactly once", async function () {
    // Authorize mint
    await outliersNFT
      .connect(admin)
      .grantRole(minterRole, await minter.getAddress());

    // Mint once
    await outliersNFT.connect(minter).mint();

    // Check that minter owns the newly minted token
    const owner = await outliersNFT.ownerOf(0);
    expect(owner).to.equal(await minter.getAddress());

    // Mint again
    const mintTx = outliersNFT.connect(minter).mint();
    await expect(mintTx).to.be.revertedWith(
      "OutliersNFT: must have minter role to mint"
    );
  });

  it("unauthorized minters should not be allowed to mint", async function () {
    // Authorize mint
    await outliersNFT
      .connect(admin)
      .grantRole(minterRole, await minter.getAddress());

    // Mint from different address should fail
    const mintTx = outliersNFT.connect(nonApprovedMinter).mint();
    await expect(mintTx).to.be.revertedWith(
      "OutliersNFT: must have minter role to mint"
    );
  });

  it("baseURI doesn't work for un-minted tokens", async function () {
    const tx = outliersNFT.tokenURI(1234);
    await expect(tx).to.be.revertedWith(
      "OutliersNFT: URI query for nonexistent token"
    );
  });

  it("baseURI works as expected for minted tokens", async function () {
    // Mint
    await outliersNFT
      .connect(admin)
      .grantRole(minterRole, await minter.getAddress());
    await outliersNFT.connect(minter).mint();

    // Set base URL
    const baseURL = "http://example.com/";
    await outliersNFT.connect(admin).setBaseURI(baseURL);

    // Query token URI
    const tokenURI = await outliersNFT.tokenURI(0);
    expect(tokenURI).to.eq(`${baseURL}0`);
  });
});
