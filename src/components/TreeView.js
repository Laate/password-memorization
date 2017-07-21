import React from 'react'
import './App.css'
import Node from './Node'
import Link from './Link'
import { tree, hierarchy } from 'd3-hierarchy';


export default class TreeView extends React.Component {
    constructor(props) {
        super(props);

        this.root =  tree().size([this.props.width, this.props.height])(hierarchy(this.props.data, this.getChildren));
        this.nodeList = this.root.descendants();
        this.linkList = this.root.links();
        this.nodeList.forEach(node => {
            node.y += 30
        });

        this.state = {
            currentNode: this.root.leaves()[0],
            input: ""
        };
    }

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
        this.setState({input: event.target.value});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const currNode = this.state.currentNode;
        const rightNode = currNode.descendants()[2];
        const leftNode = currNode.descendants()[1];
        const leftText = currNode.data.leftText;
        const rightText = currNode.data.rightText;
        const input = this.state.input;

        if (input === leftText + rightText) {
            currNode.data.isCompleted = true;
            this.setState({currentNode: this.getNext(currNode)});
            currNode.parent || this.done();
        } else if (rightNode && input.indexOf(leftText) === 0) {
            rightNode.data.isCompleted = false;
            this.setState({currentNode: rightNode})
        } else if (leftNode && input.lastIndexOf(rightText) === input.length - rightText.length) {
            leftNode.data.isCompleted = false;
            this.setState({currentNode: leftNode});
        } else if (leftNode && rightNode) {
            rightNode.data.isCompleted = false;
            leftNode.data.isCompleted = false;
            this.setState({currentNode: leftNode})
        }
        this.setState({input: ''})
    };

    done = () => {
        alert("done")
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
                         text={node.data.leftText + node.data.rightText}/>
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