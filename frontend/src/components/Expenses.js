import {Component} from "react";
import AppNav from "./AppNav";
import {Button, Container, Form, FormGroup, Input, Label, Table} from "reactstrap";
import DatePicker from "react-datepicker"
import {Link} from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css"
import Moment from "react-moment";


class Expenses extends Component {

    emptyItem = {
        id: '105',
        expensedate: new Date(),
        descript: "",
        category: {id:1, name:'Travel'}
    }

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            isLoading: true,
            expenses: [],
            categories: [],
            item: this.emptyItem
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    async handleSubmit(event) {

        const {item} = this.state;
        await fetch('api/expenses', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        event.preventDefault();
        this.props.history.push("/expenses")

    }


    async remove(id) {
        await fetch(`/api/expenses/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updateExpenses = [...this.state.expenses].filter(i => i.id !== id);
            this.setState({expenses: updateExpenses});
        })
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name =target.name;
        let item = {...this.state.item};
        item[name]=value;
        this.setState({item});
        console.log("name",name);
        console.log("value",value);

    }

    handleDateChange(date) {
        let item = {...this.state.item};
        item.expensedate = date;
        this.setState({item});
    }


    async componentDidMount() {
        const response = await fetch('/api/categories');
        const body = await response.json();
        this.setState({categories: body, isLoading: false});

        const responseExp = await fetch('/api/expenses');
        const bodyExp = await responseExp.json();
        this.setState({expenses: bodyExp, isLoading: false});
    }

    render() {
        const title = <h3>Add Expense</h3>
        const {categories} = this.state;
        const {expenses, isLoading} = this.state;


        let optionList = categories.map((category, index) =>
            <option id={category.id} key={index}>{category.name}</option>
        )
        let rows = expenses.map((expense,index) =>
            <tr key={index}>
                <td>{expense.descript}</td>
                <td>{expense.category.name}</td>
                <td><Moment date={expense.expensedate} format="YYYY/MM/DD"/></td>
                <td><Button size="sm" color="danger" onClick={() => this.remove(expense.id)}>Delete</Button></td>
            </tr>
        )

        if (isLoading)
            return (<div>Loading...</div>)

        return (
            <div>
                <AppNav/>
                <Container>
                    {title}
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input type="text" name="descript" id="title" onChange={this.handleChange}
                                   autoComplete="name"/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="category">Category</Label>
                            <select name="" onChange={this.handleChange}>
                                {optionList}
                            </select>

                        </FormGroup>

                        <FormGroup>
                            <Label for="expenseDate">Expense Date</Label>
                            <DatePicker selected={this.state.item.expensedate} onChange={this.handleDateChange}/>
                        </FormGroup>

                        <FormGroup>
                            <Button color="primary" type="submit">Save</Button>{' '}
                            <Button color="secondary" tag={Link} to="/categories">Cancel</Button>
                        </FormGroup>

                    </Form>
                </Container>
                {' '}
                <Container>
                    <h3>Expense List</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="20%">Description</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th width="10%">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </Table>
                </Container>


            </div>
        );
    }
}

export default Expenses;