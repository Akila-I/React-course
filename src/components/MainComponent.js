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

const mapStateToProps = (state)=>{
  return({
    dishes: state.dishes,
    comments: state.comments,
    leaders: state.leaders,
    promotions: state.promotions
  });
};

class Main extends Component {

  render(){

    const HomePage = ()=>{
      return(
        <Home dish={this.props.dishes.filter((dish)=>dish.featured)[0]} 
        leader={this.props.leaders.filter((leader)=>leader.featured)[0]} 
        promotion={this.props.promotions.filter((promo)=>promo.featured)[0]}/>
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
        <Dishdetail selectedDish={this.props.dishes.filter((dish)=> dish.id === parseInt(match.params.dishID, 10))[0]}
          comments={this.props.comments.filter((comment)=> comment.dishId === parseInt(match.params.dishID, 10))}
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
          <Route exact path='/contactus' component={Contact}/>
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

export default withRouter(connect(mapStateToProps)(Main));