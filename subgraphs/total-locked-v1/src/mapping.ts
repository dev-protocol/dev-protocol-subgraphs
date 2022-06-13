import {
  Transfer as TransferEvent
} from "../generated/DevToken/DevToken"
import {
  EternalStorage
} from "../generated/DevToken/EternalStorage"
import {
  TotalLocked,
} from "../generated/schema"
import { Bytes, Address } from '@graphprotocol/graph-ts'

export function handleTransfer(event: TransferEvent): void {
  let day = event.block.timestamp.toI32() / 86400
  // totalAmount
  let totalLocked = TotalLocked.load(day.toString())
  if (totalLocked === null) {
    totalLocked = new TotalLocked(
      day.toString()
    )
  }
  let eternalStorage = EternalStorage.bind(Address.fromString('0x4a154e51b69A798d854E100fDf79e6f0Be0e330D'))
  let getAllValueResult = eternalStorage.try_getUint(
    Bytes.fromHexString('0xe7dcf1d83b6e7da9390ea33f3813dc78de09a758d09c9be500b16f152c88c364')
  )
  if (!getAllValueResult.reverted) {
    totalLocked.amount = getAllValueResult.value
    totalLocked.save()
  }
}

