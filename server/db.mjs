import dotenv from "dotenv";
import pgp from "pg-promise";

const db = initDb();

// 1) change to getSightings
export const getSightings = async () => await db.any("SELECT * FROM sightings");

// Adding Sightings
// adds the sightings to the DB
export const addSighting = async ({
  date_time,
  individual_id,
  appeared_healthy,
  sighter_email,
  common_name,
  location,
}) =>
  await db.any(
    "INSERT INTO sightings(date_time, individual_id, appeared_healthy, sighter_email, common_name, location) VALUES($1, $2, $3, $4, $5, $6)",
    [
      date_time,
      individual_id,
      appeared_healthy,
      sighter_email,
      common_name,
      location,
    ],
  );

function initDb() {
  let connection;

  if (process.env.DATABASE_URL === undefined) {
    dotenv.config({ path: "../.env" });
    connection = {
      user: "postgres",
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: 5442,
    };
  } else {
    connection = {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    };
  }

  return pgp()(connection);
}
