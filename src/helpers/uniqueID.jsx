import React from 'react'
import { v4 as uuid} from 'uuid'

function uniqueID() {
  const id = uuid()
  return id
}

export default uniqueID