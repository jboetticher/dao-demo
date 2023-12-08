export default [
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "members_",
        "type": "address[]"
      },
      {
        "internalType": "address",
        "name": "glacisTokenRouter_",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "glacisRouter_",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "owner_",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "GlacisAccessControlClient__RouteAlreadyAdded",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "GlacisClient__CanOnlyBeCalledByRouter",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "GlacisClient__InvalidRouterAddress",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "GlacisDAOSample__CanOnlyBeCalledBySelf",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "GlacisDAOSample__FeeArrayMustEqualAmountOfProposals",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "GlacisDAOSample__MembersOnly",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "GlacisDAOSample__NotEnoughMessageValueRemainingForFees",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "GlacisDAOSample__OnlySelfCanCall",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "GlacisDAOSample__ReceivingCallFailed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "GlacisDAOSample__VoterMustReceiveValue",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "GlacisTokenClient__CanOnlyBeCalledByTokenRouter",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "messageId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "toChainId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "to",
        "type": "address"
      }
    ],
    "name": "GlacisClient__MessageRouted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "messageId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "toChainId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "to",
        "type": "address"
      }
    ],
    "name": "GlacisTokenClient__MessageRouted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "GLACIS_ROUTER",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "GLACIS_TOKEN_ROUTER",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "SAMPLE_TOKEN",
    "outputs": [
      {
        "internalType": "contract XERC20Sample",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "fromChainId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "fromAddress",
            "type": "address"
          },
          {
            "internalType": "uint8",
            "name": "fromGmpId",
            "type": "uint8"
          }
        ],
        "internalType": "struct GlacisCommons.GlacisRoute",
        "name": "allowedRoute",
        "type": "tuple"
      }
    ],
    "name": "addAllowedRoute",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "proposalId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "payTo",
        "type": "address"
      },
      {
        "internalType": "uint256[][]",
        "name": "fees",
        "type": "uint256[][]"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "proposalId",
        "type": "uint256"
      },
      {
        "internalType": "uint256[][]",
        "name": "fees",
        "type": "uint256[][]"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "configText",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "configVersion",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllowedRoutes",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "fromChainId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "fromAddress",
            "type": "address"
          },
          {
            "internalType": "uint8",
            "name": "fromGmpId",
            "type": "uint8"
          }
        ],
        "internalType": "struct GlacisCommons.GlacisRoute[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getDAOData",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "_members",
        "type": "address[]"
      },
      {
        "internalType": "uint256",
        "name": "proposalCount",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_configText",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_configVersion",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_quorum",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "tokenAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenAmount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "proposalId",
        "type": "uint256"
      }
    ],
    "name": "getProposalData",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "toChain",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "retriable",
            "type": "bool"
          },
          {
            "internalType": "uint8[]",
            "name": "gmps",
            "type": "uint8[]"
          },
          {
            "internalType": "address",
            "name": "token",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenAmount",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "finalTo",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "callValue",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "calldataPayload",
            "type": "bytes"
          }
        ],
        "internalType": "struct GlacisDAOSample.Proposal[]",
        "name": "",
        "type": "tuple[]"
      },
      {
        "internalType": "bytes32[]",
        "name": "",
        "type": "bytes32[]"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "messageId",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "nonce",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "originalFrom",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "originalTo",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "retriable",
            "type": "bool"
          }
        ],
        "internalType": "struct GlacisCommons.GlacisData",
        "name": "",
        "type": "tuple"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "name": "getQuorum",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "messageId",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "nonce",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "originalFrom",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "originalTo",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "retriable",
            "type": "bool"
          }
        ],
        "internalType": "struct GlacisCommons.GlacisData",
        "name": "glacisData",
        "type": "tuple"
      },
      {
        "internalType": "bytes",
        "name": "payload",
        "type": "bytes"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "getQuorum",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "fromChainId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "fromAddress",
        "type": "address"
      },
      {
        "internalType": "uint8",
        "name": "fromGmpId",
        "type": "uint8"
      }
    ],
    "name": "isAllowedRoute",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "members",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextProposal",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "toChain",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "retriable",
            "type": "bool"
          },
          {
            "internalType": "uint8[]",
            "name": "gmps",
            "type": "uint8[]"
          },
          {
            "internalType": "address",
            "name": "token",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenAmount",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "finalTo",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "callValue",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "calldataPayload",
            "type": "bytes"
          }
        ],
        "internalType": "struct GlacisDAOSample.Proposal[]",
        "name": "p",
        "type": "tuple[]"
      }
    ],
    "name": "propose",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "quorum",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8[]",
        "name": "fromGmpIds",
        "type": "uint8[]"
      },
      {
        "internalType": "uint256",
        "name": "fromChainId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "fromAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "toAddress",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "payload",
        "type": "bytes"
      }
    ],
    "name": "receiveMessage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8[]",
        "name": "fromGmpIds",
        "type": "uint8[]"
      },
      {
        "internalType": "uint256",
        "name": "fromChainId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "fromAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "toAddress",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "payload",
        "type": "bytes"
      },
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenAmount",
        "type": "uint256"
      }
    ],
    "name": "receiveMessageWithTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "removeAllAllowedRoutes",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "fromChainId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "fromAddress",
            "type": "address"
          },
          {
            "internalType": "uint8",
            "name": "fromGmpId",
            "type": "uint8"
          }
        ],
        "internalType": "struct GlacisCommons.GlacisRoute",
        "name": "route",
        "type": "tuple"
      }
    ],
    "name": "removeAllowedRoute",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "proposalId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "messageIndex",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "nonce",
        "type": "uint256"
      },
      {
        "internalType": "uint256[]",
        "name": "fees",
        "type": "uint256[]"
      }
    ],
    "name": "retry",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "str",
        "type": "string"
      }
    ],
    "name": "selfConfig",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "toChain",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "retriable",
            "type": "bool"
          },
          {
            "internalType": "uint8[]",
            "name": "gmps",
            "type": "uint8[]"
          },
          {
            "internalType": "address",
            "name": "token",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenAmount",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "finalTo",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "callValue",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "calldataPayload",
            "type": "bytes"
          }
        ],
        "internalType": "struct GlacisDAOSample.Proposal[]",
        "name": "_proposals",
        "type": "tuple[]"
      },
      {
        "internalType": "uint256[]",
        "name": "fees",
        "type": "uint256[]"
      }
    ],
    "name": "selfExecuteProposal",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_quorum",
        "type": "uint256"
      }
    ],
    "name": "selfQuorum",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_quorum",
        "type": "uint256"
      }
    ],
    "name": "setQuorum",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]