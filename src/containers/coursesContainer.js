import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../actions/courseActions';
import { Link } from 'react-router-dom';

class CoursesContainer extends PureComponent {

    constructor(props){
        super(props);

        this.state = {
            course: {
                id: '',
                name: '',
                location: ''
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onRemoveClick = this.onRemoveClick.bind(this);
    }

    handleChange(event) {
        this.setState({
            course: { ...this.state.course, [event.target.name]: event.target.value }
        });
    }

    onSubmit(e) {
        e.preventDefault();

        let action = this.props.actions.editCourse;

        if(!this.state.course.id) {
            action = this.props.actions.createCourse
        }

        action(this.state.course);

        this.setState({
            course: {
                id: '',
                name: '',
                location: ''
            }
        })
    }

    onEditClick(course) {
        this.setState({
            course
        });
    }

    onRemoveClick(course) {
        this.props.actions.removeCourse(course.id);
    }

    render() {
        return (
            <div>
                <h1>Cursos</h1>
                
                <table>
                    <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Local</th>
                        <th>Ações</th>
                    </tr>  
                    </thead>              

                    <tbody>
                        {this.props.courses.map(course => (
                            <tr key={course.id}>
                                <td>{course.name}</td>
                                <td>{course.location}</td>
                                <td>
                                    <a onClick={() => { this.onEditClick(course) }}>Editar</a>
                                    <a onClick={() => { this.onRemoveClick(course) }}>Remover</a>
                                    <Link to={`/courses/${course.id}`}>Acessar</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <form>
                    <label>Nome</label>
                    <input name='name' onChange={this.handleChange} value={this.state.course.name} />

                    <label>Local</label>
                    <input name='location' onChange={this.handleChange} value={this.state.course.location} />

                    <input type='submit' value='Salvar' onClick={this.onSubmit} />
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        courses: state.courses
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesContainer);