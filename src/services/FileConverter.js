import Papa from 'papaparse'
import { formatRows } from '@/utils/filefields.js'

class FileConverter {  
  constructor() {
    this.file = null
    this.ddd = null
    this.formated = []
  }

  setFile(file) {
    this.file = file
  }

  setDDD(ddd) {
    this.ddd = ddd
  }

  convert() {
    const currentInstance = this
    const ddd = this.ddd
    
    return new Promise((resolve, reject) => {
      Papa.parse(this.file, {
        //header: true,
        skipEmptyLines: 'greedy',
        complete: function(results) {
          const data = results.data
          
          data.shift() // remove first line (header)

          currentInstance.formated = formatRows(data, ddd)

          resolve(currentInstance.formated)
        }
      })
    })
  }

  generateCsv() {
    return Papa.unparse(this.formated)
  }
}

export default FileConverter