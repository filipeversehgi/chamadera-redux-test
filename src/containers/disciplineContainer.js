import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as classActions from '../actions/classActions';
import { Row, Col, Jumbotron, Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as moment from 'moment';

class DisciplineContainer extends PureComponent {

  constructor(props){
    super(props);

    this.createClassList = this.createClassList.bind(this);
  }

  createClassList(d) {
    const d1 = moment(d.startDate, 'DD/MM/YYYY');
    const d2 = moment(d.endDate, 'DD/MM/YYYY');
    const totalDays = d2.diff(d1, 'days');

    console.log('TotalDays', totalDays);

    let rep = 1;
    let classList = [];

    for(let i = 0; i <= totalDays; i++) {
      const currentDay = d1.clone().add(i, 'days');
      
      const numberOfClasses = Object.values(d.classDays)[currentDay.isoWeekday()];

      for(let j = 0; j < numberOfClasses; j++) {
        classList.push({
          id: rep,
          date: currentDay.format('DD/MM/YYYY'),
          rep,
          status: ''
        });

        rep++;
      }
    }

    return classList;
  }
  
  render() {
    const classesList = this.createClassList(this.props.discipline);

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
              {classesList
                .map(classe => (
                  <tr key={classe.id}>
                    <td>{classe.date}</td>
                    <td>Aula {classe.rep}</td>
                    <td>{classe.status}</td>
                    <td>
                      <Button outline color='primary'>Fui</Button>{' '}
                      <Button outline color='danger'>Faltei</Button>{' '}
                      {classe.id.length > 5 && <Button outline color='secondary'>Resetar</Button>}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    course: state.courses.find(i => ownProps.match.params.id === i.id),
    discipline: state.disciplines.find(i => ownProps.match.params.dId === i.id)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(classActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisciplineContainer);