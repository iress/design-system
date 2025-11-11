import { createPortal } from 'react-dom';

export const DefaultStyle = () =>
  createPortal(<link href="/random.css" rel="stylesheet" />, document.head);

export default DefaultStyle;
