import React, { Component } from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown'
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

export default class PriceSidebar extends Component {
	state = {
		open: true,
		value: '0',
	}

	handleClick = () => {
		this.setState({ open: !this.state.open })
	}

	handleChange = e => {
		this.props.handleFilters(e.target.value)
		this.setState({ value: e.target.value })
	}

	render() {
		console.log('price state: ', this.state.value)
		return (
			<div className="collapse_item_wrapper">
				<List style={{ borderBottom: '1px solid #dbdbdb' }}>
					<ListItem
						onClick={this.handleClick}
						style={{ padding: '10px 23px 10px 0' }}
					>
						<ListItemText
							primary={this.props.titleBar}
							className="collapse_title cursor_pointer"
						/>
						<FontAwesomeIcon
							icon={this.state.open ? faAngleUp : faAngleDown}
							className="icon cursor_pointer"
						/>
					</ListItem>
					<Collapse in={this.state.open} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							<RadioGroup
								aria-label="prices"
								name="prices"
								value={this.state.value}
								onChange={this.handleChange}
							>
								{this.props.prices.map(({ title, id }) => (
									<FormControlLabel
										key={id}
										value={`${id}`}
										control={<Radio />}
										label={title}
									/>
								))}
							</RadioGroup>
						</List>
					</Collapse>
				</List>
			</div>
		)
	}
}
