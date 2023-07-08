import { FormEventHandler, useCallback, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

const Subscriber = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  const submitForm: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      alert(`${name + " - " + email}`);
    },
    [name, email]
  );
  return (
    <Form onSubmit={submitForm}>
      <Form.Text>Sign up to get recent news</Form.Text>
      <Form.Label htmlFor="name" visuallyHidden>
        YOUR NAME*
      </Form.Label>
      <InputGroup className="mb-3">
        <InputGroup.Text id="name">YOUR NAME*</InputGroup.Text>
        <Form.Control
          placeholder=""
          aria-label="Name"
          aria-describedby="name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </InputGroup>
      <Form.Label htmlFor="email" visuallyHidden>
        YOUR EMAIL*
      </Form.Label>
      <InputGroup className="mb-3">
        <InputGroup.Text id="email">YOUR EMAIL*</InputGroup.Text>
        <Form.Control
          placeholder=""
          aria-label="Email"
          aria-describedby="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </InputGroup>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Subscriber;
