/* eslint-disable @typescript-eslint/ban-types */
import { ethereum, BigInt, Bytes, crypto } from '@graphprotocol/graph-ts'

export const genId = (event: ethereum.Event): Bytes =>
	Bytes.fromByteArray(
		crypto.keccak256(
			Bytes.fromUTF8(
				event.transaction.hash.toHexString() + event.logIndex.toHexString()
			)
		)
	)

export const genTimestamp = (event: ethereum.Event): BigInt =>
	event.block.timestamp
