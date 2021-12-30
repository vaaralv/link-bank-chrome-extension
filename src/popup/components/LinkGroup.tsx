import React, { useState } from "react";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "./ExpansionPanel";
import { Link, Group } from "../../types";
import "./styles/LinkGroup.scss";
import { MdOutlineClear } from "react-icons/md";

interface Props {
  group: Group;
  name: string;
  links: Link[];
  removeLink: (group: Group, collection: string, linkUrl: string) => void;
  removeCollection: (group: Group, collection: string) => void;
}

const LinkGroup: React.FC<Props> = ({
  name,
  links,
  removeLink,
  removeCollection,
  group,
}) => {
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
          <div className="link-group__container">
            <div className="link-group__links">
              {links.map((link, i) => (
                <div
                  className="link-group__link"
                  key={`group${name}Link${i}`}
                >
                  <div className="link-group__link-title-and-url">
                    <span className="link-title">
                      {link.title}
                    </span>
                    <span className="link-url">
                      {link.url}
                    </span>
                  </div>
                  <div
                    onClick={() =>
                      removeLink(group, name, link.url)
                    }
                    className="link-group__link-remove-icon"
                  >
                    <MdOutlineClear />
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => removeCollection(group, name)}>
              Delete
            </button>
          </div>
        </ExpansionPanelDetails>
      }
    />
  );
};

export default LinkGroup;
