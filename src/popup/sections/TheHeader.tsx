import React, { useState } from "react";
import { Link } from "../../types";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "../components/ExpansionPanel";
import "./styles/TheHeader.scss";

interface Props {
  activeTab?: Link;
  saveLink: (collectionName: string) => void;
  collectionNames: string[];
}

const CreateNewCollection: React.FC<Props> = ({
  saveLink,
  collectionNames,
}) => {
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(input);
  };
  return (
    <div className="create-new-collection">
      <form onSubmit={handleSubmit}>
        <label>
          Create new collection:
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </label>
      </form>
    </div>
  );
};

const SaveButton: React.FC<Props> = ({ saveLink, collectionNames }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = (name: string): void => {
    setOpen(false);
    saveLink(name);
  };

  return (
    <ExpansionPanel
      open={open}
      button={true}
      summary={
        <ExpansionPanelSummary
          handleClick={() => setOpen(true)}
          expandIcon={false}
        >
          <div>Save</div>
        </ExpansionPanelSummary>
      }
      details={
        <ExpansionPanelDetails>
          <div className="header__save-details">
            <div className="header__save-details-collections-list">
              {collectionNames.map((name, i) => (
                <div
                  className="header__save-details-collections-list-item"
                  onClick={() => handleClick(name)}
                  key={`collectionName${i}`}
                >
                  {name}
                </div>
              ))}
            </div>
            <CreateNewCollection saveLink={saveLink} collectionNames={collectionNames}/>
            <button
              className="header__save-details-cancel-btn"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </ExpansionPanelDetails>
      }
    />
  );
};

const TheHeader: React.FC<Props> = ({
  activeTab,
  saveLink,
  collectionNames,
}) => {
  return (
    <div className="header__container">
      <div className="header__current-tab">
        <div className="header__current-tab-title">{activeTab.title}</div>
        <div className="header__current-tab-url">
          {activeTab && activeTab.url}
        </div>
      </div>
      <SaveButton saveLink={saveLink} collectionNames={collectionNames} />
    </div>
  );
};

export default TheHeader;