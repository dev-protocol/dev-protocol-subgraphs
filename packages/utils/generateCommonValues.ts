/* eslint-disable @typescript-eslint/ban-types */
import {
	ethereum,
	crypto,
	ByteArray,
	BigInt,
	Bytes,
} from '@graphprotocol/graph-ts'

export const genId = (event: ethereum.Event): Bytes =>
	Bytes.fromByteArray(
		ByteArray.fromHexString(
			event.transaction.hash.toHexString() + event.logIndex.toHexString()
		)
	)

export const genTimestamp = (event: ethereum.Event): BigInt =>
	event.block.timestamp
