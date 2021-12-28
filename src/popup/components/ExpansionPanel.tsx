import React, { useState, useEffect } from "react";
import { MdExpandMore } from "react-icons/md";
import "./styles/ExpansionPanel.scss";

interface ExpansionPanelSummaryProps {
  children: React.ReactElement;
  expandIcon?: React.ReactNode;
  disabled?: boolean;
  handleClick?: () => void;
  button?: boolean;
}

interface ExpansionPanelDetailsProps {
  children: React.ReactElement;
  button?: boolean;
}

interface ExpansionPanelProps {
  summary: React.ReactElement;
  details?: React.ReactElement;
  expandIcon?: React.ReactNode;
  disabled?: boolean;
  open: boolean;
  button?: boolean;
}

export const ExpansionPanelSummary = ({
  children,
  expandIcon,
  disabled,
  handleClick,
  button,
}: ExpansionPanelSummaryProps): JSX.Element => {
  return (
    <div
      onClick={handleClick}
      className={`expansion-panel-summary ${disabled && "disabled"} ${
        button && "button"
      }`}
    >
      <div className="expansion-panel-summary-children">{children}</div>
      {expandIcon && expandIcon}
    </div>
  );
};

export const ExpansionPanelDetails = ({
  children,
  button,
}: ExpansionPanelDetailsProps): JSX.Element => {
  return (
    <div className={`expansion-panel-details ${button && "button"}`}>
      {children}
    </div>
  );
};

export const ExpansionPanel = ({
  summary,
  details,
  disabled,
  open,
  button,
}: ExpansionPanelProps): JSX.Element => {
  const [expanded, setExpanded] = useState(open ? open : false);

  const handleSummaryClick = (): void => {
    if (!disabled) setExpanded(!expanded);
    if (!open) setExpanded(false);
  };

  useEffect(() => {
    setExpanded(open && !disabled);
  }, [open]);

  const getExpandIcon = (
    details: boolean,
    expanded: boolean
  ): React.ReactNode | undefined => {
    if (details) {
      return (
        <div className={`expansion-panel-icon ${expanded && "expanded"}`}>
          <MdExpandMore />
        </div>
      );
    } else return undefined;
  };
  return (
    <div
      className={`expansion-panel ${expanded && "expanded"} ${
        button && "button"
      }`}
    >
      {React.cloneElement(summary, {
        disabled: disabled,
        expandIcon: getExpandIcon(details != undefined, expanded),
        handleClick: handleSummaryClick,
        button: button,
        ...summary.props,
      })}
      {expanded && !disabled && details
        ? React.cloneElement(details, {
            disabled: disabled,
            button: button,
            ...details.props,
          })
        : null}
    </div>
  );
};
