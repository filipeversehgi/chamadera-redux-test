import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../actions/courseActions';
import { Link } from 'react-router-dom';
import { Row, Col, Table, Jumbotron, Form, FormGroup, Label, Input, Button } from 'reactstrap';

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
            <Row>
                <Col md={12}>
                    <Jumbotron style={{marginTop: 20}}>
                        <h1 className="display-3">Cursos</h1>
                        <p className="lead">Selecione ou crie seu curso</p>
                        <hr className="my-2" />
                        <p>Um curso é a maior unidade possível, exemplo: Curso de Inglês, Ciências da Computação, Design de Interiores, etc.</p>

                    </Jumbotron>
                </Col>
                <Col md={12}>
                    <Table>
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
                                        <Button onClick={() => { this.onEditClick(course) }} outline color='secondary'>Editar</Button>{' '}
                                        <Button onClick={() => { this.onRemoveClick(course) }}outline color='danger'>Remover</Button>{' '}
                                        <Link to={`/courses/${course.id}`}>
                                            <Button outline color='primary'>Selecionar</Button>{' '}
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>

                <Col md={12}>
                    <Form>
                        <h2>Adicionar novo curso</h2>
                        <FormGroup>
                            <Label>Nome</Label>
                            <Input name='name' onChange={this.handleChange} value={this.state.course.name} />
                        </FormGroup>

                        <FormGroup>
                            <Label>Local</Label>
                            <Input name='location' onChange={this.handleChange} value={this.state.course.location} />
                        </FormGroup>


                        <Button onClick={this.onSubmit}>Salvar</Button>
                    </Form>

                </Col>
            </Row>
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