import { ValidationError } from 'class-validator';

export function getConstraintsMessage(error: ValidationError): string {
  let message = '';
  if (error.constraints) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    message += `${Object.values(error.constraints)} ${[error.property, error.value]}`;
  }
  if (error.children) {
    for (let index = 0; index < error.children.length; index++) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      message += ` | ${Object.values(error.children[index].constraints)} ${[
        error.children[index].property,
        error.children[index].value,
      ]}`;
    }
  }
  return message;
}

export function getConstraintsMessages(errors: ValidationError[]): string {
  const messages: string[] = [];

  for (const error of errors) {
    const message = getConstraintsMessage(error);
    messages.push(message);
  }
  return messages.join(' | ');
}
