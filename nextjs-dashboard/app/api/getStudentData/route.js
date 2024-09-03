// app/api/getStudentData/route.js

export async function GET(req) {
  try {
    const response = await fetch('http://localhost:7071/api/HttpTrigger', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from local Azure Function');
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch data', details: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

// Add other HTTP methods (POST, PUT, DELETE, etc.) if needed
