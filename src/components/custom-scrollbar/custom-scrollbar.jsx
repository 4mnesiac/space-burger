

import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

export default class Scrollbar extends Component {

    constructor(props, ...rest) {
        super(props, ...rest);
        this.renderThumb = this.renderThumb.bind(this);
    }
    renderView({ style, ...props }) {
        const newStyles = {
            inset: 0,
            marginRight: -17,
            marginBottom: -17,
            position: 'absolute',
            overflowY: 'scroll',
            overflowX: 'hidden',

        }
        return (
            <div {...props} style={{ ...newStyles }} />
        )
    }
    renderThumb({ style, ...props }) {
        const thumbStyle = {
            backgroundColor: '#8585AD',
            width: 8,
            // this is костыль
            marginTop: this.props.context === 'constructor' ? 96 : 0,
        };

        return (
            <div
                style={{ ...style, ...thumbStyle }}
                {...props} />
        );
    }

    render() {
        return (
            <Scrollbars
                thumbSize={this.props.context === 'constructor' ? 192 : 292}
                renderThumbVertical={this.renderThumb}
                renderView={this.renderView}
                {...this.props}
            >
            </Scrollbars>
        );
    }
}
