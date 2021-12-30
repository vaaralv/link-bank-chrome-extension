import React, { useEffect, useState } from "react";
import "./Popup.scss";
import { storageGet, storageSet } from "../chrome/storageApi";
import { LinkCollection, Link, Group } from "../types";
import TheLinkCollections from "./sections/TheLinkCollections";
import TheTabSessions from "./sections/TheTabSessions";
import TheSavingSection from "./sections/TheSavingSection";

const Popup = () => {
  const [tabs, setTabs] = useState<Link[]>([]);
  const [activeTab, setActiveTab] = useState<Link | undefined>();
  const [linkCollections, setLinkCollections] = useState<LinkCollection[]>([]);
  const [tabSessions, setTabSessions] = useState<LinkCollection[]>([]);

  useEffect(() => {
    chrome.tabs.query({}, function (tabs: any[]) {
      const links: Link[] = tabs.map((tab) => ({
        title: tab.title,
        url: tab.url,
      }));
      setTabs(links);
    });
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      setActiveTab({ title: tabs[0].title, url: tabs[0].url });
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
  };

  const saveTabSession = (sessionName: string) => {
    setTabSessions(tabSessions.concat({ name: sessionName, links: tabs }));
  };

  const removeLink = (
    group: Group,
    collectionName: string,
    linkUrl: string
  ) => {
    const updatedGroups = (
      group === "linkCollections" ? linkCollections : tabSessions
    ).map((collection) => {
      if (collection.name === collectionName)
        return {
          name: collectionName,
          links: collection.links.filter((link) => link.url !== linkUrl),
        };
      else return collection;
    });

    group === "linkCollections"
      ? setLinkCollections(updatedGroups)
      : setTabSessions(updatedGroups);
  };

  const removeGroup = (group: Group, collectionName: string) => {
    const updatedGroups = (
      group === "linkCollections" ? linkCollections : tabSessions
    ).filter((collection) => collection.name !== collectionName);

    group === "linkCollections"
      ? setLinkCollections(updatedGroups)
      : setTabSessions(updatedGroups);
  };

  return (
    <div className="popup-container">
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
        />
      )}
      {linkCollections ? (
        <div className="popup__collections-and-sessions">
          <TheLinkCollections
            linkCollections={linkCollections}
            removeLink={removeLink}
            removeCollection={removeGroup}
          />
          <TheTabSessions
            tabSessions={tabSessions}
            removeLink={removeLink}
            removeSession={removeGroup}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Popup;
