import { getStore } from "@netlify/blobs";

export default async function handler(request) {
  const store = getStore("bienestaractivo");

  const url = new URL(request.url);
  const type = url.searchParams.get("type") || "visitas";

  const currentValue = await store.get(type);
  const currentNumber = currentValue ? Number(currentValue) : 0;

  const newValue = currentNumber + 1;

  await store.set(type, String(newValue));

  return new Response(
    JSON.stringify({
      type,
      value: newValue
    }),
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}