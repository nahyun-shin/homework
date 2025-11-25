import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap';

function FormExam(props) {
    return (
        <div>
            <main>
                <Button variant='btn btn-success mx-3'>사용자버튼</Button>
                <Button variant='btn btn-success mx-3'>사용자버튼</Button>
                <Button>사용자버튼</Button>

            </main>
        </div>
    );
}

export default FormExam;