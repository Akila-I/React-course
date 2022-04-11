import React from "react";
import {Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText} from "reactstrap";
import {Loading} from './LoadingComponent';


function RenderCard ({item, isLoading, errMess}){

    if(isLoading){
        return(
            <div className='container'>
                <div className='row'>
                    <Loading />
                </div>
            </div>
        );
    }

    else if(errMess){
        return(
            <div className='container'>
                <div className='row'>
                    <h4>{errMess}</h4>
                </div>
            </div>
        );
    }

    else if(item){
        return(
            <Card>
                <CardImg src={item.image} alt={item.name} />
                <CardBody>
                    <CardTitle className="card-title">{item.name}</CardTitle>
                    {item.designation ? <CardSubtitle className="card-subtitle">{item.designation}</CardSubtitle> : null }
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
        );
    }
}

function Home (props){

    return(
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish} isLoading={props.dishesLoading} errMess={props.dishesErrMess} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader} />
                </div>
            </div>
        </div>
    );

}

export default Home;