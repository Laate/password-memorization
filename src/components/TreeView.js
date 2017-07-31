import React from 'react'
import './App.css'
import Node from './Node'
import Link from './Link'
import { tree, hierarchy } from 'd3-hierarchy';
import { send } from '../modules/Logging';


export default class TreeView extends React.Component {
    constructor(props) {
        super(props);

        this.root =  tree().size([this.props.width, this.props.height])(hierarchy(this.props.data, this.getChildren));
        this.nodeList = this.root.descendants();
        this.linkList = this.root.links();
        this.nodeList.forEach(node => {
            node.y += 30
        });
        this.setNodeIDs();

        this.state = {
            currentNode: this.root.leaves()[0],
            input: ""
        };
    }

    // Node's ID is its position in a post-order traversal
    setNodeIDs = () => {
        let i = 0;
        this.root.eachAfter((node) => {
            node.data.id = i++
        })
    };

    getChildren = (node) => {
        const res = [];
        if (node.left) res.push(...node.left);
        if (node.right) res.push(...node.right);
        return res;
    };

    getNext = (node) => {
        if (!node.parent) {return this.root}

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
            text: currNode.data.text,
            input,
            nodeID: currNode.data.id,
            fullWord: this.root.data.text,
            isCorrect: false
        };

        if (input === currNode.data.text) {
            currNode.data.isCompleted = true;
            currNode.data.isSeen = true;
            logData.isCorrect  = true;
            this.setState({currentNode: this.getNext(currNode)});
            currNode.parent || this.done();
        } else if (!(leftNode && rightNode)) {
            currNode.data.isSeen = false
        } else if (input.indexOf(leftNode.data.text) === 0) {
            rightNode.data.isCompleted = false;
            this.setState({currentNode: rightNode})
        } else if (input.lastIndexOf(rightNode.data.text) === input.length - rightNode.data.text) {
            leftNode.data.isCompleted = false;
            this.setState({currentNode: leftNode});
        } else {
            rightNode.data.isCompleted = false;
            leftNode.data.isCompleted = false;
            this.setState({currentNode: leftNode})
        }
        send("guess", logData);
        this.setState({input: ""})
    };

    reset = () => {
        const nodes = this.root.descendants();
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].data.isCompleted = false;
            nodes[i].data.isSeen = false;
        }
        this.setState({currentNode: this.root.leaves()[0]})
    };

    done = () => {
        alert("Memorization completed!");
        this.reset();
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
            return <Link key={key} source={link.source} target={link.target}/>
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