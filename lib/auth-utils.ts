/**
 * Check if a user is authorized as an admin
 * Add your GitHub email(s) to the NEXT_PUBLIC_ADMIN_EMAILS environment variable
 */
export function isAuthorizedAdmin(email: string | undefined): boolean {
  if (!email) return false;

  // Get allowed admin emails from environment variable
  const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",").map(
    (e) => e.trim().toLowerCase()
  );

  if (!adminEmails || adminEmails.length === 0) {
    console.warn(
      "NEXT_PUBLIC_ADMIN_EMAILS not configured. No admins are authorized."
    );
    return false;
  }

  return adminEmails.includes(email.toLowerCase());
}
