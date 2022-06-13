import { Transfer as TransferEvent } from '../generated/DevToken/DevToken'
import { EternalStorage } from '../generated/DevToken/EternalStorage'
import {
	TotalLockedAmount,
	TotalAuthenticatedProperty,
} from '../generated/schema'
import { Create as CreateEvent } from '../generated/MetricsFactory_1/MetricsFactory'
import { Bytes, Address, BigInt } from '@graphprotocol/graph-ts'

export function handleTransfer(event: TransferEvent): void {
	const day = event.block.timestamp.toI32() / 86400
	// TotalAmount
	let totalLockedAmount = TotalLockedAmount.load(day.toString())
	if (totalLockedAmount === null) {
		totalLockedAmount = new TotalLockedAmount(day.toString())
	}

	const eternalStorage = EternalStorage.bind(
		Address.fromString('0x4a154e51b69A798d854E100fDf79e6f0Be0e330D')
	)
	const getAllValueResult = eternalStorage.try_getUint(
		Bytes.fromHexString(
			'0xe7dcf1d83b6e7da9390ea33f3813dc78de09a758d09c9be500b16f152c88c364'
		)
	)
	if (!getAllValueResult.reverted) {
		totalLockedAmount.amount = getAllValueResult.value
		totalLockedAmount.save()
	}
}

export function handleMetricsChanged(event: CreateEvent): void {
	const day = event.block.timestamp.toI32() / 86400
	// TotalAmount
	let totalAuthenticatedProperty = TotalAuthenticatedProperty.load(
		day.toString()
	)
	if (totalAuthenticatedProperty === null) {
		totalAuthenticatedProperty = new TotalAuthenticatedProperty(day.toString())
	}

	const eternalStorage = EternalStorage.bind(
		Address.fromString('0x7F5FC5E49F7eCded3D361EF739619ECb760DcD0b')
	)
	const getAuthenticatedProperties = eternalStorage.try_getUint(
		Bytes.fromHexString(
			'0xd361f1295b0fc1c89cea582568f2b1e03704de9dc1a2ba591754dc3c3f23088a'
		)
	)
	if (
		!getAuthenticatedProperties.reverted &&
		getAuthenticatedProperties.value.notEqual(BigInt.fromI32(0))
	) {
		totalAuthenticatedProperty.count = getAuthenticatedProperties.value
		totalAuthenticatedProperty.save()
		return
	}

	const getTotalIssuedMetrics = eternalStorage.try_getUint(
		Bytes.fromHexString(
			'0xb2c6b8b2c77e4c24f7c5a750a14d2d8b137567832e6b70ab43d2915c87c8e263'
		)
	)
	totalAuthenticatedProperty.count = getTotalIssuedMetrics.value
	totalAuthenticatedProperty.save()
}
