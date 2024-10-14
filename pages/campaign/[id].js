import { useRouter } from 'next/router';

export default function CampaignPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Campaign Details</h1>
      <p className="text-lg">Campaign ID: {id}</p>
    </div>
  );
}
