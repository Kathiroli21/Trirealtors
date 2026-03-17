import { useState, useEffect } from 'react';

export default function VideoUploader() {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [error, setError] = useState('');
  const [cloudConfig, setCloudConfig] = useState(null);

  useEffect(() => {
    fetch('/api/cloudinary-signature')
      .then(res => res.json())
      .then(data => setCloudConfig(data))
      .catch(err => console.error('Failed to get cloud config:', err));
  }, []);

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0 || !cloudConfig) return;

    setUploading(true);
    setError('');

    const results = [];

    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('api_key', cloudConfig.apiKey);
        formData.append('timestamp', cloudConfig.timestamp);
        formData.append('signature', cloudConfig.signature);
        formData.append('folder', 'land-property');
        formData.append('resource_type', 'video');

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudConfig.cloudName}/video/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`Upload failed for ${file.name}`);
        }

        const data = await response.json();
        results.push({
          name: file.name,
          url: data.secure_url,
          publicId: data.public_id
        });
      } catch (err) {
        console.error(`Error uploading ${file.name}:`, err);
        setError(`Failed to upload ${file.name}: ${err.message}`);
      }
    }

    setUploadedUrls([...uploadedUrls, ...results]);
    setUploading(false);
  };

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Video Upload to Cloudinary</h2>
      <p>Upload your property videos (they will be optimized for web)</p>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="file"
          accept="video/*"
          multiple
          onChange={handleFileSelect}
          disabled={uploading || !cloudConfig}
          style={{ marginBottom: '10px' }}
        />
        {uploading && <p>Uploading... Please wait (large files take time)</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!cloudConfig && <p>Loading upload configuration...</p>}
      </div>

      {uploadedUrls.length > 0 && (
        <div>
          <h3>Uploaded Videos:</h3>
          {uploadedUrls.map((video, index) => (
            <div key={index} style={{ 
              border: '1px solid #ccc', 
              padding: '10px', 
              margin: '10px 0',
              borderRadius: '8px'
            }}>
              <p><strong>{video.name}</strong></p>
              <input 
                type="text" 
                value={video.url} 
                readOnly 
                style={{ width: '100%', marginBottom: '5px' }}
              />
              <button onClick={() => copyUrl(video.url)}>
                Copy URL
              </button>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: '30px', padding: '15px', background: '#f5f5f5', borderRadius: '8px' }}>
        <h4>Instructions:</h4>
        <ol>
          <li>Select your videos from src/assets/videos folder</li>
          <li>Recommended: DJI_0090, Back, VID-20260309-WA0000</li>
          <li>Wait for upload to complete (large videos may take several minutes)</li>
          <li>Copy the URLs when ready</li>
          <li>Update PropertyShowcase with these Cloudinary URLs</li>
        </ol>
      </div>
    </div>
  );
}
