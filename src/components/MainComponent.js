import React, {Component} from 'react';
import Menu from './MenuComponent';
// import Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import {DISHES} from '../shared/dishes';
import {COMMENTS} from '../shared/comments';
import {PROMOTIONS} from '../shared/promotions';
import {LEADERS} from '../shared/leaders';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import { Route, Switch , Redirect} from 'react-router-dom';

class Main extends Component {

  constructor(props){
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS,
      // selectedDish: null,
    };
  }


  // onDishSelect(dishId){
    // this.setState({
        // selectedDish: dishId,
    // });
  // }

  render(){

    const HomePage = ()=>{
      return(
        <Home dish={this.state.dishes.filter((dish)=>dish.featured)[0]} 
        leader={this.state.leaders.filter((leader)=>leader.featured)[0]} 
        promotion={this.state.promotions.filter((promo)=>promo.featured)[0]}/>
      );
    }

    const MenuPage = ()=>{
      return(
        <Menu dishes = {this.state.dishes}/>
      );
    }

    return (
      <div>
        <Header/>

        <Switch>
          <Route path='/home' component={HomePage}/>
          <Route exact path='/menu' component={MenuPage}/>
          <Route exact path='/contactus' component={Contact}/>
          <Redirect to='/home'/>
        </Switch>

        {/* <Menu dishes={this.state.dishes} onClick={(dishId)=>this.onDishSelect(dishId)}/> */}
        {/* <Dishdetail selectedDish={this.state.dishes.filter((dish)=> dish.id === this.state.selectedDish)[0]}/> */}
        <Footer/>
      </div>
    );
  }
}

export default Main;