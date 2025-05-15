import ErrorPage from "@/components/error-page";
import OAuthConsentScreen from "@/app/(authorization-server)/oauth/v2/auth/oauth-concent-screen";

async function Authorization({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = {
    response_type: (await searchParams).response_type,
    client_id: (await searchParams).client_id,
    redirect_uri: (await searchParams).redirect_uri,
    code_challenge: (await searchParams).code_challenge,
    code_challenge_method: (await searchParams).code_challenge_method,
    scope: (await searchParams).scope,
  };

  if (Object.values(params).some((value) => value === undefined))
    return (
      <ErrorPage
        errorDefinition={{
          error: "missing query params",
          errorDescription: "Missing required parameters",
          errorType: "query params",
        }}
      />
    );

  return (
    <OAuthConsentScreen
      params={{
        // TODO: supply real app name 
        appName: "wellfound",
      }}
    />
  );
}

export default Authorization;
