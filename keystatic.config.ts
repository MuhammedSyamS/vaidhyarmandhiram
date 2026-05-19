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
        description: fields.text({ label: 'Description' }),
        date: fields.date({ label: 'Published Date' }),
        image: fields.image({
          label: 'Cover Image',
          directory: 'public/images/blog',
          publicPath: '/images/blog/',
        }),
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
          label: 'Category',
          options: [
            { label: 'Panchakarma', value: 'panchakarma' },
            { label: 'Rejuvenation', value: 'rejuvenation' },
            { label: 'Spine & Joint Care', value: 'spine-joint' },
            { label: 'Skin Treatments', value: 'skin' },
            { label: 'Specialised Programs', value: 'specialised' },
          ],
          defaultValue: 'panchakarma',
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
  },
});
