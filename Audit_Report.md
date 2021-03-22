# Audit Report for Earnathon Token

#### `Prepared by Etienne Okeke (okeke_etienne@yahoo.com)`

Earnathon Token contract is a simple but standard ERC20 Token contract type with extra functions which inclucds:
Increase Aproval
Decrease Aproval
Tranasfering ERC20 Tokens on other ERC20 contract types
etc

## Audit Obversations:

- It implemented all the functions of an ERC20 Token from an Interface
- The contract comopiles successfully.
- Contract was not properly locked to its specific version
- Change in allowance in the transferFrom function should come before changes in the Balances.
- Proper comments were not found on some functions like approveAndCall and transferAnyERC20Token.

## Recommendations:

- isOwner function can be added to the Ownable Contract to help determine the contract owner with a boolean value
- In case of any emergency, a circut breaker should be added to help freeze the contract state.
- Proper comments should be place in all the appropriate places.
- The contract should be properly lock with the Caret symbol
- The approveAndCall function should be comment and reviewed to understand what this function really does because the receiveApproval function in the TokenRecipent Interface was not implemented (Maybe it calls a function in another contract, if so the it should take that contract address and not the spender address).

## Slither Analysis:

- 0 High Risk
- 1 Medium Risk: The function `transferAnyERC20Token` ignores the return value of the line `ERC20(_tokenAddress).transfer(_to,_amount)`
- 0 Low Risk

## Conclusion

In this audit, we thoroughly analyzed the provided ENA Token contract and this audited contract does involve various intricacies in design. The current code base has been organized to some degree and the identified issues are not yet promptly fixed. Meanwhile, we need to emphasize that smart contracts as a whole are still in an early.

To improve this report, we greatly appreciate any constructive feedbacks or suggestions, on its methodology, audit findings, or potential gaps in scope/coverage. Thanks
