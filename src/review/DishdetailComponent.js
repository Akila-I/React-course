import React, { Component } from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';
import {Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label,Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';

const minLength = (len) => (val) => !val || (val.length >= len);
const maxLength = (len) => (val) => !val || (val.length <= len);

class CommentForm extends Component{

    constructor(props){
        super(props);

        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values){
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        this.toggleModal();
    }

    render(){
        return(
            <div>
                {/* Button */}
                <Button onClick={this.toggleModal}><span className='fa fa-pencil fa-lg'></span> Submit Comment</Button>

                {/* Modal */}
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>
                    Submit Comment
                </ModalHeader>

                <ModalBody>
                    <LocalForm onSubmit={(values)=> this.handleSubmit(values)}>
                        <Row className='form-group'>
                            <Label htmlFor="rating" >Rating</Label>

                            <Control.select model=".rating" id="rating" name="rating" className='form-control'>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                            </Control.select>
                        </Row>

                        <Row className='form-group'>
                            <Label htmlFor="author">Your Name</Label>

                            <Control.text model=".author" id="author" name="author" className='form-control' 
                            validators={{ minLength: minLength(3), maxLength: maxLength(15) }}/>

                            <Errors className='text-danger' model='.author' show='touched' messages={{
                                minLength: 'Must be greater than 2 characters',
                                maxLength: 'Must be 15 characters or less',
                            }} />
                        </Row>

                        <Row className='form-group'>
                            <Label htmlFor="comment">Comment</Label>
                            
                            <Control.textarea model=".comment" id="comment" name="comment" className='form-control' rows='6' />
                        </Row>

                        <Button type="submit" value="submit" color="primary">Submit</Button>
                    </LocalForm>
                </ModalBody>
            </Modal>
            </div>
        );
    };

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
}

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
            <CommentForm/>
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