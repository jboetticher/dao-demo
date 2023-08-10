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
          "name": "glacisRouter_",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "GlacisExecutionClient__CanOnlyBeCalledByRouter",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "GlacisTinyDAOSample__CallIncorrect",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "GlacisTinyDAOSample__MembersOnly",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "GlacisTinyDAOSample__OnlySelfCanCall",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "GlacisTinyDAOSample__VoterMustReceiveValue",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InvalidRouterAddress",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "useGmpId",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "fromChainId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "toChainId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "RouteNotAllowed",
      "type": "error"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint8",
              "name": "useGmpId",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "fromChainId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "toChainId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
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
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "exampleConfigInteger",
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
              "internalType": "uint8",
              "name": "useGmpId",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "fromChainId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "toChainId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
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
      "name": "glacisRouter",
      "outputs": [
        {
          "internalType": "contract GlacisRouter",
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
          "internalType": "uint256",
          "name": "fromChainId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "payload",
          "type": "bytes"
        },
        {
          "components": [
            {
              "internalType": "uint8",
              "name": "featuresBitmap",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "useGMPId",
              "type": "uint8"
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
            }
          ],
          "internalType": "struct GlacisCommons.GlacisClientExecutionData",
          "name": "glacisExecutionData",
          "type": "tuple"
        }
      ],
      "name": "isAllowedDestinationRoute",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint8",
              "name": "useGmpId",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "fromChainId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "toChainId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            }
          ],
          "internalType": "struct GlacisCommons.GlacisRoute",
          "name": "accessRoute",
          "type": "tuple"
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
          "internalType": "uint256",
          "name": "toChainId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "payload",
          "type": "bytes"
        },
        {
          "components": [
            {
              "internalType": "uint8",
              "name": "featuresBitmap",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "useGMPId",
              "type": "uint8"
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
            }
          ],
          "internalType": "struct GlacisCommons.GlacisClientExecutionData",
          "name": "glacisClientExecutionData",
          "type": "tuple"
        }
      ],
      "name": "isAllowedSourceRoute",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "value",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "bitIndex",
          "type": "uint8"
        }
      ],
      "name": "isBitSet",
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
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "proposals",
      "outputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "toChain",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "payload",
          "type": "bytes"
        },
        {
          "internalType": "bytes",
          "name": "glacisData",
          "type": "bytes"
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
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "toChain",
              "type": "uint256"
            },
            {
              "internalType": "bytes",
              "name": "payload",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "glacisData",
              "type": "bytes"
            }
          ],
          "internalType": "struct GlacisTinyDAOSample.Proposal[]",
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
      "inputs": [
        {
          "internalType": "uint8",
          "name": "fromGmpId",
          "type": "uint8"
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
          "components": [
            {
              "internalType": "uint8",
              "name": "useGmpId",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "fromChainId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "toChainId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
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
      "name": "selfConfig",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "bitmap",
          "type": "uint8"
        }
      ],
      "name": "uint8ToUint8Array",
      "outputs": [
        {
          "internalType": "uint8[]",
          "name": "",
          "type": "uint8[]"
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
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "votes",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]