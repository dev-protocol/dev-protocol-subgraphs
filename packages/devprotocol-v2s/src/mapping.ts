import {
	Minted as MintedEvent,
	Updated as UpdatedEvent,
} from '../generated/STokensManager/STokensManager'
import { Lockup } from '../generated/STokensManager/Lockup'
import {
	TotalLockedAmount,
	TotalAuthenticatedProperty,
} from '../generated/schema'
import {
	MetricsFactory,
	Create as CreateEvent,
} from '../generated/MetricsFactory/MetricsFactory'

export function handleStokensChanged(event: MintedEvent): void {
	const day = event.block.timestamp.toI32() / 86400
	let totalLockedAmount = TotalLockedAmount.load(day.toString())
	if (totalLockedAmount === null) {
		totalLockedAmount = new TotalLockedAmount(day.toString())
	}

	const lockup = Lockup.bind(event.transaction.to!)
	const getAllValueResult = lockup.try_totalLocked()
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

	const metricsFactory = MetricsFactory.bind(event.address)
	totalAuthenticatedProperty.count =
		metricsFactory.authenticatedPropertiesCount()
	totalAuthenticatedProperty.save()
}
