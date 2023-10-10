import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
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
} from "../generated/ApeBlendr/ApeBlendr"

export function createApeBlendrEnteredEvent(
  player: Address,
  amount: BigInt
): ApeBlendrEntered {
  let apeBlendrEnteredEvent = changetype<ApeBlendrEntered>(newMockEvent())

  apeBlendrEnteredEvent.parameters = new Array()

  apeBlendrEnteredEvent.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )
  apeBlendrEnteredEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return apeBlendrEnteredEvent
}

export function createApeBlendrExitedEvent(
  player: Address,
  amount: BigInt
): ApeBlendrExited {
  let apeBlendrExitedEvent = changetype<ApeBlendrExited>(newMockEvent())

  apeBlendrExitedEvent.parameters = new Array()

  apeBlendrExitedEvent.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )
  apeBlendrExitedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return apeBlendrExitedEvent
}

export function createApprovalEvent(
  owner: Address,
  spender: Address,
  value: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("spender", ethereum.Value.fromAddress(spender))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return approvalEvent
}

export function createAwardingFinishedEvent(
  requestId: BigInt,
  awardForDraw: BigInt,
  winner: Address
): AwardingFinished {
  let awardingFinishedEvent = changetype<AwardingFinished>(newMockEvent())

  awardingFinishedEvent.parameters = new Array()

  awardingFinishedEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromUnsignedBigInt(requestId)
    )
  )
  awardingFinishedEvent.parameters.push(
    new ethereum.EventParam(
      "awardForDraw",
      ethereum.Value.fromUnsignedBigInt(awardForDraw)
    )
  )
  awardingFinishedEvent.parameters.push(
    new ethereum.EventParam("winner", ethereum.Value.fromAddress(winner))
  )

  return awardingFinishedEvent
}

export function createAwardingStartedEvent(
  requestId: BigInt,
  awardForDraw: BigInt
): AwardingStarted {
  let awardingStartedEvent = changetype<AwardingStarted>(newMockEvent())

  awardingStartedEvent.parameters = new Array()

  awardingStartedEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromUnsignedBigInt(requestId)
    )
  )
  awardingStartedEvent.parameters.push(
    new ethereum.EventParam(
      "awardForDraw",
      ethereum.Value.fromUnsignedBigInt(awardForDraw)
    )
  )

  return awardingStartedEvent
}

export function createEpochEndedEvent(newEpochStartedAt: BigInt): EpochEnded {
  let epochEndedEvent = changetype<EpochEnded>(newMockEvent())

  epochEndedEvent.parameters = new Array()

  epochEndedEvent.parameters.push(
    new ethereum.EventParam(
      "newEpochStartedAt",
      ethereum.Value.fromUnsignedBigInt(newEpochStartedAt)
    )
  )

  return epochEndedEvent
}

export function createNoAwardForCurrentEpochEvent(): NoAwardForCurrentEpoch {
  let noAwardForCurrentEpochEvent = changetype<NoAwardForCurrentEpoch>(
    newMockEvent()
  )

  noAwardForCurrentEpochEvent.parameters = new Array()

  return noAwardForCurrentEpochEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  value: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferEvent
}
