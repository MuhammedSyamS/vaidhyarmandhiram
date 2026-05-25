import nodemailer from 'nodemailer';

async function testEmail() {
  const email = process.env.EMAIL_ADDRESS;
  const password = process.env.APP_PASSWORD;

  if (!email || email.includes('replace_this')) {
    console.error('Error: EMAIL_ADDRESS in .env is not set correctly.');
    process.exit(1);
  }

  console.log(`Attempting to send a test email using account: ${email}`);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: password,
    },
  });

  const mailOptions = {
    from: email,
    to: email, // Sending to themselves
    subject: 'Test Email from Vaidhyarmandhiram Booking System',
    text: 'If you are receiving this, your email configuration in the .env file is working perfectly! Appointment notifications will be sent here.',
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Success! Test email sent.');
    console.log('Message ID:', info.messageId);
  } catch (error) {
    console.error('Failed to send email. Error details:');
    console.error(error);
  }
}

testEmail();
