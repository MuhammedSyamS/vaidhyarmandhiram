import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: "dhqtquwxc",
  api_key: "588326746818175",
  api_secret: "oJotG2fFQ_srZybThU7Y4xG1o2Y"
});

async function check() {
  try {
    const result = await cloudinary.search
      .expression('folder:vaidhyarmandhiram/*')
      .max_results(500)
      .execute();
    
    console.log(`Found ${result.total_count} files in Cloudinary!`);
    if (result.total_count > 0) {
      console.log('First few files:');
      result.resources.slice(0, 5).forEach(res => {
        console.log(`- ${res.public_id}.${res.format} (${res.secure_url})`);
      });
    }
  } catch (err) {
    console.error(err);
  }
}

check();
