import React from "react";
import LinkCollection from "./common/LinkGroup";
import { LinkCollection as LinkCollectionType, Group, Tab } from "../../types";


interface Props {
  linkCollections: LinkCollectionType[];
  removeLink: (group: Group, collection: string, linkUrl: string) => void;
  removeCollection: (group: Group, collection: string) => void;
  activeTab: Tab;
}

const TheLinkCollections: React.FC<Props> = ({
  linkCollections,
  removeLink,
  removeCollection,
  activeTab,
}) => {
  return (
    <div className="link-collections__container">
      <h2>Link Collections</h2>
      {linkCollections &&
        linkCollections.map((collection, i) => (
          <LinkCollection
            group="linkCollections"
            key={`linkCollection${i}`}
            name={collection.name}
            links={collection.links}
            removeLink={removeLink}
            removeCollection={removeCollection}
            activeTab={activeTab}
          />
        ))}
    </div>
  );
};

export default TheLinkCollections;
