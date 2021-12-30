export interface Link {
    title: string,
    url: string
}

export interface LinkCollection {
    name: string,
    links: Link[]
}

export interface InputMessage {
    active: boolean,
    error: boolean,
    message: string
}

export type Group = 'linkCollections' | 'tabSessions'

export type Tab = chrome.tabs.Tab;
