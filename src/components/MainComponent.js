import React from 'react';
import {Component} from 'react';
import Menu from './MenuComponent'
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

class Main extends Component {
  constructor(props){
    super(props)
  }

  render() {
    const HomePage=()=>{
      return(
        <Home 
        dish={this.props.dishes.filter((dish) => dish.featured)[0]}
        promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
        leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      )
    }

    const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
    };    

    return (
      <div>
        {/* <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar> */}
        <Header />
          <Switch>
            <Route path='/home' component={HomePage}/>
            <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes}/>}/>
            <Route path='/menu/:dishId' component={DishWithId} />
            <Route exact path='/contactus' component={Contact}/>
            <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders}/>}/>
            <Redirect to="/home"/>
          </Switch>
        {/* <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)}/>
        <DishDetail dish={this.state.dishes.filter((dish)=>dish.id === this.state.selectedDish)[0]}/> */}
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
