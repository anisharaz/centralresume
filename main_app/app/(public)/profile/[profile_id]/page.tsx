async function PublicProfilePage({
  searchParams,
  params,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ profile_id: string }>;
}) {
  const profile_tag = (await searchParams).profile_tag || "#general";
  const profile_id = (await params).profile_id;
  return (
    <div>
      <h1>Public Profile id {profile_id}</h1>
      <p>Filters: {JSON.stringify(profile_tag)}</p>
    </div>
  );
}

export default PublicProfilePage;
