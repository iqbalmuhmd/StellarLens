const API_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:8000";

// Load planets and return as JSON.
async function httpGetPlanets() {
  try {
    const response = await fetch(`${API_URL}/planets`);
    if (!response.ok) {
      throw new Error('Failed to fetch planets');
    }
    const data = await response.json();    
    return data;
  } catch (error) {    
    console.log(error);
  }
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`);
  const fetchedLaunches = await response.json();

  return fetchedLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try {
    const response = await fetch(`${API_URL}/launches`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });

    return response;
  } catch (err) {
    return {
      ok: false,
    };
  }
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try {
    const response = await fetch(`${API_URL}/launches/${id}`, {
      method: "delete",
    });
    return response;
  } catch (error) {
    console.log(error);
    return {
      ok: false,
    };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
