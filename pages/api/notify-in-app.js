import { Knock } from "@knocklabs/node";

const knockClient = new Knock(process.env.KNOCK_SECRET_API_KEY);

const KNOCK_WORKFLOW = "in-app-messaging";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .setHeader("Allow", "POST")
      .json({ error: `${req.method} method is not accepted.` });
  }

  const { message, userId, tenant, templateType, componentType, title, body } =
    req.body;

  try {
    await knockClient.workflows.trigger(KNOCK_WORKFLOW, {
      recipients: [userId],
      actor: userId,
      tenant: tenant,
      data: {
        message,
        templateType,
        componentType,
        title,
        body,
      },
    });

    return res.status(200).json({ error: null });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || error.toString(), user: null });
  }
}
