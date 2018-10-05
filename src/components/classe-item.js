import { Button } from "reactstrap";
import React from "react";

const ClasseItem = (props) => {

    const { classe, onAttend, onMiss, onReset } = props;

    const handleAttend = () => {
        onAttend(classe)
    }

    const handleMiss = () => {
        onMiss(classe)
    }

    const handleReset = () => {
        onReset(classe)
    }

    const parseClasseStatus = (wentTo) => {
        if(wentTo === true) return 'Presente';
        if(wentTo === false) return 'Faltou';
        return '';
    }

    return (
        <tr key={classe.id}>
            <td>{classe.date}</td>
            <td>{classe.discipline && `${classe.discipline.name} - ` }Aula {classe.rep}</td>
            <td>{parseClasseStatus(classe.wentTo)}</td>
            <td>
                <Button outline onClick={handleAttend} color="primary">
                    Fui
                </Button>{" "}
                <Button outline onClick={handleMiss} color="danger">
                    Faltei
                </Button>{" "}
                {classe.wentTo !== undefined && (
                    <Button onClick={handleReset} outline color="secondary">
                        Resetar
                    </Button>
                )}
            </td>
        </tr>
    )
}

export default ClasseItem;