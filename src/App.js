import "./App.css";
import {
  Navbar,
  Nav,
  Form,
  Button,
  FormControl,
  Container,
  Row,
  Col,
  Tab,
  Pagination,
} from "react-bootstrap";
import { useState, useEffect } from "react";

function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const [reposContent, setReposContent] = useState([]);
  const [searchContent, setSearchContent] = useState();

  const onSearchCodeHub = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${searchContent}&page=${pageNumber}`
    );
    const json = await response.json();
    setReposContent(json.items);
    setPageNumber(pageNumber + 1);
    console.log(json);
  };

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Github</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <Form inline onSubmit={onSearchCodeHub}>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            onChange={(e) => setSearchContent(e.target.value)}
          />
          <Button variant="outline-info" onClick={onSearchCodeHub}>
            Search
          </Button>
        </Form>
      </Navbar>

      <Container className="mt-4 border p-3">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3} className="border p-3 bg-dark">
              <Nav variant="tabs" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Repositories</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Code</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9} className="border p-3">
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  {reposContent.map((r) => {
                    return <div>{r.full_name}</div>;
                  })}
                </Tab.Pane>
                <Tab.Pane eventKey="second">hi</Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>

        <Pagination className="justify-content-center mt-3">
          <Pagination.First
            onClick={(e) => onSearchCodeHub(e, pageNumber === 1)}
          />
          {pageNumber > 1 && (
            <Pagination.Prev
              onClick={(e) => onSearchCodeHub(e, pageNumber - 1)}
            />
          )}
          {pageNumber > 1 && (
            <Pagination.Item onClick={(e) => onSearchCodeHub(e, pageNumber)}>
              {pageNumber - 1}
            </Pagination.Item>
          )}
          <Pagination.Item onClick={(e) => onSearchCodeHub(e, pageNumber)}>
            {pageNumber}
          </Pagination.Item>
          <Pagination.Item onClick={(e) => onSearchCodeHub(e, pageNumber)}>
            {pageNumber + 1}
          </Pagination.Item>
          <Pagination.Item>{3}</Pagination.Item>
          <Pagination.Ellipsis />

          <Pagination.Item>{10}</Pagination.Item>
          <Pagination.Item>{11}</Pagination.Item>
          <Pagination.Item>{13}</Pagination.Item>

          <Pagination.Ellipsis />
          <Pagination.Item>{20}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </Container>
    </div>
  );
}

export default App;
