import { CloseCircle } from "@knocklabs/react";
import React, { useCallback } from "react";
import { usePopperTooltip } from "react-popper-tooltip";

const ArchiveButton = ({ onClick }) => {
  const onClickHandler = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    onClick();
  }, []);

  const { getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip({ placement: "top-end" });

  return (
    <button
      ref={setTriggerRef}
      onClick={onClickHandler}
      type="button"
      aria-label="Archive notification"
      className={`rnf-archive-notification-btn`}
    >
      <CloseCircle />

      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({
            className: `rnf-tooltip`,
          })}
        >
          Archive notification
        </div>
      )}
    </button>
  );
};

export { ArchiveButton };
