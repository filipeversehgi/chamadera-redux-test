import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import HomeContainer from './containers/homeContainer';
import CoursesContainer from './containers/coursesContainer';
import CourseContainer from './containers/courseContainer';
import DisciplineContainer from './containers/disciplineContainer';
import { Navbar, NavbarBrand, Nav, NavItem, Container } from 'reactstrap';

const Router = () => {
    return (
        <BrowserRouter>
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand>Chamadera</NavbarBrand>
                    
                    <Nav className="ml-auto" navbar>
                        <NavItem style={{marginRight: 10}}>
                            <Link to='/'>Home</Link>
                        </NavItem>

                        <NavItem>
                            <Link to='/courses'>Cursos</Link>
                        </NavItem>
                    </Nav>
                </Navbar>

                <Container>
                    <Route exact path='/' component={HomeContainer} />
                    <Route exact path='/courses' component={CoursesContainer} />
                    <Route exact path='/courses/:id' component={CourseContainer} />
                    <Route exact path='/courses/:id/:dId' component={DisciplineContainer} />
                </Container>
            </div>
        </BrowserRouter>
    )
}

export default Router;