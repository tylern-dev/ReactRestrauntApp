import React from "react";
import Header from "./Header"
import Order from "./Order"
import Inventory from "./Inventory"
class App extends React.Component {
	state = {
		fishes: {},
		order: {}
	}

	addFish = (fish) => {
		// 1. Take a copy of the existing state - never mutate state directly
		const fishes = {...this.state.fishes}; //object spread
		// 2. Add new fish to that fishes variable
		fishes[`fish${Date.now()}`] = fish;
		// 3. Place the fishes object into state
		this.setState({
			fishes: fishes
		})
	}

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="fresh seafood market" />
				</div>
				<Order />
				<Inventory addFish={this.addFish} />
			</div>
		)
	}
}

export default App;