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
import React from "react";
import ReactDom from "react-dom";
import MarkdownRenderer from "react-markdown-renderer";

const markdown = "# This is a H1  \n## This is a H2  \n###### This is a H6";

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
    setPageNumber(pageNumber);
    console.log(json);
  };

  const fetchReadme = async () => {
    const readme = await fetch(
      `https://api.github.com/repos${window.location.pathname}/readme`
    );

    const json = await readme.json();
    console.log(json);
  };

  useEffect(() => {
    fetchReadme();
  }, []);

  // if (window.location.pathname)
  //   return (
  //     <div>
  //       <MarkdownRenderer markdown={markdown} />
  //     </div>
  //   );
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
                    return (
                      <div>
                        <a href={r.full_name}>{r.full_name}</a>
                      </div>
                    );
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
            <Pagination.Item
              onClick={(e) => onSearchCodeHub(e, pageNumber - 1)}
            >
              {pageNumber - 1}
            </Pagination.Item>
          )}
          <Pagination.Item onClick={(e) => onSearchCodeHub(e, pageNumber)}>
            {pageNumber}
          </Pagination.Item>
          <Pagination.Item onClick={(e) => onSearchCodeHub(e, pageNumber + 1)}>
            {pageNumber + 1}
          </Pagination.Item>
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
