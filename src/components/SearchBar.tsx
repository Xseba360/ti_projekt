import React, {BaseSyntheticEvent} from "react";
import {Button, Form} from "react-bootstrap";
import {CiSearch} from "react-icons/ci";
import {NavigateFunction} from "react-router-dom";
import {withRouter} from "./withRouter";

interface SearchBarProps {
    navigate?: NavigateFunction
    toggleMenu: () => void
}

interface SearchBarState {
    value: string
}

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
    state: SearchBarState = {
        value: ''
    }

    constructor(props: SearchBarProps) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event: BaseSyntheticEvent) {
        if (event.target instanceof HTMLInputElement) {
            this.setState({value: event.target.value})
        }
    }

    handleSubmit(event: BaseSyntheticEvent) {
        if (this.props.navigate) {
            this.props.navigate(`/search/${this.state.value}`)
        }
        this.props.toggleMenu()
        event.preventDefault();
        return
    }

    render() {
        return (
            <Form className="d-flex" onSubmit={this.handleSubmit}>
                <Form.Control
                    type="search"
                    placeholder="Wyszukaj produkt"
                    className="me-2"
                    aria-label="Wyszukaj produkt"
                    value={this.state.value}
                    onChange={this.handleChange}
                />
                <Button type="submit" value="submit" variant="outline-success"><CiSearch/></Button>
            </Form>
        )
    }
}

export default withRouter(SearchBar)