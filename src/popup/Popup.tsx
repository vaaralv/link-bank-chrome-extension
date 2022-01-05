import React, { useEffect, useState } from "react";
import "./Popup.scss";
import { storageGet, storageSet } from "../chrome/storageApi";
import { LinkCollection, Link, Group, Tab, SaveConfirmation } from "../types";
import TheSavingSection from "./sections/TheSavingSection";
import TheGroupsSection from "./sections/TheGroupsSection";

const Popup = () => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState<Tab | undefined>();
  const [linkCollections, setLinkCollections] = useState<LinkCollection[]>([]);
  const [tabSessions, setTabSessions] = useState<LinkCollection[]>([]);
  const [saveConfirmation, setSaveConfirmation] = useState<SaveConfirmation>({
    active: false,
    message: "",
  });

  useEffect(() => {
    chrome.tabs.query({}, function (tabs: any[]) {
      setTabs(tabs);
    });
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      setActiveTab(tabs[0]);
    });
    storageGet(["linkCollections", "tabSessions"]).then((result) => {
      setLinkCollections(result.linkCollections.map((x) => x));
      setTabSessions(result.tabSessions.map((x) => x));
    });
  }, []);

  useEffect(() => {
    storageSet("linkCollections", linkCollections);
  }, [linkCollections]);

  useEffect(() => {
    storageSet("tabSessions", tabSessions);
  }, [tabSessions]);

  const saveLink = (collectionName: string) => {
    setSaveConfirmation({ active: true, message: "Link saved!" });

    const newLink: Link = {
      title: activeTab.title,
      url: activeTab.url,
    };
    if (linkCollections) {
      if (linkCollections.length === 0) {
        setLinkCollections([{ name: collectionName, links: [newLink] }]);
      } else {
        if (
          linkCollections.find(
            (collection) => collection.name === collectionName
          )
        ) {
          setLinkCollections(
            linkCollections.map((collection) => {
              if (collection.name === collectionName)
                return {
                  name: collectionName,
                  links: collection.links.concat(newLink),
                };
              else return collection;
            })
          );
        } else {
          setLinkCollections(
            linkCollections.concat({ name: collectionName, links: [newLink] })
          );
        }
      }
    }
    setTimeout(() => setSaveConfirmation({ active: false, message: "" }), 1500);
  };

  const saveTabSession = (sessionToSaveName: string) => {
    setSaveConfirmation({ active: true, message: "Tab Session saved!" });
    setTabSessions(
      tabSessions.concat({
        name: sessionToSaveName,
        links: tabs.map((tab) => ({ title: tab.title, url: tab.url })),
      })
    );
    setTimeout(() => setSaveConfirmation({ active: false, message: "" }), 1500);
  };

  const removeLink = (
    group: Group,
    groupName: string,
    linkToDeleteUrl: string
  ) => {
    const updatedGroups = (
      group === "linkCollections" ? linkCollections : tabSessions
    ).map((collection) => {
      if (collection.name === groupName)
        return {
          name: groupName,
          links: collection.links.filter(
            (link) => link.url !== linkToDeleteUrl
          ),
        };
      else return collection;
    });

    group === "linkCollections"
      ? setLinkCollections(updatedGroups)
      : setTabSessions(updatedGroups);
  };

  const removeGroup = (group: Group, groupToRemoveName: string) => {
    const updatedGroups = (
      group === "linkCollections" ? linkCollections : tabSessions
    ).filter((group) => group.name !== groupToRemoveName);

    group === "linkCollections"
      ? setLinkCollections(updatedGroups)
      : setTabSessions(updatedGroups);
  };

  const closeTab = (tabIdToDelete: number) => {
    chrome.tabs.remove(tabIdToDelete, function () {
      setTabs(tabs.filter((tab) => tab.id !== tabIdToDelete));
    });
  };

  return (
    <div className="popup__container">
      {saveConfirmation.active && (
        <div className="popup__saving-confirmation">
          {saveConfirmation.message}
        </div>
      )}
      <h1>Link Bank</h1>
      {activeTab && tabs.length > 0 && (
        <TheSavingSection
          activeTab={activeTab}
          tabs={tabs}
          saveLink={saveLink}
          saveTabSession={saveTabSession}
          collectionNames={
            linkCollections.length > 0
              ? linkCollections.map((collection) => collection.name)
              : []
          }
          sessionNames={
            tabSessions.length > 0
              ? tabSessions.map((session) => session.name)
              : []
          }
          closeTab={closeTab}
        />
      )}
      {linkCollections ? (
        <TheGroupsSection
          tabSessions={tabSessions}
          activeTab={activeTab}
          linkCollections={linkCollections}
          removeLink={removeLink}
          removeGroup={removeGroup}
        />
      ) : null}
    </div>
  );
};

export default Popup;
