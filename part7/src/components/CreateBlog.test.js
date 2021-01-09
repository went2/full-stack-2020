import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import CreateBlog from './CreateBlog';

test('creating blog', () => {

  //5.16 未完成。
  // CreateBlog 里面author likes 和 title 的变化是通过setState改变的，如何在这里调用组件内的方法？

  const mockHandler = jest.fn();
  const component = render(
    <CreateBlog createBlog={mockHandler}/>
  );
  const author = component.container.querySelector('#author');
  const url = component.container.querySelector('#url');
  const title = component.container.querySelector('#title');
  author.value = 'James Fisher';
  url.value = 'www.google.com';
  title.value = 'testing blog creating';

  const submitButton = component.container.querySelector('#submitButton');

  fireEvent .click(submitButton);
  expect(mockHandler.mock.calls).toHaveLength(1);
  console.log(mockHandler.mock.calls[0][0].author);
})


