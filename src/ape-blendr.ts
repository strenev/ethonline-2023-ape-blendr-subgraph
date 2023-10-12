import { BigInt } from "@graphprotocol/graph-ts"
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
  Transfer,
  ApeBlendrStatisticsEntity,
  UserEntity,
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

  updateCountOnEnter(event);
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

  updateCountOnExit(event);
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

function updateCountOnEnter(event: ApeBlendrEnteredEvent): void {
  let userEntity = UserEntity.load(event.params.player.toHexString());
  let apeBlendrStatisticsEntity = ApeBlendrStatisticsEntity.load("0x1");

  if (!userEntity) {
    userEntity = new UserEntity(event.params.player.toHexString());
    userEntity.totalStaked = new BigInt(0);
  }

  if (!apeBlendrStatisticsEntity) {
    apeBlendrStatisticsEntity = new ApeBlendrStatisticsEntity("0x1");
    apeBlendrStatisticsEntity.playersCount = 0;
  }

  if (userEntity.totalStaked.equals(new BigInt(0))) {
    apeBlendrStatisticsEntity.playersCount++;
  }

  userEntity.totalStaked = userEntity.totalStaked.plus(event.params.amount);

  userEntity.save();
  apeBlendrStatisticsEntity.save();
}

function updateCountOnExit(event: ApeBlendrExitedEvent): void {
  let userEntity = UserEntity.load(event.params.player.toHexString());
  let apeBlendrStatisticsEntity = ApeBlendrStatisticsEntity.load("0x1");

  if (!userEntity) {
    userEntity = new UserEntity(event.params.player.toHexString());
    userEntity.totalStaked = new BigInt(0);
  }

  if (!apeBlendrStatisticsEntity) {
    apeBlendrStatisticsEntity = new ApeBlendrStatisticsEntity("0x1");
    apeBlendrStatisticsEntity.playersCount = 0;
  }

  userEntity.totalStaked = userEntity.totalStaked.minus(event.params.amount);

  if (userEntity.totalStaked.equals(new BigInt(0))) {
    apeBlendrStatisticsEntity.playersCount--;
  }

  userEntity.save();
  apeBlendrStatisticsEntity.save();
}
