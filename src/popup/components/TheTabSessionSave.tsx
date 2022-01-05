import React, { useState } from "react";
import { Tab } from "../../types";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "./common/ExpansionPanel";
import CreateNewGroup from "./common/CreateNewGroup";
import { activateTab } from "../../chrome/tabApi";
import { MdOutlineClear } from "react-icons/md";
import "../sections/styles/TheSavingSection.scss";

interface Props {
  tabs?: Tab[];
  saveTabSession: (sessionName: string) => void;
  sessionNames: string[];
  closeTab?: (tabToCloseID: number) => void;
}

const SaveButton: React.FC<Props> = ({ saveTabSession, sessionNames }) => {
  const [open, setOpen] = useState<boolean>(false);

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
          <div className="tab-session-save__save-details">
            <CreateNewGroup
              setOpen={setOpen}
              group="tabSessions"
              save={saveTabSession}
              groupNames={sessionNames}
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

const TheTabSessionSave: React.FC<Props> = ({
  tabs,
  saveTabSession,
  sessionNames,
  closeTab,
}) => {
  return (
    <div className="tab-session-save__container">
      <h2>Save your all your current tabs as a session</h2>
      <div className="tab-session-save__links-and-button">
        <div className="tab-session-save__links-wrapper">
          <div className="tab-session-save__links">
            {tabs.map((tab, i) => (
              <div className="link-group__link" key={`tab-session-save${i}`}>
                <div
                  className="link-group__link-title-and-url"
                  onClick={() =>
                    activateTab({ windowId: tab.windowId, tabId: tab.id })
                  }
                >
                  <span className="link-title">{tab.title}</span>
                  <span className="link-url">{tab.url}</span>
                </div>
                <div
                  onClick={() => closeTab(tab.id)}
                  className="link-group__link-remove-icon"
                >
                  <MdOutlineClear />
                </div>
              </div>
            ))}
          </div>
        </div>
        <SaveButton
          saveTabSession={saveTabSession}
          sessionNames={sessionNames}
        />
      </div>
    </div>
  );
};

export default TheTabSessionSave;
