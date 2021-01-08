const request = require('supertest')
const app = require('../src/app')
const Ticket = require('../src/models/ticket')
const { setupDatabase, ticketOneId } = require('./fixtures/db')
const { Status, DefaultStatus } = require('../src/utils/enum')

beforeEach(setupDatabase)

test('Should get all tickets', async () => {
  const response = await request(app).get('/tickets').send().expect(200)
  const tickets = response.body
  expect(tickets.length).toBe(3)
})
test('Should create first ticket', async () => {
  const response = await request(app)
    .post('/tickets')
    .send({
      title: 'First Ticket',
      description: 'This is First ticket',
      contacts: [
        {
          contact: '0100'
        },
        {
          contact: '0101'
        }
      ]
    })
    .expect(201)
  const ticket = await Ticket.findById(response.body._id)
  expect(ticket).not.toBeNull()
  expect(ticket.status).toBe(DefaultStatus)
})
test('Should not create ticket with invalid field', async () => {
  await request(app)
    .post('/tickets')
    .send({
      // title is invalid
      titles: 'First Ticket',
      description: 'This is First ticket',
      contacts: [
        {
          contact: '0100'
        }
      ]
    })
    .expect(400)
})
test('Should not create ticket with invalid status value', async () => {
  await request(app)
    .post('/tickets')
    .send({
      title: 'First Ticket',
      description: 'This is First ticket',
      // 'done' is invalid
      status: 'done',
      contacts: [
        {
          contact: '0100'
        }
      ]
    })
    .expect(400)
})
test('Should update ticket status', async () => {
  const response = await request(app)
    .patch(`/tickets/${ticketOneId}`)
    .send({
      status: 'accepted'
    })
    .expect(200)
  const ticket = await Ticket.findById(response.body._id)
  expect(ticket).not.toBeNull()
  expect(ticket.status).toBe(Status.Accepted)
})
test('Should not update ticket with not-status field', async () => {
  await request(app)
    .patch(`/tickets/${ticketOneId}`)
    .send({
      // title is invalid
      title: '1 Ticket'
    })
    .expect(400)
})
test('Should not update ticket with invalid status', async () => {
  await request(app)
    .patch(`/tickets/${ticketOneId}`)
    .send({
      // status is invalid
      status: 'approved'
    })
    .expect(400)
})
