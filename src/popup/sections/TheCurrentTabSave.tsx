import React, { useState } from "react";
import { Link } from "../../types";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "../components/ExpansionPanel";
import "./styles/TheSavingSection.scss";
import CreateNewGroup from "../components/CreateNewGroup";

interface Props {
  activeTab?: Link;
  saveLink: (collectionName: string) => void;
  collectionNames: string[];
}

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
          <div className="current-tab-save__save-details">
            <div className="current-tab-save__save-details-collections-list">
              {collectionNames.map((name, i) => (
                <div
                  className="current-tab-save__save-details-collections-list-item"
                  onClick={() => handleClick(name)}
                  key={`collectionName${i}`}
                >
                  {name}
                </div>
              ))}
            </div>
            <CreateNewGroup
              setOpen={setOpen}
              group="linkCollections"
              save={saveLink}
              groupNames={collectionNames}
            />
            <button className="button cancel" onClick={() => setOpen(false)}>
              Cancel
            </button>
          </div>
        </ExpansionPanelDetails>
      }
    />
  );
};

const TheCurrentTabSave: React.FC<Props> = ({
  activeTab,
  saveLink,
  collectionNames,
}) => {
  return (
    <div className="current-tab-save__container">
      <h2>Save your current tab to a collection</h2>
      <div className="current-tab-save__current-tab-and-button">
        <div className="current-tab-save__current-tab">
          <div className="current-tab-save__current-tab-title">
            {activeTab.title}
          </div>
          <div className="current-tab-save__current-tab-url">
            {activeTab && activeTab.url}
          </div>
        </div>
        <SaveButton saveLink={saveLink} collectionNames={collectionNames} />
      </div>
    </div>
  );
};

export default TheCurrentTabSave;
