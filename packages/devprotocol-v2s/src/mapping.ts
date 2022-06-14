import { Minted as MintedEvent } from '../generated/STokensManager/STokensManager'
import { Lockup } from '../generated/STokensManager/Lockup'
import {
	TotalLockedAmount,
	TotalAuthenticatedProperty,
} from '../generated/schema'
import {
	MetricsFactory,
	Create as CreateEvent,
} from '../generated/MetricsFactory/MetricsFactory'
import { genId, genTimestamp } from '../../utils/generateCommonValues'

export function handleStokensChanged(event: MintedEvent): void {
	const id = genId(event)
	const timestamp = genTimestamp(event)

	let totalLockedAmount = TotalLockedAmount.load(id)
	if (totalLockedAmount === null) {
		totalLockedAmount = new TotalLockedAmount(id)
		totalLockedAmount.timestamp = timestamp
	}

	const lockup = Lockup.bind(event.transaction.to!)
	const getAllValueResult = lockup.try_totalLocked()
	if (!getAllValueResult.reverted) {
		totalLockedAmount.amount = getAllValueResult.value
		totalLockedAmount.save()
	}
}

export function handleMetricsChanged(event: CreateEvent): void {
	const id = genId(event)
	const timestamp = genTimestamp(event)

	let totalAuthenticatedProperty = TotalAuthenticatedProperty.load(id)
	if (totalAuthenticatedProperty === null) {
		totalAuthenticatedProperty = new TotalAuthenticatedProperty(id)
		totalAuthenticatedProperty.timestamp = timestamp
	}

	const metricsFactory = MetricsFactory.bind(event.address)
	totalAuthenticatedProperty.count =
		metricsFactory.authenticatedPropertiesCount()
	totalAuthenticatedProperty.save()
}
