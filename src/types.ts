export interface Link {
    title: string,
    url: string
}

export interface LinkCollection {
    name: string,
    links: Link[]
}

export type Tab = chrome.tabs.Tab;
