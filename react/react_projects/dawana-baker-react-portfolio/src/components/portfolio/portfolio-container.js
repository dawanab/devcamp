import React, {Component} from "react";
import PortfolioItem from "./portfolio-item";
import axios from 'axios';


export default class PortfolioContainer extends Component {
	constructor() {
		super();
		
		this.state = {
			pageTitle:"Welcome to my portfolio",
			isLoading: false,
			data: []
			// data: [
			// 	{ title: "Quip", category: "eCommerce", slug: "quip" },
			// 	{ title: "Eventbrite", category: "Scheduling", slug: "eventbrite" }, 
			// 	{ title: "Ministry Safe", category: "Enterprise", slug: "ministry-safe" }, 
			// 	{ title:"SwingAway", category: "eCommerce", slug: "swingaway" }
			// ]
		};

		this.handleFilter = this.handleFilter.bind(this);
		this.getPortfolioItems = this.getPortfolioItems.bind(this);

		// Demonstration only ----->
		/* this.handlePageTitleUpdate = this.handlePageTitleUpdate.bind(this); */
	}

	/* filter the categories in the data list */
	handleFilter(filter) {
		this.setState({
			data: this.state.data.filter(item => {
				return item.category === filter;
			})
		})
	}

	getPortfolioItems() {
		axios
		.get("https://bakerdawana.devcamp.space/portfolio/portfolio_items")
		.then(response => {
		  console.log("response data", response);
		  this.setState({
			data: response.data.portfolio_items
		  });
		})
		.catch(error => {
		  console.log(error);
		});
	  }

	portfolioItems() {
		return this.state.data.map(item => {
			console.log("portfolio item", item);
			return <PortfolioItem 
				key = {item.id} 
				item = {item}
			/>;
		});
	}

	componentDidMount() {
		this.getPortfolioItems();
	}

	render() {
		if (this.state.isLoading) {
			return <div>Loading...</div>;
		}


		return (
			<div className="portfolio-items-wrapper">
				<button className="btn" onClick={() => this.handleFilter("eCommerce")}>eCommerce</button>
				<button className="btn" onClick={() => this.handleFilter("Scheduling")}>Scheduling</button>
				<button className="btn" onClick={() => this.handleFilter("Enterprise")}>Enterprise</button>

				{this.portfolioItems()}
			</div>
		);
	}
}