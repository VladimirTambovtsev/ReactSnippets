import React, { Component } from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown'
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Collapse from '@material-ui/core/Collapse'

export default class BrandSidebar extends Component {
	state = {
		open: false,
		checked: [],
	}

	handleClick = () => {
		this.setState({ open: !this.state.open })
	}

	handleToggle = brandId => () => {
		const currentIndex = this.state.checked.indexOf(brandId)
		const newChecked = [...this.state.checked]

		if (currentIndex === -1) {
			newChecked.push(brandId)
		} else {
			newChecked.splice(currentIndex, 1)
		}

		this.setState({ checked: newChecked })
	}

	render() {
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
							{this.props.brands.map(({ brandName, _id }) => (
								<ListItem key={_id} style={{ padding: '10px 0' }}>
									<ListItemText primary={brandName} />
									<ListItemSecondaryAction>
										<Checkbox
											color="primary"
											onChange={this.handleToggle(_id)}
											checked={this.state.checked.indexOf(_id) !== -1}
										/>
									</ListItemSecondaryAction>
								</ListItem>
							))}
						</List>
					</Collapse>
				</List>
			</div>
		)
	}
}
