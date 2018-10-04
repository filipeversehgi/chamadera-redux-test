import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import HomeContainer from './containers/homeContainer';
import CoursesContainer from './containers/coursesContainer';
import CourseContainer from './containers/courseContainer';
import DisciplineContainer from './containers/disciplineContainer';
import { Navbar, NavbarBrand, Nav, NavItem, Container, NavLink } from 'reactstrap';

const Router = () => {
    return (
        <BrowserRouter>
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand>Chamadera</NavbarBrand>
                    
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink>
                            <Link to='/'>Home</Link>
                            </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink>
                            <Link to='/courses'>Cursos</Link>
                            </NavLink>
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