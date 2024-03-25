import { Avatar } from "@knocklabs/react";
import {
  formatTimestamp,
  renderNodeOrFallback,
  useTranslations,
} from "@knocklabs/react-core";
import { Button } from "@telegraph/button";
import { Stack } from "@telegraph/layout";
import React, { useMemo } from "react";
import { ArchiveButton } from "./ArchiveButton";

function maybeNavigateToUrlWithDelay(url) {
  if (url && url !== "") {
    setTimeout(() => window.location.assign(url), 200);
  }
}

export const NotificationCell = ({
  item,
  feedClient,
  onItemClick,
  onButtonClick,
  avatar,
  children,
  showUnreadIndicator = true,
  canArchive = true,
}) => {
  const { locale } = useTranslations();

  const blocksByName = useMemo(() => {
    return item.blocks.reduce((acc, block) => {
      return { ...acc, [block.name]: block };
    }, {});
  }, [item]);

  const actionUrl = blocksByName.action_url?.rendered;
  const buttonSet = blocksByName.actions;

  const onContainerClickHandler = React.useCallback(() => {
    // Mark as interacted + read once we click the item
    feedClient.markAsInteracted(item);

    if (onItemClick) return onItemClick(item);

    return maybeNavigateToUrlWithDelay(actionUrl);
  }, [item, actionUrl, onItemClick, feedClient]);

  const onButtonClickHandler = React.useCallback(
    (e, button) => {
      feedClient.markAsInteracted(item);

      if (onButtonClick) return onButtonClick(item, button);

      return maybeNavigateToUrlWithDelay(button.action);
    },
    [onButtonClick, feedClient, item]
  );

  const onKeyDown = React.useCallback(
    (ev) => {
      switch (ev.key) {
        case "Enter": {
          ev.stopPropagation();
          onContainerClickHandler();
          break;
        }
        default:
          break;
      }
    },
    [onContainerClickHandler]
  );

  const actor = item.actors[0];

  return (
    <div
      className={`rnf-notification-cell`}
      onClick={onContainerClickHandler}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <div className="rnf-notification-cell__inner">
        {showUnreadIndicator && !item.read_at && (
          <div className="rnf-notification-cell__unread-dot" />
        )}

        {renderNodeOrFallback(
          avatar,
          actor && "name" in actor && actor.name && (
            <Avatar name={actor.name} src={actor.avatar} />
          )
        )}

        <div className="rnf-notification-cell__content-outer">
          {blocksByName.body && (
            <div
              className="rnf-notification-cell__content"
              dangerouslySetInnerHTML={{
                __html: blocksByName.body.rendered,
              }}
            />
          )}

          {buttonSet && (
            <div className="rnf-notification-cell__button-group">
              <Stack gap="2">
                {buttonSet.buttons.map((button, i) => (
                  <Button
                    size="1"
                    variant={i === 0 ? "solid" : "outline"}
                    color={i === 0 ? "accent" : "gray"}
                    key={button.name}
                    onClick={(e) => onButtonClickHandler(e, button)}
                  >
                    {button.label}
                  </Button>
                ))}
              </Stack>
            </div>
          )}

          {children && (
            <div className="rnf-notification-cell__child-content">
              {children}
            </div>
          )}

          <span className="rnf-notification-cell__timestamp">
            {formatTimestamp(item.inserted_at, { locale })}
          </span>
        </div>

        {canArchive && (
          <ArchiveButton onClick={() => feedClient.markAsArchived(item)} />
        )}
      </div>
    </div>
  );
};
