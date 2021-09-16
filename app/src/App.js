import * as React from "react";

import { Routes, Route, Link } from "react-router-dom";

import * as apiClient from "./apiClient";
// test comment
const App = () => {
  return (
    <main>
      <nav>
        <Link to="/">Home</Link> | <Link to="dashboard">Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </main>
  );
};

const Home = () => {
  const [sightings, setSightings] = React.useState([]);

  const loadSightings = async () => {
    const result = await apiClient.getSightings();
    setSightings(result);
    console.log(result);
  };
  // change to getSpecies

  React.useEffect(() => {
    loadSightings();
  }, []);

  return (
    <>
      <h1>{process.env.REACT_APP_TITLE}</h1>
      <h2>{process.env.REACT_APP_SUBTITLE}</h2>
      <SightingsList sightings={sightings} />
      {/* <AddTask loadSightings={loadSightings} /> */}
    </>
  );
};

const Dashboard = () => (
  <>
    <h1>Dashboard</h1>
  </>
);

// Component
const SightingsList = ({ sightings }) => (
  <ul>
    {sightings.map(
      ({
        sighting_id,
        date_time,
        individual_id,
        appeared_healthy,
        sighter_email,
        common_name,
        location,
      }) => (
        <li key={sighting_id}>
          {sighting_id}, {date_time}, {individual_id},{" "}
          {String(appeared_healthy)}, {sighter_email}, {common_name}, {location}
        </li>
      ),
    )}
  </ul>
);

// const AddTask = ({ loadSightings }) => {
//   const [task, setTask] = React.useState("");

//   const canAdd = task !== "";

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     if (canAdd) {
//       await apiClient.addTask(task);
//       loadSightings();
//       setTask("");
//     }
//   };

//   return (
//     <form onSubmit={onSubmit}>
//       <label>
//         New task:{" "}
//         <input onChange={(e) => setTask(e.currentTarget.value)} value={task} />
//       </label>
//       <button disabled={!canAdd}>Add</button>
//     </form>
//   );
// };

export default App;
