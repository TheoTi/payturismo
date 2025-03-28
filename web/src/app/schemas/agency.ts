import { z } from 'zod'
import { AGENCY_STATUS } from '../constants/agencyStatus'

export const agencyUpdateSchema = z.object({
	fantasyName: z.string().min(2).max(100),
	corporateName: z.string().min(2).max(100),
	cnpj: z
		.string()
		.regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, 'CNPJ invalid.'),
	stateRegistration: z.string().optional(),
	municipalRegistration: z.string().optional().or(z.literal('')),
	status: z.enum([
		AGENCY_STATUS.active.key,
		AGENCY_STATUS.inactive.key,
		AGENCY_STATUS.pending.key,
		AGENCY_STATUS.suspended.key,
	]),
	foundationDate: z.coerce.date().optional().or(z.literal('')),
	email: z.string().email(),
	phone: z.string().min(14).max(15),
	website: z.string().url().optional().or(z.literal('')),
})

export const agencyCreateSchema = z
	.object({
		fantasyName: z
			.string()
			.min(2, 'Fantasy name must be at least 2 characters')
			.max(100, 'Fantasy name cannot exceed 100 characters')
			.trim(),

		corporateName: z
			.string()
			.min(2, 'Corporate name must be at least 2 characters')
			.max(100, 'Corporate name cannot exceed 100 characters')
			.trim(),

		cnpj: z
			.string()
			.regex(
				/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
				'Invalid CNPJ format (XX.XXX.XXX/XXXX-XX)',
			),
		// .transform((val) => val.replace(/[^\d]/g, "")), // Store only numbers

		stateRegistration: z
			.string()
			.max(20, 'State registration cannot exceed 20 characters')
			.optional()
			.or(z.literal('')),

		municipalRegistration: z
			.string()
			.max(20, 'Municipal registration cannot exceed 20 characters')
			.optional()
			.or(z.literal('')),

		status: z
			.enum(['active', 'inactive', 'pending', 'suspended'])
			.default('pending'),

		foundationDate: z.coerce
			.date()
			.max(new Date(), 'Foundation date cannot be in the future')
			.optional()
			.or(z.literal('')),

		email: z
			.string()
			.email('Invalid email address')
			.max(100, 'Email cannot exceed 100 characters')
			.transform((val) => val.toLowerCase().trim()),

		phone: z
			.string()
			.min(10, 'Phone number must be at least 10 digits')
			.max(15, 'Phone number cannot exceed 15 characters'),
		// .regex(/^\+?\d+$/, "Invalid phone number format"),

		website: z
			.string()
			.url('Invalid URL format')
			.max(100, 'Website URL cannot exceed 100 characters')
			.optional()
			.or(z.literal(''))
			.transform((val) => val || undefined),
	})
	.refine(
		(data) => {
			if (data.website && !data.website.startsWith('https://')) {
				return false
			}
			return true
		},
		{
			message: 'Website must start with https://',
			path: ['website'],
		},
	)

export type AgencyUpdateFormValues = z.infer<typeof agencyUpdateSchema>
export type AgencyCreateInput = z.infer<typeof agencyCreateSchema>
