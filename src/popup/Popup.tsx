import React, { useEffect, useState } from "react";
import "./Popup.scss";
import { storageGet, storageSet } from "../chrome/storageApi";
import { LinkCollection, Link, Tab } from "../types";
import TheLinkCollections from "./sections/TheLinkCollections";
import TheHeader from "./sections/TheHeader";
import { MdExpandMore } from "react-icons/md";

const Popup = () => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState<Link | undefined>();
  const [linkCollections, setLinkCollections] = useState<LinkCollection[]>([]);

  useEffect(() => {
    chrome.tabs.query({}, function (tabs: any[]) {
      setTabs(tabs);
    });
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      setActiveTab({ title: tabs[0].title, url: tabs[0].url });
    });
    storageGet(["linkCollections"]).then((result) => {
      console.log("result", result);
      setLinkCollections(result.linkCollections.map((x) => x));
    });
  }, []);

  useEffect(() => {
    storageSet("linkCollections", linkCollections);
  }, [linkCollections]);

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
                }
                else return collection
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

  const removeLink = (collectionName: string, linkUrl: string) => {
    const newLinkCollection = linkCollections.map(collection => {
      if (collection.name === collectionName) return {name: collectionName, links: collection.links.filter(link => link.url !== linkUrl)}
      else return collection
    })

    setLinkCollections(newLinkCollection)
  }

  return (
    <div className="popup-container">
      {console.log("links", linkCollections)}
      {activeTab && (
        <TheHeader
          activeTab={activeTab}
          saveLink={saveLink}
          collectionNames={
            linkCollections.length > 0
              ? linkCollections.map((collection) => collection.name)
              : []
          }
        />
      )}
      {linkCollections ? (
        <TheLinkCollections linkCollections={linkCollections} removeLink={removeLink}/>
      ) : null}
    </div>
  );
};

export default Popup;
