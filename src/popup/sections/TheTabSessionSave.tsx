import React, { useState } from "react";
import { Link } from "../../types";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "../components/ExpansionPanel";
import CreateNewGroup from "../components/CreateNewGroup";
import "./styles/TheSavingSection.scss";

interface Props {
  tabs?: Link[];
  saveTabSession: (sessionName: string) => void;
  sessionNames: string[];
}

const SaveButton: React.FC<Props> = ({ saveTabSession, sessionNames }) => {
  const [open, setOpen] = useState<boolean>(false);

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
          <div className="tab-session-save__save-details">
            <CreateNewGroup
              setOpen={setOpen}
              group="tabSessions"
              save={saveTabSession}
              groupNames={sessionNames}
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

const TheTabSessionSave: React.FC<Props> = ({
  tabs,
  saveTabSession,
  sessionNames,
}) => {
  return (
    <div className="tab-session-save__container">
      <h2>Save your all your current tabs as a session</h2>
      <div className="tab-session-save__links-and-button">
        <div className="tab-session-save__links">
          {tabs.map((tab, i) => (
            <div
              key={`tab-session-save${i}`}
              className="link-group__link-title-and-url"
            >
              <span className="link-title">{tab.title}</span>
              <span className="link-url">{tab.url}</span>
            </div>
          ))}
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
