# WireMock UI

[![wiremock ui license](https://img.shields.io/github/license/plouc/wiremock-ui.svg?longCache=true&style=for-the-badge)](https://github.com/plouc/wiremock-ui/blob/master/LICENSE)
[![wiremock ui issues](https://img.shields.io/github/issues/plouc/wiremock-ui.svg?longCache=true&style=for-the-badge)](https://github.com/plouc/wiremock-ui/issues)
[![wiremock ui build status](https://img.shields.io/travis/plouc/wiremock-ui.svg?longCache=true&style=for-the-badge)](https://travis-ci.org/plouc/wiremock-ui)

An unofficial UI for [WireMock](http://wiremock.org/).

[Features](#features) | [Project structure](#project-structure) | [How to start the UI](#start-ui)

![UI screenshot](https://raw.githubusercontent.com/plouc/wiremock-ui/master/screenshots/ui_solarized_dark.png)

## Features

- supports multi wiremock servers
- create/edit/delete wiremock stubs
- json or visual mode
- theming
- support multiple panes

![UI screenshot](https://raw.githubusercontent.com/plouc/wiremock-ui/master/screenshots/ui_white.png)

## Project structure

The project was bootstrapped using [create-react-app](https://github.com/facebook/create-react-app)
using custom scripts [react-scripts-ts](https://github.com/wmonk/create-react-app-typescript)
for typescript support.

## How to start the UI

1. Use a shell and enter the wiremock-ui directory.
2. Type: yarn install
3. Type: yarn start

4. The first thing you do is: Add a server (use the adress of a running WireMock Server)

## Example default server configurations

File can be placed at `src/config/defaultServers.json`

```
{
	"servers" : [
		{
			"name" : "test server",
			"url" : "http://test-server-wired.app.com",
			"port" : null
		}
  ]
}
```
