import { describe, it, expect } from "vitest";

describe("Strava OAuth Integration", () => {
  it("should have valid Strava credentials configured", () => {
    const clientId = process.env.STRAVA_CLIENT_ID;
    const clientSecret = process.env.STRAVA_CLIENT_SECRET;

    expect(clientId).toBeDefined();
    expect(clientSecret).toBeDefined();
    expect(clientId).not.toBe("YOUR_CLIENT_ID");
    expect(clientSecret).not.toBe("YOUR_CLIENT_SECRET");
    expect(clientId?.length).toBeGreaterThan(0);
    expect(clientSecret?.length).toBeGreaterThan(0);
  });

  it("should construct valid Strava authorization URL", () => {
    const clientId = process.env.STRAVA_CLIENT_ID;
    const redirectUri = process.env.STRAVA_REDIRECT_URI || "https://yourdomain.com/setup";

    const params = new URLSearchParams({
      client_id: clientId || "",
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "activity:read_all,read",
      approval_prompt: "auto",
      state: "123", // Test user ID
    });

    const authUrl = `https://www.strava.com/oauth/authorize?${params.toString()}`;

    expect(authUrl).toContain("https://www.strava.com/oauth/authorize");
    expect(authUrl).toContain(`client_id=${clientId}`);
    expect(authUrl).toContain("response_type=code");
    expect(authUrl).toContain("scope=activity%3Aread_all%2Cread");
  });

  it("should have redirect URI configured", () => {
    const redirectUri = process.env.STRAVA_REDIRECT_URI;
    
    expect(redirectUri).toBeDefined();
    expect(redirectUri).not.toBe("https://yourdomain.com/api/integrations/strava/callback");
    
    if (redirectUri) {
      expect(redirectUri).toMatch(/^https?:\/\//);
      expect(redirectUri).toContain("/setup");
    }
  });
});
