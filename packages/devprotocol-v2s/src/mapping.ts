import {
  Minted as MintedEvent,
  Updated as UpdatedEvent,
} from "../generated/STokensManager/STokensManager"
import {
  Lockup
} from "../generated/STokensManager/Lockup"
import {
  TotalLockedAmount,
} from "../generated/schema"

export function handleMinted(event: MintedEvent): void {
  let day = event.block.timestamp.toI32() / 86400
  let totalLockedAmount = TotalLockedAmount.load(day.toString())
  if (totalLockedAmount === null) {
    totalLockedAmount = new TotalLockedAmount(
      day.toString()
    )
  }
  let lockup = Lockup.bind(event.transaction.to!)
  let getAllValueResult = lockup.try_totalLocked()
  if (!getAllValueResult.reverted) {
    totalLockedAmount.amount = getAllValueResult.value
    totalLockedAmount.save()
  }
}

export function handleUpdated(event: UpdatedEvent): void {
  let day = event.block.timestamp.toI32() / 86400
  let totalLockedAmount = TotalLockedAmount.load(day.toString())
  if (totalLockedAmount === null) {
    totalLockedAmount = new TotalLockedAmount(
      day.toString()
    )
  }
  let lockup = Lockup.bind(event.transaction.to!)
  let getAllValueResult = lockup.try_totalLocked()
  if (!getAllValueResult.reverted) {
    totalLockedAmount.amount = getAllValueResult.value
    totalLockedAmount.save()
  }
}
