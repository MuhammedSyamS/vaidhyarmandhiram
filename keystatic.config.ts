import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    blog: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.text({ label: 'Title' }),
        titleMl: fields.text({ label: 'Title (Malayalam)' }),
        description: fields.text({ label: 'Description' }),
        descriptionMl: fields.text({ label: 'Description (Malayalam)' }),
        category: fields.select({
          label: 'Category (Select Standard)',
          options: [
            { label: 'General', value: 'General' },
            { label: 'Panchakarma', value: 'Panchakarma' },
            { label: "Women's Health", value: "Women's Health" },
            { label: 'Spine Care', value: 'Spine Care' },
            { label: 'Lifestyle', value: 'Lifestyle' },
          ],
          defaultValue: 'General',
        }),
        customCategory: fields.text({
          label: 'Custom Category (Overrides selection if filled)',
        }),
        date: fields.date({ label: 'Published Date' }),
        image: fields.image({
          label: 'Cover Image',
          directory: 'public/images/blog',
          publicPath: '/images/blog/',
        }),
        videoUrl: fields.text({ label: 'YouTube Video URL / ID (Optional, for video blogs)' }),
        media: fields.array(
          fields.image({
            label: 'Additional Image / Media',
            directory: 'public/images/blog',
            publicPath: '/images/blog/',
          }),
          {
            label: 'Media Gallery (Additional Images)',
            itemLabel: (props) => props.value?.filename || 'Media Item',
          }
        ),
        content: fields.mdx({
          label: 'Content',
        }),
      },
    }),
    treatments: collection({
      label: 'Treatments',
      slugField: 'name',
      path: 'src/content/treatments/*',
      format: { contentField: 'longDescription' },
      schema: {
        name: fields.text({ label: 'Treatment Name' }),
        category: fields.select({
          label: 'Category (Select Standard)',
          options: [
            { label: 'Panchakarma', value: 'panchakarma' },
            { label: 'Rejuvenation', value: 'rejuvenation' },
            { label: 'Spine & Joint Care', value: 'spine-joint' },
            { label: 'Skin Treatments', value: 'skin' },
            { label: 'Specialised Programs', value: 'specialised' },
          ],
          defaultValue: 'panchakarma',
        }),
        customCategory: fields.text({
          label: 'Custom Category (Overrides selection if filled)',
        }),
        shortDescription: fields.text({ label: 'Short Description' }),
        longDescription: fields.mdx({ label: 'Long Description' }),
        benefits: fields.array(fields.text({ label: 'Benefit' }), {
          label: 'Benefits',
          itemLabel: (props) => props.value,
        }),
        duration: fields.text({ label: 'Duration' }),
        preparation: fields.text({ label: 'Preparation Notes' }),
        seoDescription: fields.text({ label: 'SEO Description' }),
        image: fields.image({
          label: 'Treatment Image',
          directory: 'public/images/treatments',
          publicPath: '/images/treatments/',
        }),
      },
    }),
    doctors: collection({
      label: 'Doctors',
      slugField: 'name',
      path: 'src/content/doctors/*',
      schema: {
        name: fields.text({ label: 'Full Name' }),
        title: fields.text({ label: 'Title' }),
        qualifications: fields.text({ label: 'Qualifications' }),
        experience: fields.number({ label: 'Years of Experience' }),
        specialisations: fields.array(fields.text({ label: 'Specialisation' }), {
          label: 'Specialisations',
        }),
        isFounder: fields.checkbox({ label: 'Is Founder?', defaultValue: false }),
        bio: fields.text({ label: 'Short Bio' }),
        fullBio: fields.mdx({ label: 'Full Biography' }),
        image: fields.image({
          label: 'Doctor Image',
          directory: 'public/images/doctors',
          publicPath: '/images/doctors/',
        }),
      },
    }),
    reviews: collection({
      label: 'Reviews',
      slugField: 'reviewerName',
      path: 'src/content/reviews/*',
      format: { contentField: 'reviewText' },
      schema: {
        reviewerName: fields.text({ label: 'Reviewer Name' }),
        type: fields.select({
          label: 'Review Type',
          options: [
            { label: 'Text Review', value: 'text' },
            { label: 'YouTube Video', value: 'youtube' },
            { label: 'Direct Video URL', value: 'video' },
            { label: 'Image', value: 'image' }
          ],
          defaultValue: 'text',
        }),
        city: fields.text({ label: 'Review City / Tag (e.g., Google Review, Patient Testimonial, Postpartum Care)' }),
        rating: fields.number({ label: 'Rating (1-5)', defaultValue: 5 }),
        date: fields.date({ label: 'Date' }),
        videoId: fields.text({ label: 'YouTube Video ID (Optional, if type is YouTube)' }),
        videoSrc: fields.text({ label: 'Direct Video URL (Optional, if type is Direct Video)' }),
        image: fields.image({
          label: 'Review Cover / Image (Optional)',
          directory: 'public/images/reviews',
          publicPath: '/images/reviews/',
        }),
        isSheCare: fields.checkbox({ label: 'Is She Care?', defaultValue: false }),
        reviewText: fields.mdx({ label: 'Review Text (Optional for Video/Image reviews)' }),
      },
    }),
    gallery: collection({
      label: 'Gallery',
      slugField: 'title',
      path: 'src/content/gallery/*',
      format: { data: 'json' },
      schema: {
        title: fields.text({ label: 'Title' }),
        type: fields.select({
          label: 'Media Type',
          options: [
            { label: 'Image', value: 'image' },
            { label: 'YouTube Video', value: 'youtube' }
          ],
          defaultValue: 'image',
        }),
        description: fields.text({ label: 'Description / Caption' }),
        category: fields.text({ label: 'Category (e.g., Facilities, Herbal Garden, Treatment Rooms, Patient Testimonials)', defaultValue: 'Facilities' }),
        image: fields.image({
          label: 'Gallery Image (Required for images, acts as preview for videos)',
          directory: 'public/images/gallery',
          publicPath: '/images/gallery/',
        }),
        videoId: fields.text({ label: 'YouTube Video ID (Optional, if type is YouTube)' }),
      },
    }),
  },
});
