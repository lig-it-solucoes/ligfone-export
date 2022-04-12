import { assert, describe, it, expect } from 'vitest'
import phoneNormalizer from "../../src/utils/phoneNormalizer.js"

describe("Phone Normalizer Util", function () {
  it("Fix nine digit on 8 lengh cellphone number", function () {
    const phone1 = phoneNormalizer("554876292445", 11) 
    const phone2 = phoneNormalizer("551190266067", 11) 
    const phone3 = phoneNormalizer("551484421305", 11) 

    expect(phone1).to.equal("48976292445")
    expect(phone2).to.equal("990266067")
    expect(phone3).to.equal("14984421305")
  })

  it("Remove number DDD if CustomerDDD is the same", function () {
    const phone1 = phoneNormalizer("552136292445", 21) 
    const phone2 = phoneNormalizer("5511990266067", 11) 
    const phone3 = phoneNormalizer("554824421305", 48) 

    expect(phone1).to.equal("36292445")
    expect(phone2).to.equal("990266067")
    expect(phone3).to.equal("24421305")
  })

  it("Remove DDD if CustomerDDD is Joinville region", function () {
    const phone1 = phoneNormalizer("554734635617", 47) 
    const phone2 = phoneNormalizer("554738040418", 47) 
    const phone3 = phoneNormalizer("554734477700", 47) 

    expect(phone1).to.equal("34635617")
    expect(phone2).to.equal("38040418")
    expect(phone3).to.equal("34477700")
  })

  it("Keep DDD if CustomerDDD isn't Joinville region", function () {
    const phone1 = phoneNormalizer("554735311200", 47) 
    const phone2 = phoneNormalizer("554733416000", 47) 
    const phone3 = phoneNormalizer("554733816000", 47) 

    expect(phone1).to.equal("4735311200")
    expect(phone2).to.equal("4733416000")
    expect(phone3).to.equal("4733816000")
  })
})