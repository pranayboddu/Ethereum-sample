export const STAKE_ADDRESS = '0x50117826A3F0014533f2113E74428637aE7Cd177';

export const STAKE_ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "intValue",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "stringValue",
				"type": "string"
			}
		],
		"name": "valuesUpdated",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getValues",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_intValue",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_stringValue",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_x",
				"type": "uint256"
			}
		],
		"name": "setIntValue",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_str",
				"type": "string"
			}
		],
		"name": "setStringValue",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]