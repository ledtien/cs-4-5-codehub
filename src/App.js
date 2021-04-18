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
  Card,
  Image,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import React from "react";
import Moment from "react-moment";
import MarkdownRenderer from "react-markdown-renderer";

const markdown = "# This is a H1  \n## This is a H2  \n###### This is a H6";

const HubPagination = ({ pageNumber, onSearchCodeHub }) => {
  if (pageNumber === 0) return "";
  return (
    <Pagination className="justify-content-center mt-3">
      <Pagination.First onClick={(e) => onSearchCodeHub(e, pageNumber === 1)} />
      {pageNumber > 1 && (
        <Pagination.Prev onClick={(e) => onSearchCodeHub(e, pageNumber - 1)} />
      )}
      {pageNumber > 1 && (
        <Pagination.Item onClick={(e) => onSearchCodeHub(e, pageNumber - 1)}>
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
  );
};

function App() {
  const [pageNumber, setPageNumber] = useState(0);
  const [reposContent, setReposContent] = useState([]);
  const [searchContent, setSearchContent] = useState();
  const [readme, setReadme] = useState();
  const [user, setUser] = useState();

  const onSearchCodeHub = (e) => {
    e.preventDefault();
    onSearchRepos();
    onSearchUser();
  };

  const onSearchUser = async () => {
    const response = await fetch(
      `https://api.github.com/search/users?q=${searchContent}&page=${pageNumber}`
    );
    const json = await response.json();
    console.log(json);
    setUser(json.items);
  };
  const onSearchRepos = async () => {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${searchContent}&page=${pageNumber}`
    );
    const json = await response.json();
    setReposContent(json.items);
    setPageNumber(pageNumber + 1);
  };

  const fetchReadme = async () => {
    const readme = await fetch(
      `https://api.github.com/repos${window.location.pathname}/readme`
    );

    const json = await readme.json();
    const decodeBase64 = atob(json.content);
    setReadme(decodeBase64);
    console.log(decodeBase64);
  };

  useEffect(() => {
    if (window.location.pathname.length > 1) fetchReadme();
  }, []);
  console.log(window.location);

  if (window.location.pathname.length > 1) {
    return (
      <div className="container p-5">
        {<MarkdownRenderer markdown={readme} />}
      </div>
    );
  }
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

      <Container className="mt-4  p-3">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3} className="border p-3 bg-dark">
              <Nav variant="tabs" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Repositories</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Users</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9} className="border p-3">
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  {reposContent.map((r) => {
                    return (
                      <Card className="p-1 mb-3">
                        <Card.Body className="text-left">
                          <Card.Title>
                            <a href={r.full_name}>{r.full_name}</a>
                          </Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            {r.html_url}
                          </Card.Subtitle>
                          <Card.Text>{r.description}</Card.Text>
                          <Card.Link href={r.stargazers_url}>
                            Stars: {r.stargazers_count}
                          </Card.Link>
                          <Card.Link href={r.language_url}>
                            {r.language}
                          </Card.Link>
                          <Card.Link>
                            Updated:
                            <Moment date={r.updated_at} fromNow />
                          </Card.Link>
                          <Card.Link>Seen:{r.watchers_count}</Card.Link>
                        </Card.Body>
                      </Card>
                    );
                  })}
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  {user.map((u) => {
                    return (
                      <Card className="p-1 mb-3">
                        <Card.Body className="text-left">
                          <Card.Title>
                            <Image
                              className="photo"
                              src={u.avatar_url}
                              rounded
                            />{" "}
                            <a href={u.html_url}>{u.login}</a>
                          </Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            {u.html_url}
                          </Card.Subtitle>

                          <Card.Link href={u.language_url}>
                            {u.language}
                          </Card.Link>
                          <Card.Link>
                            Updated:
                            <Moment date={u.updated_at} fromNow />
                          </Card.Link>
                        </Card.Body>
                      </Card>
                    );
                  })}
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>

        <HubPagination
          pageNumber={pageNumber}
          onSearchCodeHub={onSearchCodeHub}
        />
      </Container>
    </div>
  );
}

export default App;
