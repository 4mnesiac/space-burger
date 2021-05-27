import React from 'react';
import modalStyles from './modal.module.css';
// eslint-disable-next-line no-unused-vars
import {Details, OrderModal} from './parts';

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
        }
    }

    handleClose = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        })
    }

    render() {
        return (
            <section className={this.state.isOpen ? `${modalStyles.overlay} ${modalStyles.overlay_opened}` : modalStyles.overlay} >
                {/* логика открытия модалки не реализовывалась в рамках 1 спринта */}
                {/* <Details data={this.props.data[2]} toClose={this.handleClose} /> */}
                <OrderModal toClose={this.handleClose} />
            </section>
        )
    }
}