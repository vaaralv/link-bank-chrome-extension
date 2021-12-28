import React, { useState } from "react";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "./ExpansionPanel";
import { Link } from "../../types";
import "./styles/LinkCollection.scss";
import { MdOutlineClear } from "react-icons/md";

interface Props {
  name: string;
  links: Link[];
  removeLink: (collection: string, linkUrl: string) => void
}

const LinkCollection: React.FC<Props> = ({ name, links, removeLink }) => {
  const [open, setOpen] = useState<boolean>(false);
  console.log("links in link collection", links);
  return (
    <ExpansionPanel
      expandIcon={true}
      open={open}
      summary={
        <ExpansionPanelSummary handleClick={() => setOpen(!open)}>
          <span>{name}</span>
        </ExpansionPanelSummary>
      }
      details={
        <ExpansionPanelDetails>
          <div className="link-collection__links">
            {links.map((link, i) => (
              <div className="link-collection__link" key={`collectionLink${i}`}>
                <div className="link-collection__link-title-and-url">
                  <span className="link-collection__link-title">
                    {link.title}
                  </span>
                  <span className="link-collection__link-url">{link.url}</span>
                </div>
                <div onClick={() => removeLink(name, link.url)}className="link-collection__link-remove-icon"><MdOutlineClear/></div>
              </div>
            ))}
          </div>
        </ExpansionPanelDetails>
      }
    />
  );
};

export default LinkCollection;
