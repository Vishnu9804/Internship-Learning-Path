import { Meta, StoryObj } from '@storybook/angular';
import { SnippetBox } from './snippet-box';

const meta: Meta<SnippetBox> = {
  title: 'UI Components/Snippet Box',
  component: SnippetBox,
  tags: ['autodocs'], // Automatically generates documentation
  argTypes: {
    title: { control: 'text' },
    code: { control: 'text' },
    isError: { control: 'boolean' }
  }
};

export default meta;
type Story = StoryObj<SnippetBox>;

export const ShortSnippet: Story = {
  args: {
    title: 'hello-world.ts',
    code: 'console.log("Hello, World!");\nreturn true;',
    isError: false,
  },
};

export const LongSnippet: Story = {
  args: {
    title: 'fibonacci.js',
    code: `function fibonacci(num) {
  if (num <= 1) return 1;
  return fibonacci(num - 1) + fibonacci(num - 2);
}

// Single line comment: Generate first 10 numbers
for (let i = 0; i < 10; i++) {
  console.log(fibonacci(i));
}
/* This is multiline comment
inside the code
*/
const x = Array.from({length: 20}, (_, i) => i);
console.log(x);`,
    isError: false,
  },
};

export const ErrorState: Story = {
  args: {
    title: 'Unknown File',
    code: '',
    isError: true,
  },
};