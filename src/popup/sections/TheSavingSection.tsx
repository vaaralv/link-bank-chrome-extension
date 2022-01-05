import React, { useState } from "react";
import TheCurrentTabSave from "../components/TheCurrentTabSave";
import TheTabSessionSave from "../components/TheTabSessionSave";
import { Link, Tab } from "../../types";

interface Props {
  activeTab: Tab;
  tabs: Tab[];
  saveLink: (collectionName: string) => void;
  saveTabSession: (sessionName: string) => void;
  sessionNames: string[];
  collectionNames: string[];
  closeTab: (tabToCloseId) => void;
}

const TheSavingSection: React.FC<Props> = ({
  activeTab,
  tabs,
  saveLink,
  saveTabSession,
  collectionNames,
  sessionNames,
  closeTab,
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
        closeTab={closeTab}
      />
    </div>
  );
};

export default TheSavingSection;
