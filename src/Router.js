import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import HomeContainer from './containers/homeContainer';
import CoursesContainer from './containers/coursesContainer';
import CourseContainer from './containers/courseContainer';

const Router = () => {
    return (
        <BrowserRouter>
            <div>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/courses'>Curses</Link></li>
                </ul>

                <hr />

                <Route exact path='/' component={HomeContainer} />
                <Route exact path='/courses' component={CoursesContainer} />
                <Route path='/courses/:id' component={CourseContainer} />
            </div>
        </BrowserRouter>
    )
}

export default Router;