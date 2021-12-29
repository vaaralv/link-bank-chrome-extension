export interface Link {
    title: string,
    url: string
}

export interface LinkCollection {
    name: string,
    links: Link[]
}

export interface ErrorMessage {
    active: boolean,
    type: string,
    message: string
}

export type Tab = chrome.tabs.Tab;
