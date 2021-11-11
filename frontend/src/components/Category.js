import {Component} from "react";
import AppNav from "./AppNav";

class Category extends Component {
    state = {
        isLoading: true,
        categories: []
    }

    async componentDidMount() {
        const response = await fetch('/api/categories');
        const body = await response.json();
        this.setState({categories: body, isLoading: false});
    }

    render() {
        const {categories, isLoading} = this.state;
        if (isLoading)
            return (<div>Loading...</div>);
        return (<div>
            <AppNav/>
            <h2>Categories</h2>
            {
                categories.map(category =>
                    <div key={category.id}>
                        {category.name}
                    </div>
                )
            }


        </div>);
    }
}

export default Category;