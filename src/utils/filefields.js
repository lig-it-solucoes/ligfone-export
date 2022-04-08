const INPUTFIELDS = {
  firstname: {
    title: "Primeiro Nome",
    inputPosition: 0,
  },
  lastname: {
    title: "Último Nome",
    inputPosition: 1,
  },
  phone: {
    title: "Telefone",
    inputPosition: 2,
  },
  company: {
    title: "Empresa",
    inputPosition: 3,
  },
  document: {
    title: "Documento (CPF / CNPJ)",
    inputPosition: 4,
  },
  address: {
    title: "Endereço",
    inputPosition: 5,
  },
}

function formatRows(rows, dddLocal) {
  return rows.map(row => [
    normalizePhone(extractCell(row, 'phone'), dddLocal),
    extractCell(row, 'firstname') + " " + extractCell(row, 'lastname'),
    extractCell(row, 'company'),
    extractCell(row, 'document'),
    extractCell(row, 'address'),
  ])
}

function normalizePhone(phone, dddLocal) {
  if (!phone) return null;
  
  const result = phone.match(/([0-9]{2})([0-9]{2})([0-9]{8,9})/)

  if (!result) return phone;

  let [fullNumber, cc, ddd, number] = result

  if (number.length == 8) {
    // check if first digit is 7, 8 or 9 (mobile) 
    const firstDigit = parseInt(number.substring(0, 1))

    if ([7,8,9].includes(firstDigit)) {
      number = `9${number}`
    }
  }

  console.log(ddd, dddLocal, number)
  
  if (dddLocal == ddd) {
    phone = number // force remove DDD local from phone number
  } else {
    phone = `${ddd}${number}` // force remove 55 country number
  }
  
  return phone
}

function extractCell(row, fieldname) {
  return row[INPUTFIELDS[fieldname].inputPosition]
}

export {
  INPUTFIELDS,
  formatRows
}