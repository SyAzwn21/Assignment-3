"use client";

import { useState, useEffect } from "react";

function useFetch(url: string) {
  const [data, setData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('HTTP error! status: ${response.status}');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError((err as Error).message);
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, error, loading };
}

export default function Profile() {
  const { data, error, loading } = useFetch('http://localhost:7071/api/HttpTrigger1');

  return (
    <div>
      <h1>Profile Data:</h1>
      {loading && <p>Loading...</p>}
      {error ? <p>Error: {error}</p> : <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}