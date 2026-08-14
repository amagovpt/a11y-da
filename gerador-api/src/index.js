const ALLOWED_ORIGIN = "https://jorgeponto.github.io";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function response(body, status = 200, contentType = "text/plain") {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": contentType,
      ...corsHeaders(),
    },
  });
}

export default {
  async fetch(request) {
    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(),
      });
    }

    // Apenas GET
    if (request.method !== "GET") {
      return response("Method Not Allowed", 405);
    }

    const requestUrl = new URL(request.url);

    // A API só responde em /serv/
    if (
      requestUrl.pathname !== "/serv/" &&
      requestUrl.pathname !== "/serv"
    ) {
      return response("Not Found", 404);
    }

    const statementUrl = requestUrl.searchParams.get("url");

    if (!statementUrl) {
      return response("No statement found", 400);
    }

    let targetUrl;

    try {
      targetUrl = new URL(statementUrl);
    } catch {
      return response("Invalid URL", 400);
    }

    // Apenas HTTP e HTTPS
    if (!["http:", "https:"].includes(targetUrl.protocol)) {
      return response("Only HTTP and HTTPS URLs are supported", 400);
    }

    // Bloqueios básicos contra hosts locais
    const hostname = targetUrl.hostname.toLowerCase();

    const blockedHosts = [
      "localhost",
      "localhost.localdomain",
      "127.0.0.1",
      "0.0.0.0",
      "::1",
    ];

    if (blockedHosts.includes(hostname)) {
      return response("Host not allowed", 403);
    }

    try {
      const upstream = await fetch(targetUrl.toString(), {
        method: "GET",
        redirect: "follow",
      });

      if (!upstream.ok) {
        return response(
          `Unable to load statement: HTTP ${upstream.status}`,
          502
        );
      }

      const contentType =
        upstream.headers.get("Content-Type") || "text/html";

      const body = await upstream.text();

      return new Response(body, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          ...corsHeaders(),
        },
      });
    } catch (error) {
      console.error("Cannot read accessibility statement:", error);

      return response(
        "Cannot read accessibility statement",
        502
      );
    }
  },
};
