import React from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle } from 'reactstrap';

function RenderDish({dish}) {
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

    function RenderComments({comments}) {
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
                <ul className='row'>
                    {comm}
                </ul>

            </div>
        )
    }

    
    const DishDetail = (props) => {
        const dish = props.dish;
        if (dish == null || dish.comments == null) {
            return (<div></div>)
        }
        const dishDetails = <RenderDish dish ={dish} />
        const commentInfo = <RenderComments comments={dish.comments}/>
        return (
            <div className='row'>
                {dishDetails}
                {commentInfo}
            </div>
        )
    }
export default DishDetail


