import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as classActions from '../actions/classActions';
import { Row, Col, Jumbotron, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import ClasseItem from '../components/classe-item';

class DisciplineContainer extends PureComponent {
  attendClass = classe => {
    this.props.actions.attendClass(classe.id);
  };

  missClass = classe => {
    this.props.actions.missClass(classe.id);
  };

  resetClass = classe => {
    this.props.actions.resetClass(classe.id);
  };

  render() {
    console.log("Props", this.props);
    const classesList = this.props.classes;

    return (
      <Row>
        <Col md={12}>
          <Jumbotron style={{ marginTop: 20 }}>
            <Link to={`/courses/${this.props.course.id}`}>Voltar</Link>
            <h1 className="display-3">{this.props.discipline.name}</h1>
            <p className="lead">{this.props.discipline.teacher}</p>
            <hr className="my-2" />
            <p>Gerencie suas presenças</p>
          </Jumbotron>
        </Col>

        <Col md={12}>
          <Table>
            <thead>
              <tr>
                <th>Dia</th>
                <th>Nome</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {classesList.map(classe => (
                <ClasseItem classe={classe} onAttend={this.attendClass} onMiss={this.missClass} onReset={this.resetClass} />
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { 
    course: state.courses.find(i => ownProps.match.params.id === i.id), 
    discipline: state.disciplines.find(i => ownProps.match.params.dId === i.id), 
    classes: state.classes.filter(i => ownProps.match.params.dId === i.disciplineId) 
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(classActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisciplineContainer);