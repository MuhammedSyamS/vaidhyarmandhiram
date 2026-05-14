import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import dbConnect from '../lib/mongodb';
import mongoose from 'mongoose';

// Define Mongoose Schemas if they don't exist
const AppointmentSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  doctor: String,
  treatment: String,
  date: Date,
  timeSlot: String,
  symptoms: String,
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);

const InquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);

export const server = {
  bookAppointment: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string(),
      phone: z.string().length(10),
      email: z.string().email(),
      doctor: z.string(),
      treatment: z.string(),
      date: z.string(),
      timeSlot: z.string(),
      symptoms: z.string().optional(),
    }),
    handler: async (input) => {
      await dbConnect();
      const appointment = new Appointment(input);
      await appointment.save();
      return { success: true };
    },
  }),
  submitInquiry: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string(),
      email: z.string().email(),
      phone: z.string(),
      subject: z.string(),
      message: z.string(),
    }),
    handler: async (input) => {
      await dbConnect();
      const inquiry = new Inquiry(input);
      await inquiry.save();
      return { success: true };
    },
  }),
};
