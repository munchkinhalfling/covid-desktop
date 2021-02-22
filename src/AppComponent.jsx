import React from 'react';
import { Container, Card, Jumbotron } from 'react-bootstrap';

export default function App() {
    return <Container>
        <Jumbotron>
            <h1>The COVID Tracking Project is <a href="https://covidtracking.com/analysis-updates/covid-tracking-project-end-march-7">ending</a>.</h1>
        </Jumbotron>
        <p>I will get this back up once they publish alternate sources.</p>
    </Container>
}