import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import dbConnect from '../lib/mongodb';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

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
      doctor: z.string().optional(),
      treatment: z.string().optional(),
      date: z.string(),
      timeSlot: z.string(),
      symptoms: z.string().optional(),
    }),
    handler: async (input) => {
      await dbConnect();
      const appointment = new Appointment(input);
      await appointment.save();

      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.APP_PASSWORD,
          },
        });

        const mailOptions = {
          from: process.env.EMAIL_ADDRESS,
          to: process.env.EMAIL_ADDRESS,
          subject: `New Appointment Booking: ${input.name}`,
          text: `
A new appointment has been booked!

Details:
Name: ${input.name}
Email: ${input.email}
Phone: ${input.phone}
Doctor: ${input.doctor}
Treatment: ${input.treatment}
Date: ${input.date}
Time Slot: ${input.timeSlot}
Symptoms: ${input.symptoms || 'None provided'}
          `,
        };

        await transporter.sendMail(mailOptions);
        console.log('Notification email sent successfully');
      } catch (error) {
        console.error('Error sending notification email:', error);
      }

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
