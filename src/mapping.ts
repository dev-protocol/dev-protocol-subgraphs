import {
  Minted as MintedEvent,
  Updated as UpdatedEvent,
} from "../generated/STokensManager/STokensManager"
import {
  Lockup
} from "../generated/STokensManager/Lockup"
import {
  TotalAmount,
} from "../generated/schema"

export function handleMinted(event: MintedEvent): void {
  let day = event.block.timestamp.toI32() / 86400
  let totalAmount = TotalAmount.load(day.toString())
  if (totalAmount === null) {
    totalAmount = new TotalAmount(
      day.toString()
    )
    let lockup = Lockup.bind(event.transaction.to!)
    let getAllValueResult = lockup.try_totalLocked()
    if (!getAllValueResult.reverted) {
      totalAmount.amount = getAllValueResult.value
      totalAmount.save()
    }
  }
}

export function handleUpdated(event: UpdatedEvent): void {
  let day = event.block.timestamp.toI32() / 86400
  let totalAmount = TotalAmount.load(day.toString())
  if (totalAmount === null) {
    totalAmount = new TotalAmount(
      day.toString()
    )
    let lockup = Lockup.bind(event.transaction.to!)
    let getAllValueResult = lockup.try_totalLocked()
    if (!getAllValueResult.reverted) {
      totalAmount.amount = getAllValueResult.value
      totalAmount.save()
    }
  }
}
