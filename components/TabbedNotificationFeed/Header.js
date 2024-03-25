import { CheckmarkCircle } from "@knocklabs/react";
import { PageType, PageTypeLabel } from "./constants";

const Header = ({
  currentPageType,
  setCurrentPageType,
  canMarkAllAsRead,
  onMarkAllAsReadClick,
}) => (
  <div className="rnf-tabbed-notification-feed__header">
    <div className="rnf-tabbed-notification-feed__header-top">
      <span className="rnf-tabbed-notification-feed__header-type">
        Notifications
      </span>
      {currentPageType !== PageType.Archived && (
        <button
          type="button"
          className="rnf-mark-all-as-read"
          disabled={!canMarkAllAsRead}
          onClick={() => {
            onMarkAllAsReadClick();
          }}
        >
          Mark all as read
          <CheckmarkCircle />
        </button>
      )}
    </div>

    <div className="rnf-tabbed-notification-feed__header-tabs">
      {Object.keys(PageType).map((pageType) => (
        <button
          key={pageType}
          onClick={() => setCurrentPageType(pageType)}
          className={`rnf-tabbed-notification-feed__header-tab ${
            pageType === currentPageType
              ? "rnf-tabbed-notification-feed__header-tab--selected"
              : ""
          }`}
        >
          {PageTypeLabel[pageType]}
        </button>
      ))}
    </div>
  </div>
);

export default Header;
