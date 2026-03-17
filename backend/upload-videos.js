const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: 'dvcgsltuq',
  api_key: '177659657994268',
  api_secret: 'EDTNT_dPVGTAUipZtKRJtkH_Jbw'
});

const videosDir = 'D:/Land/land-website/src/assets/videos';
const files = fs.readdirSync(videosDir);
const videos = files.filter(f => f.toLowerCase().endsWith('.mp4'));

const recommendedVideos = [
  'VID-20260309-WA0000.mp4',
  'DJI_0653.MP4',
  'DJI_0663.MP4',
  'DJI_0673.MP4'
];

const videosToUpload = videos.filter(v => recommendedVideos.includes(v));

console.log(`Found ${videos.length} videos total`);
console.log(`Uploading ${videosToUpload.length} recommended videos...\n`);

async function uploadVideo(filename) {
  const filepath = path.join(videosDir, filename);
  const publicId = filename.replace(/\.[^/.]+$/, '');
  
  console.log(`Uploading ${filename}...`);
  
  try {
    const result = await cloudinary.uploader.upload(filepath, {
      resource_type: 'video',
      folder: 'land-property',
      public_id: publicId
    });
    
    console.log(`✓ ${filename}`);
    console.log(`  URL: ${result.secure_url}`);
    console.log(`  Public ID: ${result.public_id}\n`);
    
    return { name: filename, url: result.secure_url };
  } catch (error) {
    console.error(`✗ ${filename}: ${error.message}\n`);
    return null;
  }
}

async function main() {
  const results = [];
  
  for (const video of videosToUpload) {
    const result = await uploadVideo(video);
    if (result) results.push(result);
  }
  
  console.log('\n=== UPLOAD COMPLETE ===\n');
  console.log('Add these URLs to PropertyShowcase.jsx:\n');
  
  results.forEach((r, i) => {
    console.log(`Video ${i + 1} (${r.name}):`);
    console.log(`  "${r.url}",\n`);
  });
  
  console.log('\nOr update cloudinaryVideos array with these URLs:');
  console.log(`
const cloudinaryVideos = [
${results.map(r => `  { title: "${r.name.replace('.MP4', '').replace('.mp4', '')}", url: "${r.url}", thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80" }`).join(',\n')}
];`);
}

main().catch(console.error);
