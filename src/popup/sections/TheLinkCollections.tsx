import React from "react";
import LinkCollection from "../components/LinkCollection";
import { LinkCollection as LinkCollectionType } from "../../types";
import './styles/TheLinkCollection.scss'

interface Props {
  linkCollections: LinkCollectionType[];
  removeLink: (collection: string, linkUrl: string) => void;
}

const TheLinkCollections: React.FC<Props> = ({
  linkCollections,
  removeLink,
}) => {
  return (
    <div className="link-collection__container">
      {linkCollections &&
        linkCollections.map((collection, i) => (
          <LinkCollection
            key={`linkCollection${i}`}
            name={collection.name}
            links={collection.links}
            removeLink={removeLink}
          />
        ))}
    </div>
  );
};

export default TheLinkCollections;
