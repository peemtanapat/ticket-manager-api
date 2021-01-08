const Status = {
  Pending: 'pending',
  Accepted: 'accepted',
  Resolved: 'resolved',
  Rejected: 'rejected'
}
const DefaultStatus = Status.Pending
const StatusList = Object.values(Status)

const Filter = ['status', 'from', 'to', 'limit', 'skip', 'sortBy']

const FieldsForCreate = ['title', 'description', 'status', 'contacts']
const FieldsForUpdate = ['status']

module.exports = {
  Status,
  DefaultStatus,
  StatusList,
  Filter,
  FieldsForCreate,
  FieldsForUpdate
}
