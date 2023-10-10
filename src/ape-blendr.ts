import {
  ApeBlendrEntered as ApeBlendrEnteredEvent,
  ApeBlendrExited as ApeBlendrExitedEvent,
  Approval as ApprovalEvent,
  AwardingFinished as AwardingFinishedEvent,
  AwardingStarted as AwardingStartedEvent,
  EpochEnded as EpochEndedEvent,
  NoAwardForCurrentEpoch as NoAwardForCurrentEpochEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Transfer as TransferEvent
} from "../generated/ApeBlendr/ApeBlendr"
import {
  ApeBlendrEntered,
  ApeBlendrExited,
  Approval,
  AwardingFinished,
  AwardingStarted,
  EpochEnded,
  NoAwardForCurrentEpoch,
  OwnershipTransferred,
  Transfer
} from "../generated/schema"

export function handleApeBlendrEntered(event: ApeBlendrEnteredEvent): void {
  let entity = new ApeBlendrEntered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.player = event.params.player
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApeBlendrExited(event: ApeBlendrExitedEvent): void {
  let entity = new ApeBlendrExited(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.player = event.params.player
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.spender = event.params.spender
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAwardingFinished(event: AwardingFinishedEvent): void {
  let entity = new AwardingFinished(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.requestId = event.params.requestId
  entity.awardForDraw = event.params.awardForDraw
  entity.winner = event.params.winner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAwardingStarted(event: AwardingStartedEvent): void {
  let entity = new AwardingStarted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.requestId = event.params.requestId
  entity.awardForDraw = event.params.awardForDraw

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEpochEnded(event: EpochEndedEvent): void {
  let entity = new EpochEnded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newEpochStartedAt = event.params.newEpochStartedAt

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNoAwardForCurrentEpoch(
  event: NoAwardForCurrentEpochEvent
): void {
  let entity = new NoAwardForCurrentEpoch(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
