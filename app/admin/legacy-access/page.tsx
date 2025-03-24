import { GrantLegacyAccess } from "@/components/admin/grant-legacy-access"

export default function LegacyAccessPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Legacy Access Management</h1>
      <GrantLegacyAccess />
    </div>
  )
}

