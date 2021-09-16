export const getSightings = async () => {
  const response = await fetch("/api/sightings");
  // change to api/species
  return response.json();
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
