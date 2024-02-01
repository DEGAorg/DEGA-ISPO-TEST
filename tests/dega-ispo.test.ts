import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import { AssignRewards } from "../generated/schema"
import { AssignRewards as AssignRewardsEvent } from "../generated/DegaISPO/DegaISPO"
import { handleAssignRewards } from "../src/dega-ispo"
import { createAssignRewardsEvent } from "./dega-ispo-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let sharesToAssignRewards = BigInt.fromI32(234)
    let totalSharesDeposited = BigInt.fromI32(234)
    let timestamp = BigInt.fromI32(234)
    let newAssignRewardsEvent = createAssignRewardsEvent(
      sharesToAssignRewards,
      totalSharesDeposited,
      timestamp
    )
    handleAssignRewards(newAssignRewardsEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AssignRewards created and stored", () => {
    assert.entityCount("AssignRewards", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AssignRewards",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "sharesToAssignRewards",
      "234"
    )
    assert.fieldEquals(
      "AssignRewards",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "totalSharesDeposited",
      "234"
    )
    assert.fieldEquals(
      "AssignRewards",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "timestamp",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
