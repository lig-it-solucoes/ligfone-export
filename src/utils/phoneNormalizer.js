import prefixJoinville from "@/utils/prefix-joinville.json"

function normalizePhone(fullnumber, customerDDD) {
  if (!fullnumber) return null;

  const phone = splitPhone(fullnumber)

  phone.number = fixNineDigit(phone.number)

  fullnumber = `${phone.ddd}${phone.number}` // force remove 55 country number
  
  if (customerDDD == phone.ddd) {
    fullnumber = phone.number // force remove DDD local from phone number

    if (customerDDD == 47 && !isJoinvillePrefix(phone.number)) {
      fullnumber = `${phone.ddd}${phone.number}`
    }
  }
  
  return fullnumber
}

function isJoinvillePrefix(number) {
  if (number.length === 8) {
    const numberPrefix = "47" + number.substring(0, 4)

    return prefixJoinville.includes(numberPrefix)
  }

  return false
}

function fixNineDigit(onlyPhoneNumber) {
  if (onlyPhoneNumber.length == 8) {
    // check if first digit is 7, 8 or 9 (mobile) 
    const firstDigit = parseInt(onlyPhoneNumber.substring(0, 1))

    if ([7,8,9].includes(firstDigit)) {
      onlyPhoneNumber = `9${onlyPhoneNumber}`
    }
  }

  return onlyPhoneNumber
}

function splitPhone(phone) {
  const result = phone.match(/([0-9]{2})([0-9]{2})([0-9]{8,9})/)

  if (!result) return false;

  const [fullNumber, cc, ddd, number] = result

  return {fullNumber, cc, ddd, number}
}

export default normalizePhone