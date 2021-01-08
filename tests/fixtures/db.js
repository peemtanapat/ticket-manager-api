const mongoose = require('mongoose')
const Ticket = require('../../src/models/ticket')

const ticketOneId = new mongoose.Types.ObjectId()
const ticketOne = {
  _id: ticketOneId,
  title: 'One Ticket',
  description: 'This is One ticket',
  contacts: [
    {
      contact: '1100'
    },
    {
      contact: '1101'
    }
  ]
  // default status is 'pending'
}
const ticketTwoId = new mongoose.Types.ObjectId()
const ticketTwo = {
  _id: ticketTwoId,
  title: 'Two Ticket',
  description: 'This is Two ticket',
  contacts: [
    {
      contact: '2100'
    },
    {
      contact: '2101'
    }
  ]
}
const ticketThreeId = new mongoose.Types.ObjectId()
const ticketThree = {
  _id: ticketThreeId,
  title: 'Three Ticket',
  description: 'This is Three ticket',
  contacts: [
    {
      contact: '3100'
    },
    {
      contact: '3101'
    }
  ],
  status: 'accepted'
}

const setupDatabase = async () => {
  await Ticket.deleteMany()
  await new Ticket(ticketOne).save()
  await new Ticket(ticketTwo).save()
  await new Ticket(ticketThree).save()
}

module.exports = {
  setupDatabase,
  ticketOneId,
  ticketOne
}
