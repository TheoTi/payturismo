export function generateUserFallback(username: string): string {
	if (!username) {
		return ''
	}

	const nameParts = username.trim().split(/\s+/)

	return nameParts
		.slice(0, 2)
		.map((part) => part[0].toUpperCase())
		.join('')
}
