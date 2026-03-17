const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  RESEND_API_KEY,
  CORS_ORIGIN
} = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

const app = express();
const resend = new Resend(RESEND_API_KEY);

const allowedOrigins = (CORS_ORIGIN || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const corsOptions = allowedOrigins.length
  ? {
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      }
    }
  : undefined;

app.use(cors(corsOptions));
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ extended: true, limit: '500mb' }));

app.get('/api/cloudinary-signature', (req, res) => {
  const timestamp = Math.round((new Date()).getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request({
    timestamp: timestamp,
    folder: 'land-property',
    resource_type: 'video'
  }, CLOUDINARY_API_SECRET);
  
  res.json({
    signature,
    timestamp,
    cloudName: CLOUDINARY_CLOUD_NAME,
    apiKey: CLOUDINARY_API_KEY
  });
});

app.post('/api/upload-video', async (req, res) => {
  const { videoPath, videoName } = req.body;
  
  try {
    const result = await cloudinary.uploader.upload(videoPath, {
      resource_type: 'video',
      folder: 'land-property',
      public_id: videoName.replace(/\.[^/.]+$/, ''),
      eager: [
        { streaming_profile: 'hd', format: 'mp4' }
      ]
    });
    
    res.json({ 
      success: true, 
      url: result.secure_url,
      publicId: result.public_id
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/send-email', async (req, res) => {
  const { name, email, phone, message, preferredLand } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'Trirealtors <onboarding@resend.dev>',
      to: ['Trirealtors@gmail.com'],
      reply_to: email,
      subject: `New Inquiry: ${name} - ${preferredLand || 'Beach Land'}`,
      html: `
        <h2>New Property Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Interested In:</strong> ${preferredLand || 'Beach Land - 12.5 Acres'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
