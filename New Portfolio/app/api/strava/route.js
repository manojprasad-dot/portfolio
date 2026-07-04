export const dynamic = "force-dynamic";

const jsonHeaders = {
  "Cache-Control": "no-store",
};

export async function GET() {
  const missingEnv = [
    "STRAVA_CLIENT_ID",
    "STRAVA_CLIENT_SECRET",
    "STRAVA_REFRESH_TOKEN",
  ].filter((key) => !process.env[key]);

  if (missingEnv.length > 0) {
    return Response.json(
      {
        error: "Missing Strava configuration",
        missing: missingEnv,
      },
      { status: 500, headers: jsonHeaders }
    );
  }

  try {
    const tokenResponse = await fetch("https://www.strava.com/api/v3/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      cache: "no-store",
      body: new URLSearchParams({
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: process.env.STRAVA_REFRESH_TOKEN,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      return Response.json(
        { error: "Failed to refresh token", details: tokenData },
        { status: 500, headers: jsonHeaders }
      );
    }

    const response = await fetch("https://www.strava.com/api/v3/athlete/activities", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        { error: "Failed to fetch activities", details: data },
        { status: 500, headers: jsonHeaders }
      );
    }

    return Response.json(data, { headers: jsonHeaders });
  } catch (error) {
    return Response.json(
      {
        error: "Unable to reach Strava right now",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500, headers: jsonHeaders }
    );
  }
}
