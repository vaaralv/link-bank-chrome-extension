import React from "react";
import LinkCollection from "../components/LinkCollection";
import { LinkCollection as LinkCollectionType } from "../../types";
import './styles/TheLinkCollection.scss'

interface Props {
  linkCollections: LinkCollectionType[];
  removeLink: (collection: string, linkUrl: string) => void;
  removeCollection: (collection: string) => void;
}

const TheLinkCollections: React.FC<Props> = ({
  linkCollections,
  removeLink,
  removeCollection
}) => {
  return (
    <div className="link-collections__container">
      {linkCollections &&
        linkCollections.map((collection, i) => (
          <LinkCollection
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
