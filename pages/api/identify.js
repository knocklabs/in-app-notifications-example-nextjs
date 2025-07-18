import { faker } from "@faker-js/faker";
import { Knock } from "@knocklabs/node";
import { v4 as uuidv4 } from "uuid";

const knockClient = new Knock({ apiKey: process.env.KNOCK_SECRET_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .setHeader("Allow", "POST")
      .json({ error: `${req.method} method is not accepted.` });
  }

  const { name, id } = req.body;
  const userId = id || uuidv4();

  try {
    const knockUser = await knockClient.users.update(userId, {
      name: name || faker.person.fullName(),
      avatar: "https://xsgames.co/randomusers/assets/avatars/male/2.jpg",
    });
    return res.status(200).json({ error: null, user: knockUser });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || error.toString(), user: null });
  }
}
