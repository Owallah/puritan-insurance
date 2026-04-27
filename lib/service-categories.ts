import { ServiceCategory, ServiceCategoryInfo } from '@/types'

export const PRODUCT_CLASSES: Record<ServiceCategory, ServiceCategoryInfo> = {
  liability: {
    id: 'liability',
    title: 'Liability Covers',
    description: 'Protect your business from legal claims, lawsuits, and third-party liabilities',
    icon: 'Shield',
    color: 'text-gold-600',
    bgColor: 'bg-gold-50',
    borderColor: 'border-gold-200',
  },
  property: {
    id: 'property',
    title: 'Property Insurance',
    description: 'Safeguard your physical assets, equipment, and goods from damage or loss',
    icon: 'Building',
    color: 'text-navy-700',
    bgColor: 'bg-navy-50',
    borderColor: 'border-navy-200',
  },
  people: {
    id: 'people',
    title: 'People Insurance',
    description: 'Protect your greatest asset — your employees and their well-being',
    icon: 'Users',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
  },
  personal: {
    id: 'personal',
    title: 'Personal Line Covers',
    description: 'Insurance solutions for individuals, families, and personal assets',
    icon: 'User',
    color: 'text-sky-600',
    bgColor: 'bg-sky-50',
    borderColor: 'border-sky-200',
  },
}