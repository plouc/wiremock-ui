import {
    IPane,
    IPaneContent,
    PaneSplitAxis,
} from './types'
import {
    setCurrentPane,
    addContentToCurrentPane,
    setPaneCurrentContent,
    removePaneContent,
    splitPane,
} from './operations'

interface IPanesContents {
    [paneId: string]: string[]
}

const getPaneFixtures = (
    seeds: string[],
    contentsSeeds: IPanesContents = {}
): Array<IPane<any>> => seeds.map(id => {
    let contents: Array<IPaneContent<any>> = []
    if (contentsSeeds[id] !== undefined) {
        contents = contentsSeeds[id].map(contentId => ({
            id: contentId,
            type: 'test',
            isUnique: false,
            isCurrent: false,
        }))
    }

    return {
        id,
        isCurrent: false,
        split: false,
        splitAxis: PaneSplitAxis.Horizontal,
        contents,
        children: [],
    }
})

describe('setCurrentPane', () => {
    it('should set pane matching provided paneId current pane', () => {
        const panes = getPaneFixtures(['a', 'b', 'c'])

        const res = setCurrentPane(panes, 'a')
        expect(res).not.toBe(panes)
        expect(res[0].isCurrent).toBeTruthy()
        expect(res[1].isCurrent).toBeFalsy()
        expect(res[2].isCurrent).toBeFalsy()
    })
    
    it('should leave panes untouched if pane is already the current one', () => {
        const panes = getPaneFixtures(['a', 'b', 'c'])
        panes[0].isCurrent = true

        const res = setCurrentPane(panes, 'a')
        expect(res).toBe(panes)
    })

    it('should leave panes already in desired state untouched', () => {
        const panes = getPaneFixtures(['a', 'b', 'c'])

        const res = setCurrentPane(panes, 'a')
        expect(res).not.toBe(panes)
        expect(res[0].isCurrent).toBeTruthy()
        expect(res[1]).toBe(panes[1])
        expect(res[2]).toBe(panes[2])
    })

    it('should throw if panes is empty', () => {
        expect(() => {
            setCurrentPane([], 'invalid')
        }).toThrow(`there's no available pane`)
    })

    it('should throw if paneId does not exist', () => {
        expect(() => {
            setCurrentPane(getPaneFixtures(['a']), 'invalid')
        }).toThrow('no pane found for id: invalid, available panes: a')
    })
})

describe('addContentToCurrentPane', () => {
    it(`should append provided content to current pane`, () => {
        const panes = getPaneFixtures(['a'])
        panes[0].isCurrent = true

        const content = {
            id: 'test',
            type: 'test',
            isCurrent: true,
            isUnique: false,
        }
        const res = addContentToCurrentPane(panes, content)
        expect(res[0].contents).toHaveLength(1)
        expect(res[0].contents[0]).toEqual(content)
    })

    it(`should throw if there's no current pane`, () => {
        expect(() => {
            addContentToCurrentPane(getPaneFixtures(['a']), {
                id: 'test',
                type: 'test',
                isCurrent: false,
                isUnique: false,
            })
        }).toThrow('unable to find a current pane')
    })
})

describe('setPaneCurrentContent', () => {
    it('should set pane matching provided paneId current pane, and content matching provided contentId current content', () => {
        const panes = getPaneFixtures(['a', 'b'], {
            a: ['a.0', 'a.1'],
            b: ['b.0', 'b.1'],
        })
        panes[0].contents[0].isCurrent = true
        panes[1].isCurrent = true

        const res = setPaneCurrentContent(panes, 'a', 'a.1')
        expect(res).not.toBe(panes)
        expect(res[0].isCurrent).toBeTruthy()
        expect(res[0].contents[0].isCurrent).toBeFalsy()
        expect(res[0].contents[1].isCurrent).toBeTruthy()
        expect(res[1].isCurrent).toBeFalsy()
        expect(res[1].contents[0].isCurrent).toBeFalsy()
        expect(res[1].contents[1].isCurrent).toBeFalsy()
    })

    it('should leave panes and contents untouched if already in desired state', () => {
        const panes = getPaneFixtures(['a', 'b'], {
            a: ['a.0', 'a.1'],
            b: ['b.0', 'b.1'],
        })
        panes[0].isCurrent = true
        panes[0].contents[0].isCurrent = true

        const res = setPaneCurrentContent(panes, 'a', 'a.0')
        expect(res).toBe(panes)
    })

    it('should leave panes and contents already in desired state untouched', () => {
        const panes = getPaneFixtures(['a', 'b'], {
            a: ['a.0', 'a.1'],
            b: ['b.0', 'b.1'],
        })

        const res = setPaneCurrentContent(panes, 'a', 'a.0')
        expect(res).not.toBe(panes)
        expect(res[0]).not.toBe(panes[0])
        expect(res[0].isCurrent).toBeTruthy()
        expect(res[0].contents[0].isCurrent).toBeTruthy()
        expect(res[0].contents[1]).toBe(panes[0].contents[1])
        expect(res[1]).toBe(panes[1])
        expect(res[1].contents[0]).toBe(panes[1].contents[0])
        expect(res[1].contents[1]).toBe(panes[1].contents[1])
    })

    it('should throw if panes is empty', () => {
        expect(() => {
            setPaneCurrentContent([], 'invalid', 'contentId')
        }).toThrow(`there's no available pane`)
    })

    it('should throw if paneId does not exist', () => {
        expect(() => {
            setPaneCurrentContent(getPaneFixtures(['a']), 'invalid', 'contentId')
        }).toThrow('no pane found for id: invalid, available panes: a')
    })

    it('should throw if pane does not have any content', () => {
        expect(() => {
            setPaneCurrentContent(getPaneFixtures(['a']), 'a', 'invalid')
        }).toThrow(`pane a doesn't have any content`)
    })

    it('should throw if contentId does not exist', () => {
        expect(() => {
            setPaneCurrentContent(getPaneFixtures(['a'], { a: ['a.0'] }), 'a', 'invalid')
        }).toThrow('no content found in pane: a for id: invalid, available contents: a.0')
    })
})

describe('removePaneContent', () => {
    it('should remove content matching contentId from pane matching paneId', () => {
        const panes = getPaneFixtures(['a'], { a: ['a.0', 'a.1'] })
        panes[0].contents[0].isCurrent = true

        const res = removePaneContent(panes, 'a', 'a.1')
        expect(res).not.toBe(panes)
        expect(res[0].contents).toHaveLength(1)
        expect(res[0].contents[0]).toBe(panes[0].contents[0])
        expect(res[0].contents[0]).toEqual(panes[0].contents[0])
    })

    it(`should set latest remaining content as current if there's none`, () => {
        const panes = getPaneFixtures(['a'], { a: ['a.0', 'a.1'] })

        const res = removePaneContent(panes, 'a', 'a.0')
        expect(res).not.toBe(panes)
        expect(res[0].contents).toHaveLength(1)
        expect(res[0].contents[0]).not.toBe(panes[0].contents[0])
        expect(res[0].contents[0].isCurrent).toBeTruthy()
    })

    it(`should replace parent pane with sibling pane if there's no remaining content and pane isn't root`, () => {
        const panes = getPaneFixtures(['a', 'a__0', 'a__1'], {
            a__0: ['a__0.0'],
            a__1: ['a__1.0'],
        })
        panes[0].split = true
        panes[0].children = ['a__0', 'a__1']
        panes[1].childOf = 'a'
        panes[2].childOf = 'a'

        const res = removePaneContent(panes, 'a__0', 'a__0.0')
        global.console.warn(res)
    })

    it('should throw if panes is empty', () => {
        expect(() => {
            removePaneContent([], 'invalid', 'contentId')
        }).toThrow(`there's no available pane`)
    })

    it('should throw if paneId does not exist', () => {
        expect(() => {
            removePaneContent(getPaneFixtures(['a']), 'invalid', 'contentId')
        }).toThrow('no pane found for id: invalid, available panes: a')
    })

    it('should throw if pane does not have any content', () => {
        expect(() => {
            removePaneContent(getPaneFixtures(['a']), 'a', 'invalid')
        }).toThrow(`pane a doesn't have any content`)
    })

    it('should throw if contentId does not exist', () => {
        expect(() => {
            removePaneContent(getPaneFixtures(['a'], { a: ['a.0'] }), 'a', 'invalid')
        }).toThrow('no content found in pane: a for id: invalid, available contents: a.0')
    })
})

describe('splitPane', () => {
    it('should split pane matching provided paneId into two sub panes using given axis', () => {
        const panes = getPaneFixtures(['a'], { a: ['a.0'] })
        panes[0].contents[0].isCurrent = true

        const res = splitPane(panes, 'a', PaneSplitAxis.Horizontal)
        expect(res).not.toBe(panes)
        expect(res).toHaveLength(3)

        expect(res[0].isCurrent).toBeFalsy()
        expect(res[0].contents).toHaveLength(1)
        expect(res[0].contents[0]).toEqual(panes[0].contents[0])

        expect(res[1].isCurrent).toBeTruthy()
        expect(res[1].contents).toHaveLength(1)
        expect(res[1].contents[0]).toEqual(panes[0].contents[0])

        expect(res[2].isCurrent).toBeFalsy()
        expect(res[2].contents).toHaveLength(0)
        expect(res[2].children).toHaveLength(2)
        expect(res[2].children).toEqual([
            res[0].id,
            res[1].id,
        ])
    })

    it('should do nothing if target pane does not have a current content', () => {
        const panes = getPaneFixtures(['a'], { a: ['a.0'] })

        const res = splitPane(panes, 'a', PaneSplitAxis.Horizontal)
        expect(res).toBe(panes)
        expect(res).toEqual(panes)
    })

    it('should throw if panes is empty', () => {
        expect(() => {
            splitPane([], 'invalid', PaneSplitAxis.Horizontal)
        }).toThrow(`there's no available pane`)
    })

    it('should throw if paneId does not exist', () => {
        expect(() => {
            splitPane(getPaneFixtures(['a']), 'invalid', PaneSplitAxis.Horizontal)
        }).toThrow('no pane found for id: invalid, available panes: a')
    })
})