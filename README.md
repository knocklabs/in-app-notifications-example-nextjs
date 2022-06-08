# In-app notifications in React

This is an example app, written in next.js, to show an in-app notification experience, powered by [Knock](https://knock.app).

- [Try out this example](https://https://knock-in-app-notifications-react.vercel.app)
- [Read documentation on in-app UI in Knock](https://docs.knock.app/in-app-ui/overview)
- [Get started with Knock](https://docs.knock.app/getting-started/quick-start)

## Getting up-and-running

You'll need the following setup to start:

- An [account on Knock](https://dashboard.knock.app)
- A public and secret key for Knock
- An in-app feed channel setup in Knock
- A workflow in Knock (called `in-app`) with a single in-app channel step

You'll need to set the following environment variables:

```
KNOCK_SECRET_API_KEY=
NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY=
NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID=
```

## How this example works

Given that a notification feed is stateful, when a new session is opened we automatically `identify` a new user in Knock and persist the `userId` generated into local storage. We then use this `userId` to route notification messages to on the in-app feed.

You can see how we identify users and send notify calls to Knock in the `pages/api` directory. These functions are executed on the server-side by Next.

For our in-app toasts, we listen to all real-time messages coming in that have the `showToast` property not set to `false`. We'll then display a toast prompt using our custom `Toast` component.
