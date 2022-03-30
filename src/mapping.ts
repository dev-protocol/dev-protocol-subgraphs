import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  Freezed as FreezedEvent,
  Minted as MintedEvent,
  Transfer as TransferEvent,
  Updated as UpdatedEvent
} from "../generated/STokensManager/STokensManager"
import {
  Approval,
  ApprovalForAll,
  Freezed,
  Minted,
  Transfer,
  Updated
} from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId
  entity.save()
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved
  entity.save()
}

export function handleFreezed(event: FreezedEvent): void {
  let entity = new Freezed(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.tokenId = event.params.tokenId
  entity.freezingUser = event.params.freezingUser
  entity.save()
}

export function handleMinted(event: MintedEvent): void {
  let entity = new Minted(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.tokenId = event.params.tokenId
  entity.owner = event.params.owner
  entity.property = event.params.property
  entity.amount = event.params.amount
  entity.price = event.params.price
  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId
  entity.save()
}

export function handleUpdated(event: UpdatedEvent): void {
  let entity = new Updated(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.tokenId = event.params.tokenId
  entity.amount = event.params.amount
  entity.price = event.params.price
  entity.cumulativeReward = event.params.cumulativeReward
  entity.pendingReward = event.params.pendingReward
  entity.save()
}
