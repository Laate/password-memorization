import React from 'react'
import PropTypes from 'prop-types'
import './App.css'
import Node from './Node'
import Link from './Link'
import { tree, hierarchy } from 'd3-hierarchy';
import { chunkTree } from '../modules/ChunkModule';
import { sendGuess } from '../modules/Logging';



const treeViewProps = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    word: PropTypes.string.isRequired,
    chunkSize: PropTypes.number.isRequired
};

export default class TreeView extends React.Component {
    constructor(props) {
        super(props);

        const savedState = JSON.parse(localStorage.getItem("treeState"));
        const isSaved =
            savedState !== null &&
            savedState.word === this.props.word &&
            savedState.chunkSize === this.props.chunkSize;
        const data = isSaved ? savedState.data : chunkTree(this.props.word, this.props.chunkSize);
        this.root =  tree().size([this.props.width, this.props.height])(hierarchy(data, this.getChildren));
        this.nodeList = this.root.descendants();
        this.linkList = this.root.links();
        const startNode = this.initNodes(isSaved);

        this.state = {
            currentNode: startNode,
            input: ""
        };
    }

    componentDidMount() {
        window.addEventListener("beforeunload", this.saveTreeState);
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.saveTreeState);
        this.saveTreeState();
    }

    saveTreeState = () => {
        localStorage.setItem("treeState", JSON.stringify({
            data: this.root.data,
            word: this.props.word,
            chunkSize: this.props.chunkSize
        }))
    };

    /*
     * If we are restoring an old tree state, we want to make sure that the users still remember everything
     * they typed so far. To achieve this, we reset the tree to the biggest completed or active node,
     * that is on the leftmost side of the tree.
     * If we are doing first time initialisation we:
     *  - add a small top margin to nodes, otherwise top node will be cut off
     *  - set isSeen to keep track if we need to show the hint text
     *  - set isCompleted for coloring and knowing which node to move to
     *  - set id as the node's position in a post-order traversal, used for data logging purposes
     */
    initNodes = (isSaved) => {
        let startNode = this.root.leaves()[0];

        if (isSaved) {
            while (startNode.parent) {
                const parent = startNode.parent;
                if (parent.data.isCompleted || (
                    parent.data.left[0].isCompleted &&
                    parent.data.right[0].isCompleted)) {
                    startNode = parent
                } else {
                    break
                }
            }
            this.root.eachAfter((node) => {
                node.y += 30;
                if (node.data.id >= startNode.data.id) node.data.isCompleted = false;
            })
        } else {
            let i = 0;
            this.root.eachAfter((node) => {
                node.y += 30;
                node.data.isSeen = false;
                node.data.isCompleted = false;
                node.data.id = i++;
            });
        }

        return startNode
    };

    getChildren = (node) => {
        const res = [];
        if (node.left) res.push(...node.left);
        if (node.right) res.push(...node.right);
        return res;
    };

    getNext = (node) => {
        if (!node.parent) return this.root;

        let foundNext = false;
        let next = null;
        node.parent.eachAfter((n) => {
            if (!n.data.isCompleted && !foundNext) {
                foundNext = true;
                next = n;
            }
        });
        return next
    };

    handleChange = (event) => {
        event.persist();
        const newInput = event.target.value;
        this.setState({input: newInput}, () => {
            if (newInput.length === this.state.currentNode.data.text.length) {
                this.handleSubmit(event)
            }
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const currNode = this.state.currentNode;
        const rightNode = currNode.descendants()[2];
        const leftNode = currNode.descendants()[1];
        const input = this.state.input;
        const logData = {
            nodeID: currNode.data.id,
            input,
            nodeText: currNode.data.text,
            fullText: this.root.data.text,
            isLeftCorrect: false,
            isRightCorrect: false
        };

        if (input === currNode.data.text) {
            currNode.data.isCompleted = true;
            currNode.data.isSeen = true;
            logData.isLeftCorrect = true;
            logData.isRightCorrect = true;
            this.setState({currentNode: this.getNext(currNode)});
        } else if (!(leftNode && rightNode)) {
            currNode.data.isSeen = false
        } else if (input.startsWith(leftNode.data.text)) {
            rightNode.data.isCompleted = false;
            logData.isLeftCorrect = true;
            this.setState({currentNode: rightNode})
        } else if (input.endsWith(rightNode.data.text)) {
            leftNode.data.isCompleted = false;
            logData.isRightCorrect = true;
            this.setState({currentNode: leftNode});
        } else {
            rightNode.data.isCompleted = false;
            leftNode.data.isCompleted = false;
            this.setState({currentNode: leftNode})
        }
        sendGuess(logData);
        this.setState({input: ""});
        if (input === currNode.data.text && !currNode.parent) {
            this.done();
        }
    };

    // Doesn't reset isSeen, meaning hint texts won't be shown again.
    restart = () => {
        const nodes = this.root.descendants();
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].data.isCompleted = false;
        }
        this.setState({currentNode: this.root.leaves()[0]})
    };

    done = () => {
        const memCount =  parseInt(localStorage.getItem("memorisedCount"), 10) || 0;
        localStorage.setItem("memorisedCount", memCount + 1);
        alert("Memorization completed!");
        this.restart();
    };

    render() {
        const nodes = this.nodeList.map(node => {
            return <Node key={`${node.x}, ${node.y}`}
                         radius={18}
                         x={node.x}
                         y={node.y}
                         isActive={this.state.currentNode === node}
                         isCompleted={node.data.isCompleted}
                         isLeaf={node.descendants().length === 1}
                         isSeen={node.data.isSeen}
                         text={node.data.text}/>
        });

        const links = this.linkList.map(link => {
            const key = `${link.source.x}, ${link.source.y}, ${link.target.x}, ${link.target.y}`;
            return <Link key={key}
                         x1={link.source.x}
                         y1={link.source.y}
                         x2={link.target.x}
                         y2={link.target.y}/>
        });

        return (
            <div className="tree-container">
                <svg height={this.props.height + 100} width={this.props.width}>
                    <g>
                        {links}
                        {nodes}
                    </g>
                </svg>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text"
                               className="input"
                               value={this.state.input}
                               onChange={this.handleChange}
                               autoFocus/>
                    </label>
                    <div className="subtleText">What is the current chunk?</div>
                </form>
            </div>
        );
    }
}

TreeView.propTypes = treeViewProps;
