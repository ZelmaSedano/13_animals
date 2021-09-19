export const getSightings = async () => {
  const response = await fetch("/api/sightings");
  // change to api/species
  return response.json();
};

// take the sighting and post it.  this is the method that we're passing into App.js/AddSightingForm component
// /api/sightings is the endpoint
export const addSighting = (sighting) => _post("/api/sightings", sighting);

// post method wrapper that is going to make it easier to make post methods from different components
const _post = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let result;
  try {
    result = await response.json();
  } catch {}
  return result;
};

// export const addTask = async (name) => {
//   const response = await fetch("/api/tasks", {
//     // change to api/species
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ name }),
//   });
//   return response.json();
// };
