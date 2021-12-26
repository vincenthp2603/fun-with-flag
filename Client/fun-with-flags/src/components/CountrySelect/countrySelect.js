import { Col, Form } from 'react-bootstrap';
import countryNames from '../../utils/countryNames';

const CountrySelect = (props) => {
    let names = countryNames.sort();
    let priorCountry = props.priorCountry ? props.priorCountry : 'Vietnam'
    names = names.filter(name => name !== priorCountry);
    names.unshift(priorCountry);

    return (
        <Col
            lg={{ span: 10, offset: 1 }}
            md={{ span: 10, offset: 1 }}
            sm={{ span: 10, offset: 1 }}
            xs={{ span: 10, offset: 1 }}
        >
            <Form.Group className="mb-3">
                <Form.Label> Your Country </Form.Label>
                <Form.Select onChange={props.onChangeHandler}>
                    {
                        names.map((name, index) => {
                            return (
                                <option 
                                    key={index} 
                                    value={name}
                                >
                                    {name}
                                </option>)
                        })
                    }
                </Form.Select>
            </Form.Group>
        </Col>
    )
}

export default CountrySelect;