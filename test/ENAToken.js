const { assert } = require("chai");
const ENAToken = artifacts.require("ENAToken");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract('ENAToken', (accounts) => {
  let contract;

  before(async () => {
    contract = await ENAToken.deployed();
  });

  describe("At Deployment", async () => {
    
    it("...successfully deployed", async () => {
      const address = contract.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

  });

  describe("Checking ENAToken contract deployment details", async () => {
    
    it("...correct contract name", async () => {
      const name = await contract.name();
      assert.equal(name, "Earnathon Token", "Wrong Naming");
    });

    it("...has the correct symbol", async () => {
      const symbol = await contract.symbol();
      assert.equal(symbol, "ENA", "Worng Token Symbol");
    });

    it("...total ENA Token total supply", async () => {
      const amount = await contract.totalSupply();
      assert.equal(amount, "100000000000000000", "Total suppy is not upto 1 billion");
    });

  });

  describe("ERC20 Functions: Should send tokens correctly", async () => {

    it("...transfer ", async () => {
      const result = await contract.transfer(accounts[1], '100000000000');      //1000
      const bal = await contract.balanceOf(accounts[1]);
      assert.equal(bal.toString(), '100000000000');       //1000
      
      const event = result.logs[0].args;
      assert.equal(event.value, '100000000000', 'Transfered amount is not correct'); //1000
    });

    it("...approve amount", async () => {
      const result = await contract.approve(accounts[2], '10000000000', {from: accounts[1]} ); //100
      const event = result.logs[0].args;
      
      assert.equal(event.value, '10000000000', 'Approved amount is not correct'); //100
    });

    it("...approve increment", async () => {
      const result = await contract.increaseApproval(accounts[2], '20000000000', {from: accounts[1]} ); //200
      const event = result.logs[0].args;
      
      assert.equal(event.value, '30000000000', 'Approved amount increment is not correct'); //200
    });

    it("...approve decrement", async () => {
      const result = await contract.decreaseApproval(accounts[2], '10000000000', {from: accounts[1]} ); //100
      const event = result.logs[0].args;
      
      assert.equal(event.value, '20000000000', 'Approved amount decrement is not correct'); //100
    });

    it("...allowance ", async () => {
      const result = await contract.allowance(accounts[1], accounts[2], { from: accounts[2] });
      assert.equal(result.toString(), '20000000000', 'Allowed amount is not correct'); //100FMY
    });

    it("...transferFrom ", async () => {
      const result = await contract.transferFrom(accounts[1], accounts[3], '10000000000', { from: accounts[2] }); //10FMY
      const bal = await contract.balanceOf(accounts[3]);

      assert.equal(bal.toString(), '10000000000', "Wrong TransferFrom Balance");
      
      const event = result.logs[0].args;
      assert.equal(event.value.toString(), '10000000000', 'TransferFrom amount not correct');
    });
    
    it("...burn token by the user", async () => {
      const result = await contract.burn('10000000000',  { from: accounts[0] });
      const bal = await contract.balanceOf(accounts[0]);
      assert.equal(bal.toString(), '99999890000000000');
      
      const event = result.logs[0].args;
      assert.equal(event.value, '10000000000', 'Burnt amount is not correct');
    });

  });

  describe("Operations Management: Ownership and Pausable", async () => {
    
    it("...transfer contract ownership", async () => {
      const result = await contract.transferOwnership(accounts[4], { from: accounts[0] });
    
      const event = result.logs[0].args;
      assert.equal(event.newOwner, accounts[4], 'Proposed address is not correct');
    });

  //   it("...Pause contract for Emergencies", async () => {
  //     const result = await contract.pause()({ from: accounts[0] });
  
  //     const event = result.logs[0].args;
  //     assert.equal(event, Pause, 'Proposed address is not correct');
  //   });

  //   it("...Unpause contract for Emergencies", async () => {
  //     const result = await contract.unpause({ from: accounts[0] });
    
  //     const event = result.logs[0].args;
  //     assert.equal(event, unpause, 'Proposed address is not correct');
  //   });

  //   it("...approve and call functions", async () => {
  //     const result = await contract.approveAndCall(account[3], "1000000000000000000", "Testing" , { from: accounts[0] });
  
  //     const event = result.logs[0].args;
  //     assert.equal(event, unpause, 'Proposed address is not correct');
  //   });

  //   it("...transfer ERC20Token of any Contract", async () => {
  //     const result = await contract.transferAnyERC20Token( accounts[5], accounts[3], "100000000000000000000", { from: accounts[0] });
    
  //     const event = result.logs[0].args;
  //     assert.equal(event, unpause, 'Proposed address is not correct');
  //   });

  });

});
