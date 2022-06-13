import {
  Minted as MintedEvent,
  Updated as UpdatedEvent,
} from "../generated/STokensManager/STokensManager"
import {
  Lockup
} from "../generated/STokensManager/Lockup"
import {
  TotalLocked,
} from "../generated/schema"

export function handleMinted(event: MintedEvent): void {
  let day = event.block.timestamp.toI32() / 86400
  let totalLocked = TotalLocked.load(day.toString())
  if (totalLocked === null) {
    totalLocked = new TotalLocked(
      day.toString()
    )
  }
  let lockup = Lockup.bind(event.transaction.to!)
  let getAllValueResult = lockup.try_totalLocked()
  if (!getAllValueResult.reverted) {
    totalLocked.amount = getAllValueResult.value
    totalLocked.save()
  }
}

export function handleUpdated(event: UpdatedEvent): void {
  let day = event.block.timestamp.toI32() / 86400
  let totalLocked = TotalLocked.load(day.toString())
  if (totalLocked === null) {
    totalLocked = new TotalLocked(
      day.toString()
    )
  }
  let lockup = Lockup.bind(event.transaction.to!)
  let getAllValueResult = lockup.try_totalLocked()
  if (!getAllValueResult.reverted) {
    totalLocked.amount = getAllValueResult.value
    totalLocked.save()
  }
}
