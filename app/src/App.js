import * as React from "react";

import { Routes, Route } from "react-router-dom";

import * as apiClient from "./apiClient";

import "./styles.css";

const Dashboard = () => (
  <>
    <h1>Dashboard</h1>
  </>
);

const App = () => {
  return (
    <main>
      <header className="header-wrapper">
        <h1>Wildlife Tracker</h1>
      </header>
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
    console.log(result); // test to see if sightings are working
  };

  // 2) Connection to API Client - function that takes the sighting
  // 4) test to see if data is working w/ a console.log
  // const addSighting = (sighting) => console.log(sighting);
  const addSighting = (sighting) => {
    console.log(sighting);
    apiClient.addSighting(sighting).then(loadSightings);
  };
  // you can reference functions from a different file using the .method, since they are imported methods
  // similar to React.useState - that imported the useState method from a diff file

  React.useEffect(() => {
    loadSightings();
  }, []);

  return (
    <>
      <h1>{process.env.REACT_APP_TITLE}</h1>
      <h2>{process.env.REACT_APP_SUBTITLE}</h2>
      <AddSightingForm addSighting={addSighting} />
      <SightingsList sightings={sightings} />
      {/* <AddTask loadSightings={loadSightings} /> */}
    </>
  );
};

// Component
function SightingsList({ sightings }) {
  return (
    <ol className="sightings-text">
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
            <span>Species:</span> {common_name}, <span>Animal ID:</span>{" "}
            {individual_id}, <span>Healthy:</span> {String(appeared_healthy)},{" "}
            {""}
            <span>Reporter Email:</span> {sighter_email}, <span>Location:</span>{" "}
            {location}, <span>Sighting Date:</span>{" "}
            {date_time.split(/[-T.]/).slice(0, 3).join("/")}
          </li>
        ),
      )}
    </ol>
  );
}

// We are basing this form off George's AddEvent function at this link, on line 131: https://github.com/gsong/express-react-project-example/blob/feature/eventonica/app/src/Events/index.js

// we are adding to the db instead of state, b/c our state object is pulled from the database
// 1) addSighting - adds sighting to DB
// 2) pulling state from the DB
// 3) the only thing we're keeping track of are current sightings

// addSighting is a function imported as a prop from apiClient.js

// ^ connection to the apiClient
const AddSightingForm = ({ addSighting }) => {
  // onSubmit function takes an event & executes an entire function
  const onSubmit = (event) => {
    // prevents page from reloading after submission
    event.preventDefault();
    // sets an element called 'form' as the event's target
    const form = event.currentTarget;
    // adding a date to the sighting - which is now
    const date_time = new Date().toISOString();
    // getting what's entered into form out of the form
    const {
      individual_id: { value: individual_id },
      appeared_healthy: { value: appeared_healthy },
      sighter_email: { value: sighter_email },
      common_name: { value: common_name },
      location: { value: location },
    } = form.elements;
    // checking to see if the data is passing correctly
    console.log(
      date_time,
      individual_id,
      appeared_healthy,
      sighter_email,
      common_name,
      location,
    );
    // 3) calling the method addSighting and connecting to the API Client, and we're passing the form data + the time s
    // connection to the API Client, call the function that's in API Client to make the post request
    addSighting({
      date_time,
      individual_id,
      appeared_healthy,
      sighter_email,
      common_name,
      location,
    });
    // everytime you click the 'add' button, the form clears
    form.reset();
  };
  return (
    <form {...{ onSubmit }}>
      <h3>Please enter animal sighting:</h3>
      <div className="input-wrapper">
        <div className="left-inputs">
          <label>
            <input
              name="common_name"
              placeholder="Name, Ex: indian elephant"
              required
            />
          </label>
          <label>
            <input name="individual_id" placeholder="Animal's ID" required />
          </label>
          <label>
            <input
              name="appeared_healthy"
              placeholder="Healthy? True or False"
              required
            />
          </label>
        </div>
        <div className="right-inputs">
          <label>
            <input name="sighter_email" placeholder="Your Email" required />
          </label>
          <label>
            <input
              name="location"
              placeholder="Location: Ex: 'India'"
              required
            />
          </label>
          <button>Add Sighting</button>
        </div>
      </div>
    </form>
  );
};

export default App;
