import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { ApeBlendrEntered } from "../generated/schema"
import { ApeBlendrEntered as ApeBlendrEnteredEvent } from "../generated/ApeBlendr/ApeBlendr"
import { handleApeBlendrEntered } from "../src/ape-blendr"
import { createApeBlendrEnteredEvent } from "./ape-blendr-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let player = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let amount = BigInt.fromI32(234)
    let newApeBlendrEnteredEvent = createApeBlendrEnteredEvent(player, amount)
    handleApeBlendrEntered(newApeBlendrEnteredEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ApeBlendrEntered created and stored", () => {
    assert.entityCount("ApeBlendrEntered", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ApeBlendrEntered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "player",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ApeBlendrEntered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
