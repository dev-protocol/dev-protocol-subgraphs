import {
  DevToken,
  Transfer as TransferEvent
} from "../generated/DevToken/DevToken"
import {
  EternalStorage
} from "../generated/DevToken/EternalStorage"
import {
  EternalStorage as EternalStorageMetrics
} from "../generated/MetricsFactory/EternalStorage"
import {
  Create as CreateEvent,
  Destroy as DestroyEvent
} from "../generated/MetricsFactory/MetricsFactory"
import {
  MetricsGroup
} from "../generated/MetricsFactory/MetricsGroup"
import {
  TotalAmount,
  PropertyCount,
  TotalSupply
} from "../generated/schema"
import { Bytes, Address } from '@graphprotocol/graph-ts'

export function handleTransfer(event: TransferEvent): void {
  let day = event.block.timestamp.toI32() / 86400
  // totalAmount
  let totalAmount = TotalAmount.load(day.toString())
  if (totalAmount === null) {
    totalAmount = new TotalAmount(
      day.toString()
    )
  }
  let eternalStorage = EternalStorage.bind(Address.fromString('0x4a154e51b69A798d854E100fDf79e6f0Be0e330D'))
  let getAllValueResult = eternalStorage.try_getUint(
    Bytes.fromHexString('0xe7dcf1d83b6e7da9390ea33f3813dc78de09a758d09c9be500b16f152c88c364')
  )
  if (!getAllValueResult.reverted) {
    totalAmount.amount = getAllValueResult.value
    totalAmount.save()
  }

  // totalSupply
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

export function handleCreate(event: CreateEvent): void {
  let day = event.block.timestamp.toI32() / 86400
  let propertyCount = PropertyCount.load(day.toString())
  if (propertyCount === null) {
    propertyCount = new PropertyCount(
      day.toString()
    )
  }
  let eternalStorage = EternalStorageMetrics.bind(Address.fromString('0x7F5FC5E49F7eCded3D361EF739619ECb760DcD0b'))
  let getTotalCount = eternalStorage.try_getUint(
    Bytes.fromHexString('0xb2c6b8b2c77e4c24f7c5a750a14d2d8b137567832e6b70ab43d2915c87c8e263')
  )
  if (!getTotalCount.reverted) {
    propertyCount.count = getTotalCount.value
    propertyCount.save()
  }
}

export function handleDestroy(event: DestroyEvent): void {
  let day = event.block.timestamp.toI32() / 86400
  let propertyCount = PropertyCount.load(day.toString())
  if (propertyCount === null) {
    propertyCount = new PropertyCount(
      day.toString()
    )
  }
  let eternalStorage = EternalStorageMetrics.bind(Address.fromString('0x7F5FC5E49F7eCded3D361EF739619ECb760DcD0b'))
  let getTotalCount = eternalStorage.try_getUint(
    Bytes.fromHexString('0xb2c6b8b2c77e4c24f7c5a750a14d2d8b137567832e6b70ab43d2915c87c8e263')
  )
  if (!getTotalCount.reverted) {
    propertyCount.count = getTotalCount.value
    propertyCount.save()
  }
}
