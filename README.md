## Password memorization using chunking

[**Chunking**](https://en.wikipedia.org/wiki/Chunking_(psychology)) in psychology is a process by which individual pieces of information are bound together into a meaningful whole.    

A chunk is a collection of elementary units that have been inter-associated and can be retrieved from memory as a group.
It is believed that individuals create higher order cognitive representations of the elementary units that are more easily remembered as a group than as individual units themselves.  

As an example: While recalling a phone number such as **9849523450**, we might break this into **98 495 234 50**. Thus, instead of remembering 10 separate digits that is beyond the "seven plus-or-minus two" memory span, we are remembering four groups of numbers.

## How to run

* `git clone git@version.aalto.fi:usability-stylometry/password-memorization.git`
* `cd password-memorization`
* `npm install`
* `npm start`
* The app should now be running at localhost:3000

Project configuration was bootstrapped using [Create React App](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## The chunking algorithm 

We split the word into atomic chunks of some size and make a binary tree structure out of them.
Chunks are then shown in the order of a post-order traversal.

![chunking algorithm](/img/chunking_algorithm.png)