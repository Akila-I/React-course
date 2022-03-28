import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';
import {Breadcrumb, BreadcrumbItem,} from 'reactstrap';
import {Link} from 'react-router-dom';

function RenderComments({comments}){
    if(comments == null){
        return(<div></div>)
    }else{
        const comm = comments.map((c)=>{
            return (
                <li key={c.id}>
                    <div className="row">
                        {c.comment}
                    </div>
                    <div className="row">
                        {"-- "+c.author+" , "+new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(c.date)))}
                    </div>
                    <br></br>
                </li>
            );
        });

    return(
        <div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>
            <ul className="list-unstyled">
                {comm}
            </ul>
        </div>
    );
    }
}

function RenderDish({dish}){
    return(
        <div className="col-12 col-md-5 m-1">
        <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name}/>
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
        </div>    
    );
}

const Dishdetail = (props) => {
    if(props.selectedDish != null){
    return(
        <div className='container'>
            <div className='row'>
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.selectedDish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className='col-12'>
                    <h3>{props.selectedDish.name}</h3>
                    <hr/>
                </div>
            </div>
            <div className="row">
                <RenderDish dish={props.selectedDish} />
                <RenderComments comments={props.comments} />
            </div>
        </div>)
    }else{
        return(
            <div></div>
        );
    }
}

export default Dishdetail;