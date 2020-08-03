import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, 
    Breadcrumb, BreadcrumbItem, Modal, Label, Row, Col, 
    Button, ModalHeader, ModalBody} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        alert('Current State is: ' + JSON.stringify(values));
    }

    render() {
    return (
        <React.Fragment>
            <Button className="bg-white text-dark" onClick={this.toggleModal}>
                  <p className="fa fa-pencil fa-lg"></p>
             Submit Comment
            </Button>
            <Modal className ="container" isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.handleToggle}>
                    Submit Comment
                </ModalHeader>
                <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                        <Label htmlFor="rating" md={4}>Rating</Label>
                        <Col md={12}>
                            <Control.select model=".rating" name="rating"
                                className="form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="yourname" md={4}>Your Name</Label>
                        <Col md={12}>
                            <Control.text model=".yourname" id="yourname" name="yourname"
                                placeholder="Your Name"
                                className="form-control"
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}
                            />
                            <Errors
                                className="text-danger"
                                model=".yourname"
                                show="touched"
                                messages={{
                                    required: 'Required',
                                    minLength: 'Must be greater than 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="message" md={4}>Comment</Label>
                        <Col md={12}>
                            <Control.textarea model=".message" id="message" name="message"
                                rows="6"
                                className="form-control" />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col md={{ size: 10, offset: 2 }}>
                            <Button type="submit" color="primary">
                                Submit
                            </Button>
                        </Col>
                    </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
};
}

class DishDetail extends Component {

    renderComments(comments) {
        const comm = comments.map(comment => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                    {"  "}
                    {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit'
                    }).format(new Date(comment.date))}
                    </p>
                </li>
            )
        })
        return (
            <div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {comm}
                </ul>
                <CommentForm />
            </div>
        )
    }

    renderDish(dish) {
            return (
          <div className='col-12 col-md-5 m-1'>
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            )
        }
    render() {
        const dish = this.props.dish
        const comments=this.props.comments        
        if (dish == null || comments == null) {
            return (<div></div>)
        }
        const dishDetails = this.renderDish(dish)
        const commentInfo = this.renderComments(comments)
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{this.props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                     {dishDetails}
                     &ensp;
                    {commentInfo}                   
                </div>
            </div>
        )
    }
}

export default DishDetail