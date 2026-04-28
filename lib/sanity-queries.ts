import { sanityClient } from './sanity'
import type { InsuranceService, TeamMember } from '@/types'

// ─────────────────────────────────────────────────────────────────────────────
// Services
// ─────────────────────────────────────────────────────────────────────────────

export async function getServices(): Promise<InsuranceService[]> {
  return sanityClient.fetch(
    `*[_type == "service"] | order(category asc, title asc) {
      "id":             _id,
      title,
      "slug":           slug.current,
      category,
      shortDescription,
      description,
      icon,
      targetAudience,
      popular,
      "features":       features[],
      "premium":        premiumOptions[] {
        id,
        name,
        amount,
        period,
        description
      }
    }`,
    {},
    // Revalidate every 60 seconds — keeps the site fast while
    // reflecting content changes within a minute of publishing.
    { next: { revalidate: 3600 } }
  )
}

export async function getServicesByCategory(
  category: string
): Promise<InsuranceService[]> {
  return sanityClient.fetch(
    `*[_type == "service" && category == $category] | order(title asc) {
      "id":             _id,
      title,
      "slug":           slug.current,
      category,
      shortDescription,
      description,
      icon,
      targetAudience,
      popular,
      "features":       features[],
      "premium":        premiumOptions[] {
        id,
        name,
        amount,
        period,
        description
      }
    }`,
    { category },
    { next: { revalidate: 3600 } }
  )
}

export async function getFeaturedServices(): Promise<InsuranceService[]> {
  return sanityClient.fetch(
    `*[_type == "service" && popular == true] | order(title asc) {
      "id":             _id,
      title,
      "slug":           slug.current,
      category,
      shortDescription,
      description,
      icon,
      targetAudience,
      popular,
      "features":       features[],
      "premium":        premiumOptions[] {
        id,
        name,
        amount,
        period,
        description
      }
    }`,
    {},
    { next: { revalidate: 3600 } }
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Team
// ─────────────────────────────────────────────────────────────────────────────

export async function getTeamMembers(): Promise<TeamMember[]> {
  return sanityClient.fetch(
    `*[_type == "teamMember"] | order(order asc) {
      "id":       _id,
      name,
      role,
      bio,
      "imageUrl": photo.asset->url,
      "photoAlt": photo.alt
    }`,
    {},
    { next: { revalidate: 3600 } }
  )
}