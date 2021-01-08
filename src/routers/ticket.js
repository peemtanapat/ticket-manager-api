const express = require('express')
const router = new express.Router()

const Ticket = require('../models/ticket')

const checkEnum = require('../utils/checkEnum')
const { StatusList, Filter, FieldsForCreate, FieldsForUpdate } = require('../utils/enum')

router.get('/tickets', async (req, res) => {
  const filter = {}
  const sort = {}
  const { status, from, to } = req.query

  const isValidFilter = Object.keys(req.query).every((item) => Filter.includes(item))
  const isValidTimeSpan = (from && to) || (!from && !to)
  if (!isValidFilter || !isValidTimeSpan) {
    return res.status(400).send({ message: 'Query not allowed' })
  }

  if (status) {
    filter.status = status
  }

  if (from && to) {
    // e.g. /tickets?status=pending&from=2021-01-05&to=2021-01-10
    filter.createdAt = {
      $gte: new Date(from),
      $lte: new Date(to)
    }
  }

  if (req.query.sortBy) {
    // e.g. /tickets?sortBy=createdAt:desc
    // parts[0] is 'createdAt', parts[1] is 'desc'
    const parts = req.query.sortBy.split(':')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }

  const { limit, skip } = req.query

  try {
    const tasks = await Ticket.find(filter).limit(parseInt(limit)).skip(parseInt(skip)).sort(sort)
    res.send({ length: tasks.length, tasks })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

router.post('/tickets', async (req, res) => {
  try {
    // check fields in request body
    const isVailidField = checkEnum(FieldsForCreate, Object.keys(req.body))
    if (!isVailidField) {
      return res.status(400).send({ message: 'Field not allowed' })
    }
    // check value of status field
    const { status } = req.body
    if (status) {
      const isValidValue = checkEnum(StatusList, status)
      if (!isValidValue) return res.status(400).send({ message: 'Status value not allowed' })
    }

    const ticket = new Ticket(req.body)
    await ticket.save()
    res.status(201).send(ticket)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

router.patch('/tickets/:id', async (req, res) => {
  try {
    // check fields in request body
    const isVailidField = checkEnum(FieldsForUpdate, Object.keys(req.body))
    if (!isVailidField) {
      return res.status(400).send({ message: 'Field not allowed' })
    }
    // check value of status field
    const { status } = req.body
    const isValidValue = checkEnum(StatusList, status)
    if (!isValidValue) {
      return res.status(400).send({ message: 'Status value not allowed' })
    }

    const id = req.params.id

    const ticket = await Ticket.findById(id)
    ticket.status = status
    await ticket.save()
    res.send(ticket)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

module.exports = router
