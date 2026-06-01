const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'dhqtquwxc', 
  api_key: '588326746818175', 
  api_secret: 'oJotG2fFQ_srZybThU7Y4xG1o2Y' 
});

cloudinary.uploader.upload('public/images/Jafarkhan.jpg', {
  folder: 'vaidhyarmandhiram/images',
  public_id: 'Jafarkhan',
  overwrite: true
}).then(result => {
  console.log("SUCCESS");
  console.log(result.secure_url);
}).catch(err => {
  console.log("ERROR");
  console.error(err);
});
