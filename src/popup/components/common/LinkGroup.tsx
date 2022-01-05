import React, { useState } from "react";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "./ExpansionPanel";
import { Link, Group, Tab } from "../../../types";
import "./styles/LinkGroup.scss";
import { MdOutlineClear } from "react-icons/md";
import { createTab, activateTab } from "../../../chrome/tabApi";

interface Props {
  group: Group;
  name: string;
  links: Link[];
  removeLink: (group: Group, collection: string, linkUrl: string) => void;
  removeGroup: (group: Group, collection: string) => void;
  activeTab: Tab;
}

const LinkGroup: React.FC<Props> = ({
  name,
  links,
  removeLink,
  removeGroup,
  group,
  activeTab,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const createGroupTabs = () => {
    const prevActiveTab = activeTab;
    links.forEach((link) => {
      createTab(link.url);
    });
    activateTab({ windowId: prevActiveTab.windowId, tabId: prevActiveTab.id });
  };
  return (
    <ExpansionPanel
      expandIcon={true}
      open={open}
      summary={
        <ExpansionPanelSummary open={open} handleClick={() => setOpen(!open)}>
          <span>{name}</span>
        </ExpansionPanelSummary>
      }
      details={
        <ExpansionPanelDetails>
          <div className="link-group__container">
            <div className="btn open" onClick={createGroupTabs}>
              Open {group == "linkCollections" ? "collection" : "session"}
            </div>
            <div className="link-group__links">
              {links.map((link, i) => (
                <div className="link-group__link" key={`group${name}Link${i}`}>
                  <div
                    className="link-group__link-title-and-url"
                    onClick={() => createTab(link.url)}
                  >
                    <span className="link-title">{link.title}</span>
                    <span className="link-url">{link.url}</span>
                  </div>
                  <div
                    onClick={() => removeLink(group, name, link.url)}
                    className="link-group__link-remove-icon"
                  >
                    <MdOutlineClear />
                  </div>
                </div>
              ))}
            </div>
            <div
              className="btn delete"
              onClick={() => removeGroup(group, name)}
            >
              Delete
            </div>
          </div>
        </ExpansionPanelDetails>
      }
    />
  );
};

export default LinkGroup;
