import { NetworkStatus, isRequestInFlight } from "@knocklabs/client";
import { Spinner } from "@knocklabs/react";
import create from "zustand";

import Header from "./Header";
import { NotificationCell } from "./NotificationCell";
import { PageType } from "./constants";

const LoadingSpinner = () => (
  <div className="rnf-notification-feed__spinner-container">
    <Spinner thickness={3} size="16px" />
  </div>
);

const EmptyFeed = ({ title, body }) => (
  <div className={`rnf-empty-feed`}>
    <div className="rnf-empty-feed__inner">
      <h2 className="rnf-empty-feed__header">{title}</h2>
      <p className="rnf-empty-feed__body">{body}</p>
    </div>
  </div>
);

const renderEmptyState = ({ currentPageType }) => {
  switch (currentPageType) {
    case PageType.All:
      return (
        <EmptyFeed
          title="No notifications yet"
          body="We'll let you know when we've got something new for you."
        />
      );
    case PageType.New:
      return (
        <EmptyFeed
          title="No unread items"
          body="Good job, there's nothing here."
        />
      );
    case PageType.Archived:
      return (
        <EmptyFeed
          title="No archived items"
          body="Tip: hover over an item to archive it."
        />
      );
  }
};

const Feed = ({
  feedClient,
  containerRef,
  currentPageType,
  setCurrentPageType,
  onNotificationButtonClick,
  onNotificationClick,
}) => {
  const useNotificationStore = create(feedClient.store);
  const { items, metadata, networkStatus } = useNotificationStore();

  const itemsToRender =
    currentPageType === PageType.New
      ? items.filter((item) => !item.read_at)
      : items;

  const noItems = itemsToRender.length === 0;
  const requestInFlight = isRequestInFlight(networkStatus);

  return (
    <div className="rnf-tabbed-notification-feed">
      <Header
        currentPageType={currentPageType}
        setCurrentPageType={setCurrentPageType}
        canMarkAllAsRead={
          currentPageType !== PageType.Archived && metadata.unread_count > 0
        }
        onMarkAllAsReadClick={() => {
          feedClient.markAllAsRead();
        }}
      />

      <div className="rnf-notification-feed__container" ref={containerRef}>
        {networkStatus === NetworkStatus.loading && <LoadingSpinner />}

        {networkStatus !== NetworkStatus.loading &&
          itemsToRender.map((item) => (
            <NotificationCell
              key={item.id}
              item={item}
              feedClient={feedClient}
              showUnreadIndicator={currentPageType !== PageType.Archived}
              canArchive={currentPageType !== PageType.Archived}
              onButtonClick={onNotificationButtonClick}
              onItemClick={onNotificationClick}
            />
          ))}

        {networkStatus === NetworkStatus.fetchMore && <LoadingSpinner />}

        {!requestInFlight && noItems && renderEmptyState({ currentPageType })}
      </div>
    </div>
  );
};

export default Feed;
