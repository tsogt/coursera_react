import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Label, Col } from 'reactstrap';
import { Link } from 'react-router-dom';    
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function RenderDish({dish}) {
  if (dish != null)
    return(
      <div>
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  else
      return(
          <div></div>
      );
}

function RenderComments({comments}){
  if(comments != null){
    return comments.map((comment)=>{
      return (
        <ul key={comment.id} className="list-unstyled">
          <li>
            {comment.comment}
          </li>
          <li>
            {comment.author}, {comment.date}
          </li>
        </ul>
      )
    });
  }
  else{
      return <div>No comment</div>
  }
}

class CommentForm extends Component{
  constructor(props){
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
        isModalOpen: false
    };
  }
  toggleModal() {
      this.setState({
          isModalOpen: !this.state.isModalOpen
      });
  }
  render() {
    return(
      <div>
        <Button outline onClick={this.toggleModal}><span className="fa fa-pencil" aria-hidden="true"></span> Submit Comment</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm>
              <Row className="form-group">
                <Label htmlFor="rating">Rating</Label>
                <Control.select model=".rating" id="rating" name="rating"
                    className="form-control"
                      />
              </Row>
              <Row className="form-group">
                <Label htmlFor="rating">Your Name</Label>
                <Control.text model=".name" id="name" name="name"
                    className="form-control" 
                    validators={{
                        required, minLength: minLength(3), maxLength: maxLength(15)
                    }}
                      />
                <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                        required: 'Required',
                        minLength: 'Must be greater than 2 numbers',
                        maxLength: 'Must be 15 numbers or less'
                    }}
                  />
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment">Comment</Label>
                <Control.textarea model=".comment" id="comment" name="comment"
                    className="form-control"
                      />
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const DishDetail = (props) => {
  return (
    <div className="container">
    <div className="row">
        <Breadcrumb>
            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
        </div>                
    </div>
    <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={props.dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
          <RenderComments comments={props.comments} />
          <CommentForm/>
        </div>
    </div>
    </div>
  );
}

export default DishDetail;