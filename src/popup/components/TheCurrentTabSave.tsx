import React, { useState } from "react";
import { Tab } from "../../types";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "./common/ExpansionPanel";
import CreateNewGroup from "./common/CreateNewGroup";
import "../sections/styles/TheSavingSection.scss";

interface Props {
  activeTab?: Tab;
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
          open={open}
          handleClick={() => setOpen(true)}
          expandIcon={false}
        >
          <div>Save</div>
        </ExpansionPanelSummary>
      }
      details={
        <ExpansionPanelDetails>
          <div className="current-tab-save__save-details">
            <span className="current-tab-save__header">Collections</span>
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
            <div className="btn cancel" onClick={() => setOpen(false)}>
              Cancel
            </div>
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
          <div className="link-title">{activeTab.title}</div>
          <div className="link-url">{activeTab && activeTab.url}</div>
        </div>
        <SaveButton saveLink={saveLink} collectionNames={collectionNames} />
      </div>
    </div>
  );
};

export default TheCurrentTabSave;
