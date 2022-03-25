import React, {Component} from 'react';
import Menu from './MenuComponent';
// import Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import {DISHES} from '../shared/dishes';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Route, Switch , Redirect} from 'react-router-dom';

class Main extends Component {

  constructor(props){
    super(props);

    this.state = {
      dishes: DISHES,
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
        <Home/>
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