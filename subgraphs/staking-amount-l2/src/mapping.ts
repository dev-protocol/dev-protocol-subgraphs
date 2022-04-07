import {
  Minted as MintedEvent,
  Updated as UpdatedEvent,
} from "../generated/STokensManager/STokensManager"
import {
  MetricsFactory,
  Create as CreateEvent,
  Destroy as DestroyEvent,
} from "../generated/MetricsFactory/MetricsFactory"
import {
  Lockup
} from "../generated/STokensManager/Lockup"
import {
  DevToken,
  Transfer as TransferEvent
} from "../generated/DevToken/DevToken"
import {
  TotalAmount,
  PropertyCount,
  TotalSupply
} from "../generated/schema"

export function handleMinted(event: MintedEvent): void {
  let day = event.block.timestamp.toI32() / 86400
  let totalAmount = TotalAmount.load(day.toString())
  if (totalAmount === null) {
    totalAmount = new TotalAmount(
      day.toString()
    )
  }
  let lockup = Lockup.bind(event.transaction.to!)
  let getAllValueResult = lockup.try_totalLocked()
  if (!getAllValueResult.reverted) {
    totalAmount.amount = getAllValueResult.value
    totalAmount.save()
  }
}

export function handleUpdated(event: UpdatedEvent): void {
  let day = event.block.timestamp.toI32() / 86400
  let totalAmount = TotalAmount.load(day.toString())
  if (totalAmount === null) {
    totalAmount = new TotalAmount(
      day.toString()
    )
  }
  let lockup = Lockup.bind(event.transaction.to!)
  let getAllValueResult = lockup.try_totalLocked()
  if (!getAllValueResult.reverted) {
    totalAmount.amount = getAllValueResult.value
    totalAmount.save()
  }
}

export function handleCreate(event: CreateEvent): void {
  let day = event.block.timestamp.toI32() / 86400
  let propertyCount = PropertyCount.load(day.toString())
  if (propertyCount === null) {
    propertyCount = new PropertyCount(
      day.toString()
    )
  }
  let metricsFactory = MetricsFactory.bind(event.address);
  propertyCount.count = metricsFactory.metricsCount()
  propertyCount.save()
}

export function handleDestroy(event: DestroyEvent): void {
  let day = event.block.timestamp.toI32() / 86400
  let propertyCount = PropertyCount.load(day.toString())
  if (propertyCount === null) {
    propertyCount = new PropertyCount(
      day.toString()
    )
  }
  let metricsFactory = MetricsFactory.bind(event.address);
  propertyCount.count = metricsFactory.metricsCount()
  propertyCount.save()
}

export function handleTransfer(event: TransferEvent): void {
  let day = event.block.timestamp.toI32() / 86400
  let totalSupply = TotalSupply.load(day.toString())
  if (totalSupply === null) {
    totalSupply = new TotalSupply(
      day.toString()
    )
  }
  let devToken = DevToken.bind(event.address);
  totalSupply.amount = devToken.totalSupply()
  totalSupply.save()
}
