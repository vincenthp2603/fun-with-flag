import { Card } from 'react-bootstrap';

const flagresult = (props) => {
    return (
        <div>
            <Card style={{ margin: 'auto' }}>
                <Card.Img variant="top" src={props.flagUrl} style={{ borderBottom: 'solid 1px #d9d9d9' }}/>
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>
                        Capital: {props.capital}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default flagresult;

//http://res.cloudinary.com/vcloudinary/image/upload/v1632743676/r5gojmtzwexubttcllqj.gif

//https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/640px-Flag_of_Vietnam.svg.png