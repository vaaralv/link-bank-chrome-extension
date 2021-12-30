import React from "react";
import LinkCollection from "../components/LinkGroup";
import { LinkCollection as LinkCollectionType, Group } from "../../types";
import "./styles/TheLinkCollection.scss";

interface Props {
  linkCollections: LinkCollectionType[];
  removeLink: (group: Group, collection: string, linkUrl: string) => void;
  removeCollection: (group: Group, collection: string) => void;
}

const TheLinkCollections: React.FC<Props> = ({
  linkCollections,
  removeLink,
  removeCollection,
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
          />
        ))}
    </div>
  );
};

export default TheLinkCollections;
