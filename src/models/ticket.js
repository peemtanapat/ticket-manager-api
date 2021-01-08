const mongoose = require('mongoose')
const _enum = require('../utils/enum.json')

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minlength: 2,
      trim: true,
      required: true
    },
    description: {
      type: String,
      trim: true,
      required: false
    },
    status: {
      type: String,
      enum: _enum.Status,
      default: _enum.DefaultStatus,
      required: true
    },
    contacts: [
      {
        contact: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
)

const Ticket = mongoose.model('Ticket', ticketSchema)

module.exports = Ticket
