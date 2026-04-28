import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// ─────────────────────────────────────────────────────────────────────────────
// Client
// ─────────────────────────────────────────────────────────────────────────────

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01', // pin to a date — never use "latest"
  useCdn: true,             // serve cached content from Sanity's CDN
})

// ─────────────────────────────────────────────────────────────────────────────
// Image URL helper
// Usage: urlFor(member.photo).width(400).height(400).fit('crop').url()
// ─────────────────────────────────────────────────────────────────────────────

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}