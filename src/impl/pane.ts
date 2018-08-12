import {
    PaneManager as BasePaneManager,
    IPaneContent as BasePaneContent,
    Pane as BasePane,
} from 'edikit'

export interface IWithData {
    server: string
    mappingIndex?: number
}

export interface IPaneContent extends BasePaneContent<IWithData> {}

export class PaneManager extends BasePaneManager<IWithData> {}

export class Pane extends BasePane<IWithData> {}