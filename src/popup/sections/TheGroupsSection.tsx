import React from "react";
import { LinkCollection, Tab, Group } from "../../types";
import LinkGroup from "../components/common/LinkGroup";
import './styles/TheGroupsSection.scss'

interface Props {
  tabSessions: LinkCollection[];
  activeTab: Tab;
  linkCollections: LinkCollection[];
  removeLink: (group: Group, collection: string, linkUrl: string) => void;
  removeGroup: (group: Group, collection: string) => void;
}

const TheGroupsSection: React.FC<Props> = ({
  tabSessions,
  activeTab,
  linkCollections,
  removeLink,
  removeGroup,
}) => {
  return (
    <div className="the-groups-section__container">
      <div className="the-groups-section__groups">
        <h2>Link Collections</h2>
        {linkCollections &&
          linkCollections.map((collection, i) => (
            <LinkGroup
              group="linkCollections"
              key={`linkCollection${i}`}
              name={collection.name}
              links={collection.links}
              removeLink={removeLink}
              removeGroup={removeGroup}
              activeTab={activeTab}
            />
          ))}
      </div>
      <div className="the-groups-section__groups second">
        <h2>Tab Sessions</h2>
        {tabSessions &&
          tabSessions.map((session, i) => (
            <LinkGroup
              group="tabSessions"
              key={`tabSession${i}`}
              name={session.name}
              links={session.links}
              removeLink={removeLink}
              removeGroup={removeGroup}
              activeTab={activeTab}
            />
          ))}
      </div>
    </div>
  );
};

export default TheGroupsSection;
