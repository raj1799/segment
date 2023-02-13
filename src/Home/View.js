import { useState } from 'react'
import { Button, Offcanvas, OffcanvasHeader, OffcanvasBody, Row, Col, Label, Form, Input } from 'reactstrap'
import { AiFillMinusSquare } from 'react-icons/ai';
import { OpenNotification } from '../Helper';
const Segment = () => {
    const [selectedSchemas, setSelectedSchemas] = useState([]);
    const [selectedOption, setSelectedOption] = useState(""), [segmentName, setSegmentName] = useState('');
    const [canvasOpen, setCanvasOpen] = useState(false)
    const [canvasScroll, setCanvasScroll] = useState(false)
    const [canvasBackdrop, setCanvasBackdrop] = useState(true)
    const [loading, setLoading] = useState(false)

    const options = [
        { label: 'First Name', value: 'first_name' },
        { label: 'Last Name', value: 'last_name' },
        { label: 'Gender', value: 'gender' },
        { label: 'Age', value: 'age' },
        { label: 'Account Name', value: 'account_name' },
        { label: 'City', value: 'city' },
        { label: 'State', value: 'state' },
    ];


    const toggleCanvasScroll = () => {
        setCanvasScroll(true)
        setCanvasOpen(!canvasOpen)
    }

    const handleOptionSelect = event => {
        setSelectedOption(event.target.value);
    };

    const handleAddSchema = () => {
        if (!selectedOption) {
            return;
        }
        setSelectedSchemas([...selectedSchemas, selectedOption]);
        setSelectedOption("");
    };
    const handleReset = () => {
        setSelectedSchemas([])
        setSegmentName("")
    }

    const showLabel = (label) => {
        return options.find((item, key) => {
            return item.value === label
        })
    }

    const handleSubmit = (event) => {
        setLoading(true)
        event.preventDefault()
        if (!segmentName) {
            alert('Enter name of the segment')
            setLoading(false)
            return
        }
        const params = {
            segment_name: segmentName
        }
        const schema = []
        for (const item of selectedSchemas) {
            const opt = {}
            const temp = showLabel(item)
            console.log(temp)
            opt[temp.value] = temp.label
            schema.push(opt)
        }
        params['schema'] = schema
        fetch('https://webhook.site/7402a190-dc00-4208-822f-b2a43620dec8', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/plain, */*'
            },
            body: JSON.stringify(params)
        })
            .then((response) => {
                setLoading(false)
                if (response.status === 200) {
                    OpenNotification('success', 'Success!', 'Segment saved successfully!')
                    console.log(response.json())
                    setCanvasOpen(!canvasOpen)
                    handleReset()
                }
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className='demo-inline-spacing'>
            <Button className='mt-5 ' color='primary' onClick={toggleCanvasScroll}>
                Segment
            </Button>

            <Offcanvas
                scrollable={canvasScroll}
                backdrop={canvasBackdrop}
                direction='end'
                isOpen={canvasOpen}
                toggle={toggleCanvasScroll}
            >
                <OffcanvasHeader className='canvas-head text-white' toggle={toggleCanvasScroll}>Saving Segment</OffcanvasHeader>
                <OffcanvasBody className='mt-3 mx-0 flex-grow-0'>

                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <div >
                                <Label>Enter the Name of the Segment</Label>
                                <Input type="text" placeholder="Name of the segment" value={segmentName} onChange={e => setSegmentName(e.target.value)} name="segment_name" />
                                <p className='my-4'>To save your Segment you need to add the schemas to build the query</p>
                            </div>
                            {selectedSchemas.length > 0 &&
                                <div className='mt-5 mb-5' style={{ border: '2px solid #79aede', padding: '10px' }}>
                                    {selectedSchemas.map(schema => (

                                        <Col lg="12" className=" my-2 d-flex ">
                                            <Col lg="9">
                                                <div key={schema}>
                                                    <Input type='select' value={schema} onChange={e => setSelectedSchemas(prevSchemas => [...prevSchemas.filter(s => s !== schema), e.target.value])}>
                                                        <option value={schema}>{showLabel(schema).label}</option>
                                                        {options
                                                            .filter(option => !selectedSchemas.includes(option.value))
                                                            .map(item => (
                                                                <option key={item.value} value={item.value}>
                                                                    {item.label}
                                                                </option>
                                                            ))}
                                                    </Input>

                                                </div>
                                            </Col>
                                            <Col lg="3">
                                                <AiFillMinusSquare size={38} className="mx-1" />
                                            </Col>
                                        </Col>
                                    ))}
                                </div>
                            }
                            <div >
                                <Input
                                    type='select'
                                    name="schema"
                                    value={selectedOption}
                                    onChange={handleOptionSelect}
                                    disabled={selectedSchemas.length === options.length}>
                                    <option value="" disabled>
                                        Add schema to segment
                                    </option>
                                    {options
                                        .filter(option => !selectedSchemas.includes(option.value))
                                        .map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                </Input>
                                {selectedSchemas.length > 0 &&
                                    <div className='mt-3 text-end'>
                                        <Button className='save-btn' onClick={() => { handleReset() }}>Reset all</Button>
                                    </div>
                                }
                            </div>
                            <div className='mt-5'>

                                <a className='link-primary' onClick={handleAddSchema} disabled={!selectedOption} style={{ cursor: "pointer" }}>+ Add new schema</a>
                            </div>
                        </Row>
                        <div className='d-flex justify-content-between mt-5 pt-5 '>
                            <div>
                                <Button className='save-btn' type='submit'>{loading ? 'Loading...' : 'Save Segment'}</Button>
                            </div>
                            <div>
                                <Button block outline className='cancel-btn' onClick={toggleCanvasScroll}>Cancel</Button>
                            </div>
                        </div>
                    </Form>
                </OffcanvasBody>
            </Offcanvas>
        </div>
    )
}
export default Segment
