export interface Link {
    title: string,
    url: string
}

export type Tab = chrome.tabs.Tab

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

export interface SaveConfirmation {
    active: boolean,
    message: string
}