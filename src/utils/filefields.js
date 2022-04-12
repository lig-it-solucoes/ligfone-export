import phoneNormalizer from '@/utils/phoneNormalizer.js'

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
    phoneNormalizer(extractCell(row, 'phone'), dddLocal),
    extractCell(row, 'firstname') + " " + extractCell(row, 'lastname'),
    extractCell(row, 'company'),
    extractCell(row, 'document'),
    extractCell(row, 'address'),
  ])
}

function extractCell(row, fieldname) {
  return row[INPUTFIELDS[fieldname].inputPosition]
}

export {
  INPUTFIELDS,
  formatRows
}