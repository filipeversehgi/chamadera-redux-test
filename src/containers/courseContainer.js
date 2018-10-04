import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as disciplineActions from '../actions/disciplineActions';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import { Row, Col, Table, Jumbotron, Form, FormGroup, Label, Input, Button, InputGroupAddon, InputGroup } from 'reactstrap';

class CourseContainer extends PureComponent {
  constructor(props){
    super(props);

    this.state = {
      discipline: {
        id: '',
        name: '',
        teacher: '',
        startDate: '01/10/2018',
        endDate: '31/10/2018',
        classDays: {
          sun: 0,
          mon: 0,
          tue: 0,
          wed: 0,
          thu: 0,
          fri: 0,
          sat: 0
        },
        classToHourRatio: 1
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onRemoveClick = this.onRemoveClick.bind(this);
    this.calcTotalOfClasses = this.calcTotalOfClasses.bind(this);
    this.calcTotalOfHours = this.calcTotalOfHours.bind(this);
  }

  handleChange(event) {
    if(event.target.name.split('.').length === 2){
      const [name, subname] = event.target.name.split('.');
      this.setState({
        discipline: { ...this.state.discipline, [name]: { ...this.state.discipline[name], [subname]: event.target.value } }
      });  
      return;
    }
    this.setState({
      discipline: { ...this.state.discipline, [event.target.name]: event.target.value }
    });
  }

  calcTotalOfClasses(discipline) {
    const {startDate, endDate, classDays} = discipline;
    return this.multipleWeedDaysCount(startDate, endDate, classDays);
  }

  calcTotalOfHours(discipline) {
    const { startDate, endDate, classDays } = discipline;
    return this.multipleWeedDaysCount(startDate, endDate, classDays) * discipline.classToHourRatio;
  }


  weekDaysBetween(d1, d2, isoWeekday) {
    d1 = moment(d1, 'DD/MM/YYYY');
    d2 = moment(d2, 'DD/MM/YYYY');

    const daysToAdd = ((7 + isoWeekday) - d1.isoWeekday()) % 7;
    const nextDay = d1.clone().add(daysToAdd, 'days');

    if(nextDay.isAfter(d2)) {
      return 0
    }

    var weekBetween = d2.diff(nextDay, 'week');

    console.log('WeekdayCalc: ', weekBetween+1, isoWeekday, d1.toISOString(), d2.toISOString());
    return weekBetween + 1;
  }

  multipleWeedDaysCount(d1, d2, classDays) {
    console.log('CD',classDays);

    return Object.values(classDays).reduce((acc, cur, i) => {
      console.log('Weekday', Number(cur), i+1);
      return acc += this.weekDaysBetween(d1, d2, i+1) * Number(cur);
    }, 0);
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
        teacher: '',
        startDate: '',
        endDate: '',
        classDays: {
          sun: 0,
          mon: 0,
          tue: 0,
          wed: 0,
          thu: 0,
          fri: 0,
          sat: 0
        },
        classToHourRatio: 1
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
    console.log(this.state);

    return (
      <Row>
        <Col md={12}>
          <Jumbotron style={{ marginTop: 20 }}>
            <Link to='/courses'>Voltar</Link>
            <h1 className="display-3">{this.props.course.name}</h1>
            <p className="lead">{this.props.course.location}</p>
            <hr className="my-2" />
            <p>Cadastre as matérias que você está cursando neste curso.</p>

          </Jumbotron>
        </Col>

        <Col md={12}>
          <Table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Professor</th>
                <th>Total de Aulas</th>
                <th>Toal de Horas</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {this.props.disciplines
                .map(discipline => (
                  <tr key={discipline.id}>
                    <td>{discipline.name}</td>
                    <td>{discipline.teacher}</td>
                    <td>{this.calcTotalOfClasses(discipline)}</td>
                    <td>{this.calcTotalOfHours(discipline)}</td>
                    <td>
                      <Button onClick={() => { this.onEditClick(discipline) }} outline color='secondary'>Editar</Button>{' '}
                      <Button onClick={() => { this.onRemoveClick(discipline) }} outline color='danger'>Remover</Button>{' '}
                      <Link to={`/courses/${this.props.course.id}/${discipline.id}`}>
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
            <FormGroup>
              <Label>Nome</Label>
              <Input name='name' onChange={this.handleChange} value={this.state.discipline.name} />
            </FormGroup>

            <FormGroup>
              <Label>Professor</Label>
              <Input name='teacher' onChange={this.handleChange} value={this.state.discipline.teacher} />
            </FormGroup>

            <FormGroup>
              <Label>Início</Label>
              <Input name='startDate' onChange={this.handleChange} value={this.state.discipline.startDate} />
            </FormGroup>

            <FormGroup>
              <Label>Fim</Label>
              <Input name='endDate' onChange={this.handleChange} value={this.state.discipline.endDate} />
            </FormGroup>

            <Label>Dias de Aula</Label>

            <Row>
              <Col md={3}>
                <FormGroup>
                  <Label>Domingo</Label>
                  <Input name='classDays.sun' onChange={this.handleChange} value={this.state.discipline.classDays.sun} />
                </FormGroup>
              </Col>

              <Col md={3}>
                <FormGroup>
                  <Label>Segunda</Label>
                  <Input name='classDays.mon' onChange={this.handleChange} value={this.state.discipline.classDays.mon} />
                </FormGroup>
              </Col>

              <Col md={3}>
                <FormGroup>
                  <Label>Terça</Label>
                  <Input name='classDays.tue' onChange={this.handleChange} value={this.state.discipline.classDays.tue} />
                </FormGroup>
              </Col>

              <Col md={3}>
                <FormGroup>
                  <Label>Quarta</Label>
                  <Input name='classDays.wed' onChange={this.handleChange} value={this.state.discipline.classDays.wed} />
                </FormGroup>
              </Col>

              <Col md={3}>
                <FormGroup>
                  <Label>Quinta</Label>
                  <Input name='classDays.thu' onChange={this.handleChange} value={this.state.discipline.classDays.thu} />
                </FormGroup>
              </Col>

              <Col md={3}>
                <FormGroup>
                  <Label>Sexta</Label>
                  <Input name='classDays.fri' onChange={this.handleChange} value={this.state.discipline.classDays.fri} />
                </FormGroup>
              </Col>

              <Col md={3}>
                <FormGroup>
                  <Label>Sábado</Label>
                  <Input name='classDays.sat' onChange={this.handleChange} value={this.state.discipline.classDays.sat} />
                </FormGroup>
              </Col>

              <Col md={3}>
                <FormGroup>
                  <Label>Cada aula equivale a</Label>
                  <InputGroup>
                    <Input name='classToHourRatio' onChange={this.handleChange} value={this.state.discipline.classToHourRatio} />
                    <InputGroupAddon addonType="append">horas</InputGroupAddon>
                  </InputGroup>
                </FormGroup>
              </Col>
            </Row>

            <p>Total de Aulas: {this.calcTotalOfClasses(this.state.discipline)} aulas</p>
            <p>Total de Horas: {this.calcTotalOfHours(this.state.discipline)} horas</p>
            <Button onClick={this.onSubmit}>Salvar</Button>
          </Form>
        </Col>
      </Row>
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