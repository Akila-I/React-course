import React, {Component} from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import { Route, Switch , Redirect, withRouter} from 'react-router-dom';
import About from './AboutComponent';
import { connect } from 'react-redux';
import { addComment, fetchComments, fetchDishes, fetchPromos } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = (state)=>{
  return({
    dishes: state.dishes,
    comments: state.comments,
    leaders: state.leaders,
    promotions: state.promotions
  });
};

const mapDispatchToProps = dispatch => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => dispatch(fetchDishes()),
  resetFeedbackForm: ()=> {dispatch(actions.reset('feedback'))},
  fetchPromos: () => dispatch(fetchPromos()),
  fetchComments: () => dispatch(fetchComments()),
});

class Main extends Component {

  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchPromos();
    this.props.fetchComments();

  }

  render(){

    const HomePage = ()=>{
      return(
        <Home dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]}
        dishesLoading = {this.props.dishes.isLoading}
        dishesErrMess = {this.props.dishes.errMess}
        leader={this.props.leaders.filter((leader)=>leader.featured)[0]} 
        promotion={this.props.promotions.promotions.filter((promo)=>promo.featured)[0]}
        promosLoading = {this.props.promotions.isLoading}
        promosErrMess = {this.props.promotions.errMess} />
      );
    }

    const MenuPage = ()=>{
      return(
        <Menu dishes = {this.props.dishes}/>
      );
    }

    const AboutPage = ()=>{
      return(
        <About leaders = {this.props.leaders}/>
      );

    }

    const DishWithId = ({match})=>{
      return(
        <Dishdetail dish={this.props.dishes.dishes.filter((dish)=> dish.id === parseInt(match.params.dishID, 10))[0]}
          isLoading = {this.props.dishes.isLoading}
          errMess = {this.props.dishes.errMess}
          comments={this.props.comments.comments.filter((comment)=> comment.dishId === parseInt(match.params.dishID, 10))}
          commentsErrMess = {this.props.dishes.errMess}
          addComment={this.props.addComment}
        />
      );
    }

    return (
      <div>
        <Header/>

        <Switch>
          <Route path='/home' component={HomePage}/>
          <Route exact path='/menu' component={MenuPage}/>
          <Route path='/menu/:dishID' component={DishWithId}/>
          <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />}/>
          <Route exact path='/aboutus' component={AboutPage}/>
          <Redirect to='/home'/>
        </Switch>

        {/* <Menu dishes={this.props.dishes} onClick={(dishId)=>this.onDishSelect(dishId)}/> */}
        {/* <Dishdetail selectedDish={this.props.dishes.filter((dish)=> dish.id === this.props.selectedDish)[0]}/> */}
        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));