# In-app notifications in React

This is an example app, written in Next.js, to show an in-app notification experience, powered by [Knock](https://knock.app).

- [Try this example live](https://knock-in-app-notifications-react.vercel.app)
- [Read documentation on in-app UI in Knock](https://docs.knock.app/in-app-ui/overview)
- [Get started with Knock](https://docs.knock.app/getting-started/quick-start)

## Getting up-and-running

You'll need the following setup to start:

- An [account on Knock](https://dashboard.knock.app)
- [Public and secret API keys](https://docs.knock.app/developer-tools/api-keys) for Knock
- An [in-app feed channel](https://docs.knock.app/integrations/in-app/knock) setup in Knock
  -- To find the channel ID for your in-app channel(s), go to Integrations > Channels in the Knock dashboard, navigate to the channel page of your in-app channel, and copy the channel ID.
- A [workflow](https://docs.knock.app/concepts/workflows) in Knock called `in-app` with a single in-app channel step

You'll need to set the following environment variables:

```
KNOCK_SECRET_API_KEY=
NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY=
NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID=
```

Once you have the environment variables defined, you can run `yarn dev` to start the local server on http://localhost:3000.

## How this example works

If you load this site in a browser, it should be fully-functional. In the next few steps, we'll examine how this application works.

### Identifying users

Given that a notification feed is stateful, when a new session is opened we automatically `identify` a new user in Knock and persist the `userId` generated into local storage. We then use this `userId` to route notification messages to the in-app feed.

You can see how we identify users and send notify calls to Knock in the `pages/api/identify.js` file. These functions are executed on the server-side by Next and use `faker.js` to create a fictional user in your account:

```javascript
import { Knock } from "@knocklabs/node";
const knockClient = new Knock(process.env.KNOCK_SECRET_API_KEY);

const knockUser = await knockClient.users.identify(userId, {
  name: name || faker.name.findName(),
});
```

[Managing recipients](https://docs.knock.app/managing-recipients/identifying-recipients) is an important concept in Knock. You can either identify recipients as a part of your regular user lifecycle, like when a new user is created, or identify them inline when you trigger a workflow.

### Triggering workflows

When you submit the form in the example app, it runs the code in `/page/api/notify.js` to trigger your `in-app` workflow. That function looks like this:

```javascript
import { Knock } from "@knocklabs/node";
const knockClient = new Knock(process.env.KNOCK_SECRET_API_KEY);

await knockClient.workflows.trigger(KNOCK_WORKFLOW, {
  recipients: [userId],
  actor: userId,
  tenant: tenant,
  data: {
    message,
    showToast,
  },
});
```

The `workflows.trigger` function takes several pieces of data. The `recipients` property is an array of user identifiers. If a user already exists, Knock uses that data for the workflow. If it doesn't exist, Knock creates it like we discussed above with inline identification.

The `actor` property describes the user who is completing the action to trigger the workflow. In this case, they are the same, but in your app the `actor` and `recipients` will in most cases be different.

The `tenant` property describes which tenant to use for the execution of the workflow, in this case `Team A` or `Team B`.

The `data` property is a JSON payload that you want to pass into the workflow. In this case, it contains the `message` from our application's form and a `showToast` boolean from the form state.

### Rendering feeds and toasts

All of the components that handle the rendering of notifications and toasts are combined in the `/pages/index.js` file. In this file, we wrap our UI components in two different providers: `KnockProvider` and `KnockFeedProvider`. The `KnockProvider` is the top-level provider for all of the Knock UI components you may implement in a project and it handles authentication and authorization with Knock APIs. The `KnockFeedProvider` is similar, but handles details related just to the notification feed.

You can read more about how to use these providers to [build feeds](https://docs.knock.app/in-app-ui/react/feed) in our docs.

#### Feed components

The actual components for the notification feed live in `/components/NotificationFeed.js` and use some pre-built components from the `@knocklabs/react` package. The contents of this file create a popover-style notification feed.

```javascript
import {
  NotificationFeedPopover,
  NotificationIconButton,
} from "@knocklabs/react";

import { useState, useRef } from "react";

const NotificationFeed = () => {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);

  return (
    <>
      <NotificationIconButton
        ref={notifButtonRef}
        onClick={(e) => setIsVisible(!isVisible)}
      />
      <NotificationFeedPopover
        buttonRef={notifButtonRef}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
      />
    </>
  );
};

export default NotificationFeed;
```

Since this is a pre-built UI component, all you need to do is include it in your project inside the correct providers, and Knock handles the rest. If you're looking for something more custom, you can check out [the common recipes](https://docs.knock.app/in-app-ui/react/feed#common-recipes) for customizing the CSS, notifications cells, or header.

#### Toast components

For our in-app toasts, we listen to all real-time messages coming in that have the `showToast` property not set to `false`. We'll then display a toast prompt using our custom `Toast` component. To accomplish this, we use the [headless capabilities](https://docs.knock.app/in-app-ui/react/custom-notifications-ui) of the Knock React package to create custom UI. You can find this code in the `/components/NotificationToasts.js` file.

```javascript
import { useToast } from "@chakra-ui/react";
import { useKnockFeed } from "@knocklabs/react";
import { useCallback, useEffect } from "react";
import Toast from "./Toast";

const NotificationToasts = () => {
  const { feedClient } = useKnockFeed();
  const toast = useToast();

  const onNotificationsReceived = useCallback(
    ({ items }) => {
      // Whenever we receive a new notification from our real-time stream, show a toast
      // (note here that we can receive > 1 items in a batch)
      items.forEach((notification) => {
        console.log(notification);

        if (notification.data.showToast === false) return;

        toast({
          render: (props) => (
            <Toast
              {...props}
              title={"New notification received"}
              description={notification.blocks[0].rendered}
              onClose={() => {
                feedClient.markAsSeen(notification);
                props.onClose();
              }}
            />
          ),
          position: "bottom-right",
        });
      });
    },
    [feedClient, toast]
  );

  useEffect(() => {
    // Receive all real-time notifications on our feed
    feedClient.on("items.received.realtime", onNotificationsReceived);

    // Cleanup
    return () =>
      feedClient.off("items.received.realtime", onNotificationsReceived);
  }, [feedClient, onNotificationsReceived]);

  return null;
};

export default NotificationToasts;
```

This example is slightly different, but provides more flexibility than the pre-built UI. Using the `useKnockFeed` hook, we can access the feed client directly. From there, we can listen to a specific event called `items.received.realtime` and invoke a callback function:

```javascript
feedClient.on("items.received.realtime", onNotificationsReceived);
```

The `onNotificationsReceived` callback looks at each notification's payload data on the `notification.data.showToast` to conditionally render the toasts only if that option was sent as `true` when we trigged the notification. This gives the developer a lot of control in creating unique feed experiences.

## Wrapping up

Knock provides many different avenues to create unique feed experiences. So check out some of these links to continue learning about what Knock can do for your applications:

- [Pre-built React components](https://docs.knock.app/in-app-ui/react/overview)
- [Component API reference](https://docs.knock.app/sdks/react/reference)
- [JavaScript client overview](https://docs.knock.app/sdks/javascript/quick-start)
