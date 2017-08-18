## Password memorization using chunking

<img src="/img/UI_example.png" width="70%">

[**Chunking**](https://en.wikipedia.org/wiki/Chunking_(psychology)) in psychology is a process by which individual pieces of information are bound together into a meaningful whole.    

A chunk is a collection of elementary units that have been inter-associated and can be retrieved from memory as a group.
It is believed that individuals create higher order cognitive representations of the elementary units that are more easily remembered as a group than as individual units themselves.  

As an example: While recalling a phone number such as **9849523450**, we might break this into **98 495 234 50**. Thus, instead of remembering 10 separate digits that is beyond the "seven plus-or-minus two" memory span, we are remembering four groups of numbers.

## How to run

* `git clone git@version.aalto.fi:usability-stylometry/password-memorization.git`
* `cd password-memorization`
* `npm install`
* `npm start`
* The app should now be running at [localhost:3000](http://localhost:3000/)

Project configuration was bootstrapped using [Create React App](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## The chunking algorithm 

We recursively split the word into atomic chunks of some size and make a binary tree structure out of them.
Chunks are then shown in the order of a post-order traversal.

<img src="/img/chunking_example.png" width="70%">

## Overview of components

<img src="/img/component_hierarchy.png" width="60%">

#### ChunkApp
Top level component that renders either TreeView or SettingsView depending on if settings button is toggled or not.   
Handles getting/setting localStorage values for settings and word being memorised.

|       **State**         |         **Props**       |
| ----------------------- | ----------------------- |
| settings: object        |                         |
| hideSettings: boolean   |                         |


### SettingsView
Handles changing settings.

|          **State**            |           **Props**           |
| ----------------------------- | ----------------------------- |
| settings: object              | currentSettings: object       |
|                               | updateSettings: function      |

#### TreeView
Renders the chunktree and input field.    
Uses ChunkModule to construct a tree structure from the word it gets as a prop.    
Coordinates for the nodes and links are calculated using [d3-hierarchy](https://github.com/d3/d3-hierarchy).     
Uses Logging module to send data from each guess to a server for analysis. 

|        **State**      |        **Props**      |
| --------------------- | --------------------- |
| currentNode: object   | width: number         |
| input: string         | height: number        |
|                       | word: string          |
|                       | chunkSize: number     |

#### Node
Represents the circular nodes of the tree. Colored based on their status.

| **State** |      **Props**   |
| --------- | ---------------- |
|           | text: string     |
|           | x: number        |
|           | y: number        |
|           | radius: number   |
|           | isActive: bool   |
|           | isCompleted: bool|
|           | isLeaf: bool     |
|           | isSeen: bool     |

#### Link

Represents the curved links connecting the nodes of the tree.

| **State** |  **Props** |
| --------- | ---------- |
|           | x1: number |
|           | y1: number |
|           | x2: number |
|           | y2: number |
