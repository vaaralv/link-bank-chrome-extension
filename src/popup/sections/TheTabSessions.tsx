import React from "react";
import LinkCollection from "../components/LinkGroup";
import { LinkCollection as LinkCollectionType, Group } from "../../types";
import "./styles/TheLinkCollection.scss";

interface Props {
  tabSessions: LinkCollectionType[];
  removeLink: (group: Group, collection: string, linkUrl: string) => void;
  removeSession: (group: Group, collection: string) => void;
}

const TheTabSessions: React.FC<Props> = ({
  tabSessions,
  removeLink,
  removeSession,
}) => {
  return (
    <div className="tab-sessions__container">
      <h2>Tab Sessions</h2>
      {tabSessions &&
        tabSessions.map((session, i) => (
          <LinkCollection
            group="tabSessions"
            key={`tabSession${i}`}
            name={session.name}
            links={session.links}
            removeLink={removeLink}
            removeCollection={removeSession}
          />
        ))}
    </div>
  );
};

export default TheTabSessions;
