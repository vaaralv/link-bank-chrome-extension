import React, { useState } from "react";
import TheCurrentTabSave from "./TheCurrentTabSave";
import TheTabSessionSave from "./TheTabSessionSave";
import { Link } from "../../types";

interface Props {
  activeTab: Link;
  tabs: Link[];
  saveLink: (collectionName: string) => void;
  saveTabSession: (sessionName: string) => void;
  sessionNames: string[];
  collectionNames: string[];
}

const TheSavingSection: React.FC<Props> = ({
  activeTab,
  tabs,
  saveLink,
  saveTabSession,
  collectionNames,
  sessionNames,
}) => {
  return (
    <div className="the-saving-section__container">
      <TheCurrentTabSave
        activeTab={activeTab}
        saveLink={saveLink}
        collectionNames={collectionNames}
      />
      <TheTabSessionSave
        tabs={tabs}
        saveTabSession={saveTabSession}
        sessionNames={sessionNames}
      />
    </div>
  );
};

export default TheSavingSection;
