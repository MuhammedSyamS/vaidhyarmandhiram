import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema';
import dbConnect from '../lib/mongodb';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

const withTimeout = (promise: Promise<any>, ms: number, message: string) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error(message)), ms))
  ]);
};

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
      name: z.string().optional(),
      phone: z.string().optional(),
      email: z.string().optional(),
      doctor: z.string().optional(),
      treatment: z.string().optional(),
      date: z.string().optional(),
      timeSlot: z.string().optional(),
      symptoms: z.string().optional(),
    }),
    handler: async (input) => {
      try {
        await withTimeout(dbConnect(), 3000, 'Database connection timed out');
        const appointment = new Appointment(input);
        await withTimeout(appointment.save(), 3000, 'Database save timed out');
      } catch (err) {
        console.warn('Database save skipped/failed:', err);
      }

      try {
        const userEmail = import.meta.env.EMAIL_ADDRESS || process.env.EMAIL_ADDRESS;
        const appPassword = import.meta.env.APP_PASSWORD || process.env.APP_PASSWORD;
        
        if (userEmail && appPassword) {
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: userEmail,
              pass: appPassword,
            },
            connectionTimeout: 5000,
            greetingTimeout: 5000,
            socketTimeout: 5000,
          });

          const mailOptions = {
            from: userEmail,
            to: userEmail,
            subject: `New Appointment Booking: ${input.name}`,
            text: `
A new appointment has been booked!

Details:
Name: ${input.name}
Email: ${input.email}
Phone: ${input.phone}
Doctor: ${input.doctor || 'Not specified'}
Treatment: ${input.treatment || 'Not specified'}
Date: ${input.date}
Time Slot: ${input.timeSlot}
Symptoms: ${input.symptoms || 'None provided'}
            `,
          };

          await withTimeout(transporter.sendMail(mailOptions), 4000, 'Email sending timed out');
          console.log('Notification email sent successfully');
        } else {
           console.error('Email credentials not found in environment variables.');
           throw new ActionError({ code: 'BAD_REQUEST', message: 'Email credentials not found in Vercel environment variables.' });
        }
      } catch (error: any) {
        console.error('Error sending notification email:', error);
        throw new ActionError({ code: 'BAD_REQUEST', message: 'Email sending failed: ' + error.message });
      }

      return { success: true };
    },
  }),
  submitInquiry: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string().optional(),
      email: z.string().optional(),
      phone: z.string().optional(),
      subject: z.string().optional(),
      message: z.string().optional(),
    }),
    handler: async (input) => {
      try {
        await withTimeout(dbConnect(), 3000, 'Database connection timed out');
        const inquiry = new Inquiry(input);
        await withTimeout(inquiry.save(), 3000, 'Database save timed out');
      } catch (err) {
        console.warn('Database save skipped/failed:', err);
      }
      try {
        const userEmail = import.meta.env.EMAIL_ADDRESS || process.env.EMAIL_ADDRESS;
        const appPassword = import.meta.env.APP_PASSWORD || process.env.APP_PASSWORD;
        
        if (userEmail && appPassword) {
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: userEmail,
              pass: appPassword,
            },
            connectionTimeout: 5000,
            greetingTimeout: 5000,
            socketTimeout: 5000,
          });

          const mailOptions = {
            from: userEmail,
            to: userEmail,
            subject: `New Inquiry from ${input.name}: ${input.subject}`,
            text: `
You have received a new inquiry!

Details:
Name: ${input.name}
Email: ${input.email}
Phone: ${input.phone}
Subject: ${input.subject}
Message: ${input.message}
            `,
          };

          await withTimeout(transporter.sendMail(mailOptions), 4000, 'Email sending timed out');
          console.log('Inquiry email sent successfully');
        } else {
           console.error('Email credentials not found in environment variables.');
           throw new ActionError({ code: 'BAD_REQUEST', message: 'Email credentials not found in Vercel environment variables.' });
        }
      } catch (error: any) {
        console.error('Error sending inquiry email:', error);
        throw new ActionError({ code: 'BAD_REQUEST', message: 'Email sending failed: ' + error.message });
      }

      return { success: true };
    },
  }),
};
