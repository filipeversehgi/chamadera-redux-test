import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as disciplineActions from '../actions/disciplineActions';
import { Link } from 'react-router-dom';

class CourseContainer extends PureComponent {
  constructor(props){
    super(props);

    this.state = {
      discipline: {
        id: '',
        name: '',
        teacher: ''
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onRemoveClick = this.onRemoveClick.bind(this);
  }

  handleChange(event) {
    this.setState({
      discipline: { ...this.state.discipline, [event.target.name]: event.target.value }
    });
  }

  onSubmit(e) {
    e.preventDefault();

    let action = this.props.actions.editDiscipline;

    if (!this.state.discipline.id) {
      action = this.props.actions.createDiscipline
    }

    action(this.state.discipline, this.props.course.id);

    this.setState({
      discipline: {
        id: '',
        name: '',
        teacher: ''
      }
    })
  }

  onEditClick(discipline) {
    this.setState({
      discipline
    });
  }

  onRemoveClick(discipline) {
    this.props.actions.removeDiscipline(discipline.id);
  }

  render() {
    return (
      <div>
        <Link to='/courses'>Voltar</Link>
        <h1>{this.props.course.name}</h1>
        <p>{this.props.course.location}</p>

        <hr />

        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Professor</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {this.props.disciplines
              .map(discipline => (
              <tr key={discipline.id}>
                <td>{discipline.name}</td>
                <td>{discipline.teacher}</td>
                <td>
                  <a onClick={() => { this.onEditClick(discipline) }}>Editar</a>
                  <a onClick={() => { this.onRemoveClick(discipline) }}>Remover</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <hr />

        <form>
          <label>Nome</label>
          <input name='name' onChange={this.handleChange} value={this.state.discipline.name} />

          <label>Professor</label>
          <input name='teacher' onChange={this.handleChange} value={this.state.discipline.teacher} />

          <input type='submit' value='Salvar' onClick={this.onSubmit} />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    course: state.courses.find(i => ownProps.match.params.id === i.id),
    disciplines: state.disciplines.filter(i => i.courseId === ownProps.match.params.id)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(disciplineActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseContainer)