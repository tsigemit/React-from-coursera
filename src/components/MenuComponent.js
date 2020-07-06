import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import DishDetail from './DishdetailComponent'

class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedDish: null
        }
        console.log('Menu constructor method is invoked');
    }

    componentDidMount(){
        console.log('Menu componentDidMount() method is invoked')
    }

    componentDidUpdate(){
        console.log('Menu componentDidUpdate() method is invoked')
    }
    onSelectedDish(dish) {
        this.setState({
            selectedDish: dish
        })
    }

    render() {
        console.log('Menu render() is invoked')
        const menu = this.props.dishes.map(dish => {
            return (
                <div key={dish.id} className='col-12 col-md-5 m-1'>
                    <Card onClick={() => this.onSelectedDish(dish)} >
                            <CardImg top src={dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                </div>
            );
        });
        return (
            <div className='container'>
                <div className='row'>
                    {menu}
                </div>
                <DishDetail dish={this.state.selectedDish}></DishDetail>
            </div>
        );
    }
}

export default Menu; 