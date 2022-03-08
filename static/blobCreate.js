function blobCreate(data) {
  const blobData = new File(data, { type: 'text/plain' })
  return blobData
}

module.exports = {
  blobCreate,
}
