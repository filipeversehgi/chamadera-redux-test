import React, { PureComponent } from 'react';
import { Row, Col, Jumbotron, Table } from "reactstrap";
import { connect } from 'react-redux';
import * as classActions from '../actions/classActions';
import { bindActionCreators } from 'redux';
import * as moment from 'moment';
import ClasseItem from "../components/classe-item";

class HomeContainer extends PureComponent {

    attendClass = classe => {
        console.log('Attend', classe);
        this.props.actions.attendClass(classe.id);
    };

    missClass = classe => {
        this.props.actions.missClass(classe.id);
    };

    render() {
        const {missed, next} = this.props;
        console.log('Props', this.props);

        return (
            <Row>
                <Col md={12}>
                    <Jumbotron style={{ marginTop: 20 }}>
                        <h1 className="display-3">Chamadera</h1>
                        <p className="lead">
                        Controle sua presença nos seus cursos!
                        </p>
                        <hr className="my-2" />
                        <p>Verifique suas próximas aulas abaixo:</p>
                    </Jumbotron>
                </Col>

                <Col md={12}>
                    <h4>Aulas Pendentes</h4>
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
                        {missed.map(classe => (
                            <ClasseItem key={classe.id} classe={classe} onAttend={this.attendClass} onMiss={this.missClass} onReset={this.resetClass} />
                        ))}
                        </tbody>
                    </Table>
                    
                    <h4 className='mt-4'>Próximas Aulas</h4>
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
                        {next.map(classe => (
                            <ClasseItem key={classe.id} classe={classe} onAttend={this.attendClass} onMiss={this.missClass} onReset={this.resetClass} />
                        ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const now = moment();
    return {
        missed: state.classes.filter(c => c.wentTo === undefined && moment(c.date, 'DD/MM/YYYY').isBefore(now)).map(c => ({ ...c, discipline: state.disciplines.find(d => d.id === c.disciplineId) })),
        next: state.classes.filter(c => c.wentTo === undefined && moment(c.date, 'DD/MM/YYYY').isAfter(now)).map(c => ({ ...c, discipline: state.disciplines.find(d => d.id === c.disciplineId) })),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(classActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);