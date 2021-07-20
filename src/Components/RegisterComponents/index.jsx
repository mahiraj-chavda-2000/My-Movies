
import { Form, Field } from 'react-advanced-form'
import { Input, Button } from 'react-advanced-form-addons'
import { FormProvider } from 'react-advanced-form'
import rules from '../../utils/validation-rules'
import messages from '../../utils/validation-messages'
const Register= () => {
    return (
        <div>
        <FormProvider rules={rules} messages={messages}>
        <Form>
        <Field.Group name="primaryInfo">
          <Input
            name="firstName"
            label="First name"
            required={({ get }) => {
              return !!get(['primaryInfo', 'lastName', 'value'])
            }} />
          <Input
            name="lastName"
            label="Last name"
            required={({ get }) => {
              return !!get(['primaryInfo', 'firstName', 'value'])
            }} />
        </Field.Group>
        <Field.Group name="primaryInfo">
          <Input
            name="userEmail"
            type="email"
            label="E-mail"
            required />
        </Field.Group>

        <Input
          name="userPassword"
          type="password"
          label="Password"
          required />
        <Input
          name="confirmPassword"
          type="password"
          label="Confirm password"
          required
          skip />
        <Button primary>Register</Button>
      </Form>
      </FormProvider>
           
        </div>
    )
}

export default Register
