import SanityClientConstructor from '@sanity/client'
import imageUrlBuilder from  '@sanity/image-url'

export const client = SanityClientConstructor({
  projectId: '11lm1nrx',
  dataset: 'production',
  apiVersion: '2022-09-28',
  useCdn: true,
  token: process.env.NEXT_PUBLICK_SANITY_TOKEN
})

const builder = imageUrlBuilder(client);

export const urlFor = source => builder.image(source)
