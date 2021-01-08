const checkEnum = (allowedEnums, reqFields) => {
  if (!Array.isArray(reqFields)) {
    reqFields = [reqFields]
  }
  return reqFields.every((field) => allowedEnums.includes(field))
}

module.exports = checkEnum
