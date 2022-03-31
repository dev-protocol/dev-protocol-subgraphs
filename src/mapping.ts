import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  Freezed as FreezedEvent,
  Minted as MintedEvent,
  Transfer as TransferEvent,
  Updated as UpdatedEvent,
  STokensManager
} from "../generated/STokensManager/STokensManager"
import {
  Approval,
  ApprovalForAll,
  Freezed,
  Minted,
  Transfer,
  Updated,
  STokenIdAmount,
  TotalAmount,
} from "../generated/schema"

// export function handleApproval(event: ApprovalEvent): void {
//   let entity = new Approval(
//     event.transaction.hash.toHex() + "-" + event.logIndex.toString()
//   )
//   entity.owner = event.params.owner
//   entity.approved = event.params.approved
//   entity.tokenId = event.params.tokenId
//   entity.save()
// }

// export function handleApprovalForAll(event: ApprovalForAllEvent): void {
//   let entity = new ApprovalForAll(
//     event.transaction.hash.toHex() + "-" + event.logIndex.toString()
//   )
//   entity.owner = event.params.owner
//   entity.operator = event.params.operator
//   entity.approved = event.params.approved
//   entity.save()
// }

// export function handleFreezed(event: FreezedEvent): void {
//   let entity = new Freezed(
//     event.transaction.hash.toHex() + "-" + event.logIndex.toString()
//   )
//   entity.tokenId = event.params.tokenId
//   entity.freezingUser = event.params.freezingUser
//   entity.save()
// }

export function handleMinted(event: MintedEvent): void {
  let entity = new STokenIdAmount(
    event.params.tokenId.toString()
  )
  entity.amount = event.params.amount
  entity.save()
  let day = event.block.timestamp.toI32() / 86400
  let totalAmount = TotalAmount.load(day.toString())
  if (totalAmount === null) {
    totalAmount = new TotalAmount(
      day.toString()
    )
  }
  totalAmount.amount = totalAmount.amount.plus(event.params.amount)
  totalAmount.save()
}

// export function handleTransfer(event: TransferEvent): void {
//   let entity = new Transfer(
//     event.transaction.hash.toHex() + "-" + event.logIndex.toString()
//   )
//   entity.from = event.params.from
//   entity.to = event.params.to
//   entity.tokenId = event.params.tokenId
//   entity.save()
// }

export function handleUpdated(event: UpdatedEvent): void {
  let entity = STokenIdAmount.load(event.params.tokenId.toString())
  let delta = event.params.amount
  if (entity === null) {
    entity = new STokenIdAmount(
      event.params.tokenId.toString()
    )
  } else {
    delta = delta.minus(entity.amount)
  }
  entity.amount = event.params.amount
  entity.save()
  let day = event.block.timestamp.toI32() / 86400
  let totalAmount = TotalAmount.load(day.toString())
  if (totalAmount === null) {
    totalAmount = new TotalAmount(
      day.toString()
    )
  }
  totalAmount.amount = totalAmount.amount.plus(delta)
  totalAmount.save()
}
