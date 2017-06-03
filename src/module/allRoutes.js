import { flatten } from 'ramda'

import authRoute from './Auth/route'
import eventRoute from './Event/route'
import defaultHomepage from './defaultHomepage'

export default flatten([
  authRoute,
  eventRoute,

  defaultHomepage, // taro paling bawah
])
